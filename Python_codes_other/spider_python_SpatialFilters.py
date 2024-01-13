import os
import sys
import turtle
import pyproj as py
from osgeo import ogr
import ospybook as pb
from ospybook.vectorplotter import VectorPlotter
ds = ogr.Open(r'D:\mustafa05\osgeopy-data\pak_adm_ocha_pco_gaul_20181218_SHP')
 #getting the layer
if ds is None:
    print("Your datasource has not been read please check again your data path")
lyr=ds.GetLayer('Export_Output')
lyr1=ds.GetLayer('punjab_pak')
print("Your first layer is",lyr)
print("Your second layer is",lyr1)
if ds is None:
    print("Your datasource has not been read please check again your data path")
