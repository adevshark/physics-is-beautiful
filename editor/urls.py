from django.conf.urls import url, include
from django.views.generic.base import TemplateView
from django.contrib.auth.decorators import login_required

urlpatterns = [
    url(r'^', login_required(TemplateView.as_view(template_name='editor/editor.html')), name='editor'),
]
