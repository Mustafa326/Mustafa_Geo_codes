from django.shortcuts import render
from django.http import JsonResponse
from django.views import View
from django.views.generic import ListView
from MapDjango.models import *
from MapDjango.models import FinalShapefile
from vectortiles.postgis.views import MVTView
from django.contrib.gis.geos import GEOSGeometry
from django.contrib.gis.db.models.aggregates import Collect
from django.contrib.gis.db.models import Q
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
def index(request):
    return render(request, 'index.html')
# Create your views here.
def map_view(request):
    # Fetch data from the database
    data = FinalShapefile.objects.all()

    # Convert data to GeoJSON format
    geojson_data = {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": {
                    "type": "MultiPolygon",
                    "coordinates": feature.geom.coords,
                },
                "properties": {
                    "name": feature.adm2_en,
                    "population_2010": feature.pop_2010,
                    # Add other properties as needed
                },
            }
            for feature in data
        ],
    }

    # Pass the GeoJSON data to the template
    return render(
        request,
        "map_view.html",
        {"geojson_data": geojson_data},
    )
# Create your views here.
