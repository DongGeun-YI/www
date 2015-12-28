from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import MainPage
# from .tasks import send_welcome_mail


def main(request):
    # count = Subscribe.objects.count()
    title = '저희 결혼합니다!!'
    subtitle = '연인으로 지낸지 1000년 이제 결혼합니다'
    s_date = ''
    s_place = ''
    description = '여러분을 모시고 축하를 받으면 기쁘겠지만 \n 우리도 도망가서 결혼하는 입장이라 \n 초대하지는 못합니다 \n 그렇지만 제다이와 여왕의 결혼식에 관심을 가져주셔서 정말 감사합니다. \n 후에 태어날 아이는 신화가 됩니다'


    return render(request, 'index.html', {
        'title' : title,
        'subtitle' : subtitle,
        'description': description,
    }) #dict


# @csrf_exempt
def subscribe(request):
    email = request.POST.get('email')

    # TODO : validate
    # TODO : save referrer
    if Subscribe.objects.filter(email=email).exists():
        return JsonResponse({
            'success': False
        }, status=409)

    new_subscribe = Subscribe(email=email).save()

    send_welcome_mail.delay(email)

    return JsonResponse({
        'success': True
    }, status=200)

def profile(request):
    bride_name = "파드메"
    groom_name = "아나킨"
    return render (request, '7q.html', {
      'bride_name': bride_name,
      'groom_name': groom_name,
    })