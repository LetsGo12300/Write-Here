from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.deletion import CASCADE
from django_quill.fields import QuillField

import json

# Create your models here.
class Note(models.Model):
    pkey = models.AutoField(primary_key=True)
    title = models.CharField(max_length=64, default="Untitled")
    content = models.CharField(max_length=64)
    json_content = models.CharField(max_length=64, default="")
    owner = models.CharField(max_length=64)
    date = models.DateTimeField(auto_now_add=True)
    deleted = models.CharField(max_length=64, default=False)
    pinned = models.CharField(max_length=64, default=False)


    def serialize(self):
        return {
            "title": self.title,
            "date": self.date,
            "pinned": self.pinned
        }

class QuillPost(models.Model):
    content = QuillField()
