#Importing libraries
import os
import sys
import osr
import pyproj
from osgeo import gdal
import numpy as np 
#calling drivers through gdal
driver=gdal.GetDriverByName("GTIFF")
print("The driver you called is:",driver)
#Opening the datasets
path=r'D:\mustafa05\osgeopy-data\Landsat\Washington\p047r027_7t20000730_z10_nn10.tif'
ds=gdal.Open(path,1)
print("Your datasets is:",ds)
#Calling drivers frm datasets
(ds.GetDriver().LongName)
#Getting projection from the raster 
'''
print(ds.GetProjection())
srs=osr.SpatialReference()
raster_sr=srs.ImportFromWkt(ds.GetProjection())
#print(raster_sr.ExportToPrettyWkt())
'''
#Fetching Raster size
Columns=ds.RasterXSize
rows=ds.RasterYSize
print("The size of your raster is:",Columns,rows)
#Fetching number of raster bands in your raster
count=ds.RasterCount
print("The number of bands in your raster are:",count)
#Fetching the raster band
band=ds.GetRasterBand(1)
#rading the raster as an array with x as colums and y as rows
array=band.ReadAsArray()
#Fetching missing values
nodata=band.GetNoDataValue()
print("The missing values are:",nodata)
#Fetching Metadata
metadata=band.GetMetadata()
print("The metadata accociated with this raster is:",metadata)
#Readasarray
array2=band.ReadAsArray(1400,6000,6,3).astype(float)
print("Your array is:",array2)
#Writing in an array
array2+=1
band.WriteArray(array2)
print("The new array is",array2)
#^^ same
array3=np.empty((3,6),dtype=float)
band.ReadAsArray(1400,6000,6,3,buf_obj=array3)
print(band)
array4=band.ReadAsArray(100,100,480,480)
print("Your array is:",array4)
