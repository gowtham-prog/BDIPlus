from django.shortcuts import render
from django.http import HttpResponse
from .serializers import UserSerializer, TaskSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import User, Task
from rest_framework.response import Response
from rest_framework import status, generics

# Create your views here.


def returnHelloworld(request):
    return HttpResponse("Hello World")


# create & List task
class taskListCreateAPIView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, ]

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(created_by=user)


class taskRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated, ]
    lookup_field = 'id'

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(created_by=user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": "Task deleted successfully"},
            status=status.HTTP_200_OK
        )
