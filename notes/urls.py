from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("create", views.createnote, name="create"),
    path("trash", views.trash, name="trash"),
    
    #API ROUTES
    path("get_quill/<str:note_id>", views.get_quill, name="edit"),
    path("get_info/<str:note_id>", views.get_info, name="info"),
    path("update_note/<str:note_id>", views.update_note, name="update"),
    path("deleteall", views.deleteall, name="deleteall"),
]