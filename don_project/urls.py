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
    url(r'^report_block', experiments.views.report_block, name="report_block"),
    url(r'^results', experiments.views.results, name="results"),
    url(r'^divergent_results/(?P<userid>[0-9]+)', experiments.views.divergent_results, name="divergent_results"),
    url(r'^convergent_results/(?P<userid>[0-9]+)', experiments.views.convergent_results, name="convergent_results"),
    url(r'^recombination_results/(?P<userid>[0-9]+)', experiments.views.recombination_results, name="recombination_results"),
    url(r'^block_design_results/(?P<userid>[0-9]+)', experiments.views.block_design_results, name="block_design_results"),
]
