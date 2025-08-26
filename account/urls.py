
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from .views import user, task, category
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# from .views import login
urlpatterns = [
    path('login', user.login, name='login'),
    path("create_user", user.create_user),
    path("current_user/", user.current_user),
    path("update_user", user.update_user),
    path("delete_profile", user.delete_user),

    path("category", category.add_category),
    path("categories", category.list_categories),

    path("task", task.add_task),
    path("tasks", task.list_tasks),
    path("task/<int:id>", task.update_task),
    path("task/<int:id>/delete", task.delete_task),


    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

