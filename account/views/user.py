import shutil
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from account.models import User
from rest_framework import status
from account.serializers import UserSerializer
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.hashers import make_password
from rest_framework.permissions import IsAuthenticated
import os

# Create your views here.
def login(request):
    return JsonResponse({"message": "Login view not implemented yet."})


# add user
@api_view(["POST"])
def create_user(request):    
    data  =request.data
    email = data.get("email")
    username = data.get("username")
    password = make_password( data.get("password") )
    profile_picture = data.get("profile_picture")


    if not email or not username:
        return Response({"error":"All fields are required"}, status=400)
    
    check_email=User.objects.filter(email=email)
    if check_email.exists():
        return Response({"error":"Email exists"}, status=400)
    user_data = {
        "email":email, "username":username,"password":password, "profile_picture":profile_picture
    }
    serializer = UserSerializer(data=user_data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success":"User saved!"}, status=201)
    
    else:
        return Response(serializer.errors, 400)

    


# current logged in user
@api_view(["GET"],)
@permission_classes((IsAuthenticated,))
def current_user(request):
    user = UserSerializer(request.user)
    return Response(user.data)


# Update the user
@api_view(["PATCH"],)
@permission_classes((IsAuthenticated,))
def update_user(request):
    current_user = request.user
    #check_user  = User.objects.filter(id=id).exists() # True or false
    #            = get_object_or_404(User, id=id)
    old_image = current_user.profile_picture.path if  current_user.profile_picture else None

    serializer = UserSerializer(current_user,data=request.data, partial=True )
    if serializer.is_valid():
        serializer.save()

        if "profile_picture" in request.data and old_image and os.path.exists(old_image):
            os.remove(old_image)

            # get the folder containing the old image
            folder = os.path.dirname(old_image)
            # check if its empty
            if not os.listdir(folder):
                shutil.rmtree(folder)
            
            return Response({"success":"User updated successfully"})
    else:
        return Response(serializer.errors, status=400)

# DELETE USER
@api_view(["DELETE"],)
@permission_classes((IsAuthenticated,))
def delete_user(request):
    current_user = request.user
    old_image = current_user.profile_picture.path if  current_user.profile_picture else None

    if old_image and os.path.exists(old_image):
        os.remove(old_image)

        # get the folder containing the old image
        folder = os.path.dirname(old_image)
        # check if its empty
        if not os.listdir(folder):
            shutil.rmtree(folder)

    current_user.delete()
    return Response({"success":"User deleted successfully"})


# implement the update password based on the current password
# 