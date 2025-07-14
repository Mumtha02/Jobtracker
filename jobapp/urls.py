from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import JobApplicationViewSet,ping

router = DefaultRouter()
router.register(r'jobs', JobApplicationViewSet, basename='jobs')
urlpatterns = [path('ping/', ping, name='ping'),
               path('', include(router.urls)),
               ]

