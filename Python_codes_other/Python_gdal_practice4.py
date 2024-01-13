import os
import sys
from osgeo import gdal
from osgeo import ogr
import osr
import ospybook
import matplotlib
from ospybook.vectorplotter import VectorPlotter
#ds=r'D:\mustafa05\osgeopy-data\global\ne_50m_populated_places.shp'
ds=r'D:\mustafa05\osgeopy-data\global\natural_earth_50m.sqlite'
data=ogr.Open(ds,0)
if data is None:
    print("their is nothing in the data source")
lyr=data.GetLayer()

#iterating to get the layer
for i in range(data.GetLayerCount()):
    lyr1=data.GetLayer(i)
    print((i,lyr1))
#vp=VectorPlotter(True)
#vp.plot(lyr,'o')

#print('GDAL_DATA' in os.environ)