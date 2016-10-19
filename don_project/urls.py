"""don_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.conf import settings
from django.contrib import admin
import experiments.views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', experiments.views.lander, name="lander"),
    url(r'^subject', experiments.views.subject, name="subject"),
    url(r'^session', experiments.views.session, name="session"),
    url(r'^trial', experiments.views.trial, name="trial"),
    url(r'^report_divergent', experiments.views.report_divergent, name="report_divergent"),
    url(r'^report_convergent', experiments.views.report_convergent, name="report_convergent"),
    url(r'^report_recombination', experiments.views.report_recombination, name="report_recombination"),
    #url(r'^report_block', experiments.views.report_block, name="report_block"),
]
if not settings.DEBUG:
    urlpatterns += patterns('',
        (r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
    )
