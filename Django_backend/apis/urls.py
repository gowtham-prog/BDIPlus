from django.urls import path, include
from .views import *
from .userviews import *

urlpatterns = [
    path("", returnHelloworld, name="returnHelloworld" ),
    path("users/create", createUserAPIView.as_view(), name="createUser"),
    path("users/get/", retrieveUserAPIView.as_view(), name="retrieveUser"),
    path("tasks/", taskListCreateAPIView.as_view(), name="taskListCreate"),
    path("task/<int:id>/", taskRetrieveUpdateDestroyAPIView.as_view(), name="taskRetrieveUpdateDestroy"),
]