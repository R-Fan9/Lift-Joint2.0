from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import logout
from django.core.exceptions import PermissionDenied

# Create your views here.
def GetSocialDetail(request):
    if request.user.is_authenticated:
        user_social_auth = request.user.social_auth.filter(user=request.user).values('provider', 'uid', 'extra_data')[0]
        
        provider = user_social_auth['provider']
        access_token = user_social_auth['extra_data']['access_token']
        email = user_social_auth['uid']
        
        fields = { 'provider':provider, 'access_token':access_token, 'userInfo':{'id':request.user.id, 'username':request.user.username, 'email':email}}
        return JsonResponse(fields)
    else:
        raise PermissionDenied()

def logout_view(request):
    logout(request)
    return redirect('frontend:index')
