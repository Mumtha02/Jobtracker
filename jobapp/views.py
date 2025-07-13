from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import JobApplication
from .serializers import JobApplicationSerializer


# Create your views here.
class JobApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = JobApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return JobApplication.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)
