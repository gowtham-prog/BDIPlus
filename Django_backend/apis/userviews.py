from .serializers import UserSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import User
from rest_framework import generics


class createUserAPIView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny, ]

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            if User.objects.filter(email=serializer.validated_data['email']).count() > 0:
                return Response(
                    {'status': 'failure',
                        'message': "A user with that email already exists. Use a different email."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            user = User.objects.create(
                username=serializer.validated_data['username'],
                email=serializer.validated_data['email'],
            )
            user.set_password(serializer.validated_data['password'])
            user.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Retrieve User


class retrieveUserAPIView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, ]

    def retrieve(self, request, *args, **kwargs):
        return Response(UserSerializer(request.user).data, status=status.HTTP_200_OK)
