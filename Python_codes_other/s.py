import os
from osgeo import ogr
import osr
drivern=ogr.GetDriverByName("Esri Shapefile")
print("The driver you called is:",drivern)
#Creating new data_source
mustafa_haider=drivern.CreateDataSource('musta')
#creating the layer