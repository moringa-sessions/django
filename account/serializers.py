from rest_framework import serializers
from .models import Task, Category, User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =["email", "id", "username", "is_admin","date_joined", 
                 "google_picture","profile_picture", "password" ]
        
        write_only_fields = ["password"]
        read_only_fields = ["date_joined", "is_admin", "id"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["name","description", "created_at"]
        read_only_fields = ["created_at"]


class TaskSerializer(serializers.ModelSerializer):
    # category = CategorySerializer(read_only=True)
    class Meta:
        model = Task
        fields = ["title", "description", "status", "category", "user"]
        read_only_fields = ["created_at"]

     