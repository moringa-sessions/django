from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.response import Response
from account.models import Category
from rest_framework import status
from account.serializers import CategorySerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


# Add category
@api_view(["POST"],)
@permission_classes((IsAuthenticated,))
def add_category(request):
    current_user = request.user
    if not current_user.is_admin:
        return Response({"error":"Not Authorized!"}, status=401)
    
    my_data = request.data
    serializer = CategorySerializer(data=my_data)
    if serializer.is_valid():
        serializer.save()
        return Response({"success":"Category Created!"}, status=201)
    
    else:
        return Response(serializer.errors, status=401)




# Fetch all categories
@api_view(["GET"],)
@permission_classes((IsAuthenticated,))
def list_categories(request):
    categories = Category.objects.all().order_by('-id')
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data, status=200)