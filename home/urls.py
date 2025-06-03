from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('home_explorer/', views.home_explorer, name='home_explorer'),
    path('login/', views.login_view, name='login'),
    path('home_login/', views.home_login, name='home_login'),
    path('logout/', views.logout_view, name='logout'),
    # URLs opcionales para acceso directo
    path('docentes/', views.home_docentes, name='home_docentes'),
    path('alumnos/', views.home_alumnos, name='home_alumnos'),
]
