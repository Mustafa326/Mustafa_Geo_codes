from django.urls import path
from .views import index
from .views import FinalShapefileTileView

urlpatterns = [
    path('', index, name='index'),
    path('finalshapefiletiles/<int:z>/<int:x>/<int:y>', FinalShapefileTileView.as_view(), name="finalshapefiletiles"),
]
