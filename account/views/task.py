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
    my_data["category"]=my_data.get("category")

    serializer = TaskSerializer(data=my_data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success":"Task Created!"}, status=201)
    
    else:
        return Response(serializer.errors, status=401)

# List tasks
@api_view(["GET"],)
@permission_classes((IsAuthenticated,))
def list_tasks(request):
    tasks = Task.objects.filter(user=request.user)
    if not tasks.exists():
        return Response({"error":"No tasks found for your account"}, status=404)
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data)


# Update task
@api_view(["PATCH"],)
@permission_classes((IsAuthenticated,))
def update_task(request, id):
    current_user = request.user
    check_task  = Task.objects.filter(id=id, user=current_user).exists() 
    if not check_task:
        return Response({"error":"Task not found"}, status=404)
    
    task = Task.objects.get(id=id)
    serializer = TaskSerializer(task, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response({"success":"Task updated!"}, status=200)

    else:
        return Response(serializer.errors, status=400)
    
# Delete task
@api_view(["DELETE"],)
@permission_classes((IsAuthenticated,))
def delete_task(request, id):
    current_user = request.user
    check_task  = Task.objects.filter(id=id, user=current_user).exists() 
    if not check_task:
        return Response({"error":"Task not found"}, status=404)
    # task = Task.objects.get(id=id)
    # task.delete()
    Task.objects.get(id=id).delete()
    return Response({"success":"Task deleted!"}, status=200)