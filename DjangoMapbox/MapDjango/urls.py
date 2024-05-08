from django.urls import path
from .views import index
from .views import FinalShapefileTileView
from .views import NDVI2019ShapefileTileView

urlpatterns = [
    path('', index, name='index'),
    path('finalshapefiletiles/<int:z>/<int:x>/<int:y>', FinalShapefileTileView.as_view(), name="finalshapefiletiles"),
    path('ndvishapefiletiles/<int:z>/<int:x>/<int:y>', NDVI2019ShapefileTileView.as_view(), name="ndvishapefiletiles"),
]