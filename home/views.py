
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from .models import Alumno, Docente, PerfilUsuario, NivelEscolar
from django.db import connections

# Create your views here.

def home(request):
    return render(request, 'home_base.html')

def home_explorer(request):
    return render(request, 'home_explorer.html')

def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        try:    
            # Buscar usuario por email
            user = User.objects.get(email=email, is_active=True)
            
            # Usar authenticate de Django para verificar contraseña
            authenticated_user = authenticate(request, username=user.username, password=password)
            
            if authenticated_user:
                # Login exitoso usando el sistema de Django
                login(request, authenticated_user)
                messages.success(request, 'Login exitoso')
                
                # Redirigir según el tipo de usuario directamente
                return redirect_user_by_role(authenticated_user)
                    
            else:
                messages.error(request, 'Contraseña incorrecta')
                
        except User.DoesNotExist:
            messages.error(request, 'Usuario no encontrado o inactivo')
        except Exception as e:
            # Capturar cualquier otro error
            messages.error(request, f'Error en el login: {str(e)}')
            
    return render(request, 'login.html')

def redirect_user_by_role(user):
    """Función auxiliar para redirigir según el rol del usuario"""
    # Convertir a boolean para asegurar comparación correcta
    is_staff = bool(user.is_staff)
    is_superuser = bool(user.is_superuser)
    
    # Debug para verificar valores
    print(f"Redirigiendo usuario: {user.username}")
    print(f"is_staff: {is_staff}, is_superuser: {is_superuser}")
    
    # Lógica de redirección según roles
    if is_staff and not is_superuser:
        # Docente: is_staff=True, is_superuser=False
        print("→ Redirigiendo a home_docentes")
        return redirect('home_docentes')
        
    elif not is_staff and not is_superuser:
        # Alumno: is_staff=False, is_superuser=False
        print("→ Redirigiendo a home_alumnos")
        return redirect('home_alumnos')
        
    elif is_superuser:
        # Administrador: is_superuser=True (cualquier valor de is_staff)
        print("→ Redirigiendo a home_login (Admin)")
        return redirect('home_login')
        
    else:
        # Caso por defecto (no debería llegar aquí)
        print("→ Caso no contemplado, redirigiendo a home_login")
        return redirect('home_login')

def get_user_extended_data(user):
    """Función para obtener datos extendidos del usuario desde bd_externa y perfil"""
    extended_data = {}
    
    try:
        # Obtener datos del perfil básico (BD default)
        perfil = None
        try:
            perfil = PerfilUsuario.objects.get(user=user)
            extended_data.update({
                'telefono': perfil.telefono,
                'direccion': perfil.direccion,
                'biografia': perfil.biografia,
            })
            
            # Obtener nombre del nivel escolar si existe
            if perfil.nivel_escolar:
                extended_data['nivel_escolar'] = perfil.nivel_escolar.nombre
                
        except PerfilUsuario.DoesNotExist:
            print(f"No se encontró perfil para el usuario {user.id}")
        
        # Obtener datos específicos según el tipo de usuario
        if user.is_staff and not user.is_superuser:
            # Es docente - obtener datos desde bd_externa
            try:
                docente = Docente.objects.using('bd_externa').get(user_id=user.id)
                extended_data.update({
                    'dni': docente.dni,
                    'fecha_contratacion': docente.fecha_contratacion.strftime('%d de %B, %Y') if docente.fecha_contratacion else None,
                    'codigo_modular': docente.codigo_modular,
                    'codigo_colegio_profesores': docente.codigo_colegio_profesores,
                    'cursos_dictados': docente.cursos_dictados,
                    'telefono_emergencias': docente.telefono_emergencias,
                    'tipo_contrato': docente.get_tipo_contrato_display(),
                })
            except Docente.DoesNotExist:
                print(f"No se encontraron datos de docente para el usuario {user.id}")
                
        elif not user.is_staff and not user.is_superuser:
            # Es alumno - obtener datos desde bd_externa
            try:
                alumno = Alumno.objects.using('bd_externa').get(user_id=user.id)
                extended_data.update({
                    'dni': alumno.dni,
                    'enfermedades': alumno.enfermedades,
                    'alergias': alumno.alergias,
                    'tipo_sangre': alumno.tipo_sangre,
                    'tutor_legal': alumno.tutor_legal,
                    'telefono_emergencias': alumno.telefono_emergencias,
                    'medico_cabecera': alumno.medico_cabecera,
                    'centro_medico': alumno.centro_medico,
                    'numero_hermanos': alumno.numero_hermanos,
                })
                
                # Obtener nivel escolar del alumno
                try:
                    nivel_escolar = NivelEscolar.objects.get(pk=alumno.nivel_escolar_id)
                    extended_data['nivel_escolar'] = nivel_escolar.nombre
                except NivelEscolar.DoesNotExist:
                    print(f"No se encontró nivel escolar con ID {alumno.nivel_escolar_id}")
                    
            except Alumno.DoesNotExist:
                print(f"No se encontraron datos de alumno para el usuario {user.id}")
                
    except Exception as e:
        print(f"Error al obtener datos extendidos: {str(e)}")
        
    return extended_data

def home_login(request):
    """Vista para administradores/superusuarios"""
    # Verificar si el usuario está autenticado
    if not request.user.is_authenticated:
        messages.error(request, 'Debes iniciar sesión primero')
        return redirect('login')
    
    # Verificar que sea superusuario
    if not request.user.is_superuser:
        messages.error(request, 'No tienes permisos de administrador')
        return redirect_user_by_role(request.user)
    
    # Contexto para administradores
    context = {
        'user_name': f"{request.user.first_name} {request.user.last_name}".strip() or request.user.username,
        'user_email': request.user.email,
        'user_type': 'Administrador',
    }
    return render(request, 'home_login.html', context)

def home_docentes(request):
    """Vista específica para docentes"""
    # Verificar autenticación
    if not request.user.is_authenticated:
        messages.error(request, 'Debes iniciar sesión primero')
        return redirect('login')
    
    # Verificar que sea staff pero no superusuario
    if not request.user.is_staff or request.user.is_superuser:
        messages.error(request, 'No tienes permisos de docente')
        return redirect_user_by_role(request.user)
    
    # Obtener datos extendidos del docente
    extended_data = get_user_extended_data(request.user)
    
    context = {
        'user_name': f"{request.user.first_name} {request.user.last_name}".strip() or request.user.username,
        'user_email': request.user.email,
        'user_type': 'Docente',
        **extended_data  # Agregar todos los datos extendidos al contexto
    }
    
    print("Contexto docente:", context)  # Debug
    return render(request, 'home_docentes.html', context)

def home_alumnos(request):
    """Vista específica para alumnos"""
    # Verificar autenticación
    if not request.user.is_authenticated:
        messages.error(request, 'Debes iniciar sesión primero')
        return redirect('login')
    
    # Verificar que no sea staff ni superusuario
    if request.user.is_staff or request.user.is_superuser:
        messages.error(request, 'No tienes permisos de estudiante')
        return redirect_user_by_role(request.user)
    
    # Obtener datos extendidos del alumno
    extended_data = get_user_extended_data(request.user)
    
    context = {
        'user_name': f"{request.user.first_name} {request.user.last_name}".strip() or request.user.username,
        'user_email': request.user.email,
        'user_type': 'Estudiante',
        **extended_data  # Agregar todos los datos extendidos al contexto
    }
    
    print("Contexto alumno:", context)  # Debug
    return render(request, 'home_alumnos.html', context)

def logout_view(request):
    """Vista para cerrar sesión"""
    logout(request)
    messages.success(request, 'Has cerrado sesión correctamente')
    return redirect('login')

# Vista adicional para debug (opcional - eliminar en producción)
def debug_user_info(request):
    """Vista temporal para debuggear información del usuario"""
    if not request.user.is_authenticated:
        return redirect('login')
    
    user = request.user
    
    # Obtener datos extendidos
    extended_data = get_user_extended_data(user)
    
    debug_info = {
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'is_staff': user.is_staff,
        'is_superuser': user.is_superuser,
        'is_active': user.is_active,
        'is_staff_value': int(user.is_staff),
        'is_superuser_value': int(user.is_superuser),
        'extended_data': extended_data,
    }
    
    # Determinar dónde debería redirigir
    if user.is_staff and not user.is_superuser:
        expected_redirect = "home_docentes"
    elif not user.is_staff and not user.is_superuser:
        expected_redirect = "home_alumnos"
    elif user.is_superuser:
        expected_redirect = "home_login"
    else:
        expected_redirect = "unknown"
    
    context = {
        'debug_info': debug_info,
        'expected_redirect': expected_redirect,
    }
    
    return render(request, 'debug_user.html', context)


