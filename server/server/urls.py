
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from . import views

from events.views import EventView,UserView,EventLikedView,update_like_status,LoginView
from rest_framework import routers



route = routers.DefaultRouter()
route.register("events", EventView , basename="eventview")
route.register("signup", UserView , basename="userview")
#route.register("update-like-status/<int:event_id>/", update_like_status , basename='update_like_status')
route.register("liked-event", EventLikedView , basename="eventlikedview")
#route.register("login", LoginView , basename="loginview")


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/update-like-status/<int:event_id>/', update_like_status, name='update_like_status'),
    path('api/signup/', UserView.as_view({'post': 'create'}), name='signup'),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/', include(route.urls)),
    path('',views.index,name='index')
]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
