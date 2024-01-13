#Importing al the required libraries 
import os
import sys
from osgeo import gdal
import osr
import shutil
ds=r'D:\mustafa05\osgeopy-data\Utah\cache_no_gcp.tif'
ds1=r'D:\mustafa05\osgeopy-data\Utah\cache.tif'
#using the shutil library to make a copy of the file to work with
shutil.copy(ds,ds1)
data=gdal.Open(ds1,1)
sr=osr.SpatialReference()
sr.SetWellKnownGeogCS('WGS84')
#Seting the GCPS
gcps=[gdal.GCP(-111.931075,41.745836,0,1078,648),
      gdal.GCP(-111.901655,41.749269,0,3531,295),
      gdal.GCP(-111.899180,41.739882,0,3722,1334),
      gdal.GCP(-111.930510,41.728719,0,1102,2548)]#Zero is the Z value
data.SetGCPs(gcps, sr.ExportToWkt())
data=None 