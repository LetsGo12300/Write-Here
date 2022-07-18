from django.contrib import admin
from .models import QuillPost, Note

admin.site.register(Note)

@admin.register(QuillPost)
class QuillPostAdmin(admin.ModelAdmin):
    pass