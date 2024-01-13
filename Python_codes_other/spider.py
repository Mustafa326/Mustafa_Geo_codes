# -*- coding: utf-8 -*-
"""
Created on Thu Nov 21 03:24:55 2019

@author: mustafa
"""

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
lyr=data.GetLayer(1)

vp=VectorPlotter(True)
vp.plot(lyr,'o')

#print('GDAL_DATA' in os.environ)