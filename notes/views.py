from http.client import HTTPS_PORT
from urllib.error import ContentTooShortError
from django.shortcuts import render
from django import forms
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.urls import reverse

from .models import Note
from django.contrib.auth.models import User
import json

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required

from django.utils import timezone

#DJANGO-QUILL
from .models import QuillPost

class QuillPostForm(forms.ModelForm):
    class Meta:
        model = QuillPost
        fields = (
            'content',
        )

def index(request):
    all_notes = Note.objects.filter(owner = request.user.username, deleted = False).order_by('-pinned', '-date')
    return render(request, "notes/index.html", {'notes': all_notes})

def createnote(request):
    if request.method == "POST":
        x = request.POST.get('content')
        res = json.loads(x)
        #save new post
        new_post = Note(title = request.POST.get('form-title'),content = res["html"], owner = request.user.username, json_content = x)
        new_post.save()
        return HttpResponseRedirect(reverse("index"))
        
    return render(request, "notes/create.html", {'form': QuillPostForm()})

def trash(request):
    all_notes = Note.objects.filter(owner = request.user.username, deleted = True).order_by('-date')
    return render(request, "notes/trash.html", {'notes': all_notes})


@csrf_exempt
@login_required
def get_quill(request, note_id):
    get_post = Note.objects.get(pkey = note_id)
    ini = {'content': get_post.content}
    data = QuillPostForm(initial=ini)
    return HttpResponse(data)

@csrf_exempt
@login_required
def get_info(request, note_id):
    get_post = Note.objects.get(pkey = note_id)
    return JsonResponse(get_post.serialize(), safe=False)


@csrf_exempt
@login_required
def update_note(request, note_id):
    get_post = Note.objects.get(pkey = note_id)
    if request.method == "PUT":
        data = json.loads(request.body)
        if data.get("title") is not None:
            get_post.content = data.get("content")
            get_post.title = data.get("title")
            get_post.date = timezone.now()
            get_post.save()
            return HttpResponse(status=204)
        if data.get("deleted") is not None:
            get_post.deleted = data.get("deleted")
            get_post.save()
            return HttpResponse(status=204)
        if data.get("pinned") is not None:
            if get_post.pinned == "False":
                get_post.pinned = "True"
            elif get_post.pinned == "True":
                get_post.pinned = "False"
                
            get_post.save()
            return HttpResponse(status=204)

@csrf_exempt
@login_required
def deleteall(request):
    
    if request.method == 'PUT':
        data = json.loads(request.body)
        if data.get("deleted_ids") is not None:
            deleted_ids_list = data.get("deleted_ids")
            for deleted_id in deleted_ids_list: 
                delete_obj = Note.objects.get(pkey = deleted_id)
                delete_obj.delete()
            return HttpResponse(status=204)

