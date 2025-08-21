from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from account.models import Task
from rest_framework import status
from account.serializers import TaskSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


# Add task
@api_view(["POST"],)
@permission_classes((IsAuthenticated,))
def add_task(request):
    my_data = request.data
    my_data["user"]=request.user.id
    serializer = TaskSerializer(data=my_data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success":"Task Created!"}, status=201)
    
    else:
        return Response(serializer.errors, status=401)
