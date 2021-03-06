"""pib URL Configuration

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
from django.conf.urls import include
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.sitemaps.views import sitemap

from resources.sitemaps import ResourcesViewSitemap, TextBookProblemsViewSitemap, TextBookSolutionsViewSitemap
from curricula.sitemaps import CurriculaViewSitemap

sitemaps = {
    'resources': ResourcesViewSitemap,
    'textbook_problems': TextBookProblemsViewSitemap,
    'textbook_solutions': TextBookSolutionsViewSitemap,
    'curricula': CurriculaViewSitemap,
}

urlpatterns = [
    url(r'^', include('homepage.urls')),

    url(r'^curriculum/profile/', include('editor.urls', namespace='curriculum_profile')),  # must be upper curriculum/
    # namespase is a fix for api/v1/editor/curricula url (drf router)
    url(r'^curriculum/', include('curricula.urls', namespace='main_curricula')),
    # url(r'^editor/', include('editor.urls')),
    url(r'^studio/', include('editor.urls', namespace='studio')),
    url(r'^browse/', include('editor.urls', namespace='browse')),
    url(r'^classroom/', include('classroom.urls')),
    url(r'^resources/', include('resources.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^accounts/', include('allauth.urls')),
    url(r'^accounts/', include('pib_auth.urls')),
    url(r'^profile/', include('profiles.urls')),
    url(r'^nested_admin/', include('nested_admin.urls')),
    url(r'^blog/', include('blog.urls')),
    url(r'^discussion/', include('djeddit.urls')),
    # due https://github.com/encode/django-rest-framework/issues/2760 namespace do not work
    # url(r'^api/v1/', include('pib.urls_api', namespace='api')),
    url(r'^api/v1/', include('pib.urls_api')),
    url(r'^sitemap\.xml$', sitemap, {'sitemaps': sitemaps},
        name='django.contrib.sitemaps.views.sitemap')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns