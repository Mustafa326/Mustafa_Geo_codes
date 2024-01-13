#importing the necessary files
import os
import sys
import gdal as g
from osgeo import ogr
import ospybook
#calling the driver , but by defult the driver which is called is the shapefile one
driver1=ogr.GetDriverByName("Esri Shapefile")
print ("Your driver is",driver1)
dp=r'D:\mustafa05\osgeopy-data\global\ne_50m_populated_places.shp'
print ("Your data_path is",dp)
ds=ogr.Open(dp,1)
if ds is None:
    print("you have no data")
else:
    lyr1=ds.GetLayer()
    print ("your layer is",lyr1)
lyr=ds.GetLayer()
spatial=lyr.GetSpatialRef()
print(spatial)
if ds.GetLayer('capital_cities'):
    ds.DeleteLayer('capital_cities')
outlyr=ds.CreateLayer('capital_cities',lyr.GetSpatialRef(),ogr.wkbPoint)
fields=outlyr.CreateFields(lyr.schema)
defination=lyr.GetLayerDefn()
feature=ogr.Feature(defination)
for in_feat in lyr:
    if in_feat.GetField('FEATURECLA')== 'Admin-0 capital':
        geom=in_feat.geometry()
        feature.SetGeometry(geom)
    for i in range(in_feat.GetFieldCount()):
        value=in_feat.GetField(i)
        feature.SetField(i,value)
    outlyr.CreateFeature(feature)
del ds
    

    


