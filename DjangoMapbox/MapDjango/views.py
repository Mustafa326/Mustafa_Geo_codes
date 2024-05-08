import json
from geojson import Feature, FeatureCollection
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
from django.core.serializers import serialize
from django.core.serializers.json import DjangoJSONEncoder
from vectortiles.mixins import BaseVectorTileView
from decimal import Decimal
def index(request):
    return render(request, 'index.html')
class DecimalEncoder(DjangoJSONEncoder):
    def default(self, o):
        if isinstance(o, Decimal):
            return float(o)
        return super(DecimalEncoder, self).default(o)

class FinalShapefileTileView(MVTView):
    model = FinalShapefile
    vector_tile_layer_name = "finalshapefile"
    vector_tile_fields = ('shape_leng', 'shape_area', 'gid', 'pop_2010', 'pop_2015', 'pop_2020', 'w_d_2010', 's_d_2010', 'w_n_2010', 's_n2010', 'w_d_2011', 's_d_2011', 'w_n_2011', 's_n_2011', 'w_d_2012', 's_d_2012', 'w_n_2012', 's_n_2012', 'w_d_2013', 's_d_2013', 'w_n_2013', 's_n_2013', 'w_d_2014', 's_d_2014', 'w_n_2014', 's_n_2014', 'w_d_2015', 's_d_2015', 'w_n_2015', 's_n_2015', 'w_d_2016', 's_d_2016', 'w_n_2016', 's_n_2016', 'w_d_2017', 's_d_2017', 'w_n_2017', 's_n_2017', 'w_d_2018', 's_d_2018', 'w_n_2018', 's_n_2018', 'w_d_2019', 's_d_2019', 'w_n_2019', 's_n_2019', 'n_2010', 'n_2011', 'n_2012', 'n_2013', 'n_2014', 'n_2015', 'n_2016', 'n_2017', 'n_2018', 'n_2019', 'p_2010', 'p_2011', 'p_2012', 'p_2013', 'p_2014', 'p_2015', 'p_2016', 'p_2017', 'p_2018', 'p_2019', 'latitude', 'longitude', 'area_km_2', 'abspop_10', 'abspop_15', 'abspop_20', 'adm2_en'
,)  # Include all fields
    vector_tile_geom_name = "geom"

    def get_queryset(self):
        return FinalShapefile.objects.all()
    #def get_queryset(self):
     #   return FinalShapefile.objects.all()

    #def get(self, request, *args, **kwargs):
    #    finalshapefiletiles = super().get(request, *args, **kwargs)
    #    final_shapefile_objects = FinalShapefile.objects.all()
    #    finalshapefiletiles["data"]=json.load(serialize("geojson",finalshapefiletiles))

        # You can perform any additional data processing if needed

    #    return finalshapefiletiles 
class NDVI2019ShapefileTileView(MVTView):
    model = NDVI2019Shapefile
    vector_tile_layer_name = "ndvishapefile"
    vector_tile_fields = ('shape_leng', 'shape_area', 'gid', 'pop_2010', 'pop_2015', 'pop_2020', 'w_d_2010', 's_d_2010', 'w_n_2010', 's_n2010', 'w_d_2011', 's_d_2011', 'w_n_2011', 's_n_2011', 'w_d_2012', 's_d_2012', 'w_n_2012', 's_n_2012', 'w_d_2013', 's_d_2013', 'w_n_2013', 's_n_2013', 'w_d_2014', 's_d_2014', 'w_n_2014', 's_n_2014', 'w_d_2015', 's_d_2015', 'w_n_2015', 's_n_2015', 'w_d_2016', 's_d_2016', 'w_n_2016', 's_n_2016', 'w_d_2017', 's_d_2017', 'w_n_2017', 's_n_2017', 'w_d_2018', 's_d_2018', 'w_n_2018', 's_n_2018', 'w_d_2019', 's_d_2019', 'w_n_2019', 's_n_2019', 'n_2010', 'n_2011', 'n_2012', 'n_2013', 'n_2014', 'n_2015', 'n_2016', 'n_2017', 'n_2018', 'n_2019', 'p_2010', 'p_2011', 'p_2012', 'p_2013', 'p_2014', 'p_2015', 'p_2016', 'p_2017', 'p_2018', 'p_2019', 'latitude', 'longitude', 'area_km_2', 'abspop_10', 'abspop_15', 'abspop_20', 'adm2_en'
,)  # Include all fields
    vector_tile_geom_name = "geom"
    def get_queryset(self):
        # Filter to include only regions with NDVI values > 0.36 for the year 2019
        return NDVI2019Shapefile.objects.filter(n_2019__gt=0.36)