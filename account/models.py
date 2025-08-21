from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

# Create your models here.
# custom user model
class UserManager(BaseUserManager):
    def create_user(self, email,username, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')
        user = self.model(username=username, 
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email,username, password):
        user = self.create_user(
            email,username,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

    
# user model
class User(AbstractBaseUser):
    email = models.EmailField(verbose_name="email", max_length=60, unique=True, null=False)
    username = models.CharField(verbose_name="username", max_length=15, unique=True, null=False)
    is_active = models.BooleanField( default=True)
    is_admin = models.BooleanField( default=False)
    date_joined = models.DateTimeField(auto_now=True)
    google_picture =  models.CharField(max_length=50, null=True)  
    profile_picture =  models.FileField(upload_to='profile_pictures/%Y:%m:%d', null=True)  
    password= models.CharField(null=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ['username']

    objects = UserManager()


class Category(models.Model):
    name = models.CharField(max_length=90)
    description = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now=True)


class Task(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("in_progress", "In Progress"),
        ("completed", "Completed")
    ]

    title = models.CharField(max_length=40)
    description = models.TextField(null=True)
    due_date = models.DateTimeField(null=True)
    created_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=24, choices=STATUS_CHOICES )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
