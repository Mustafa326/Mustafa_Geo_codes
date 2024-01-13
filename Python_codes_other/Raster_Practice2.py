#Importing libraries
import os
import sys
from osgeo import gdal
import numpy as np
#calling the paths
os.chdir(r'D:\mustafa05\osgeopy-data\Landsat\Washington')
band_fn1='p047r027_7t20000730_z10_nn10.tif'
band_fn2='p047r027_7t20000730_z10_nn20.tif'
band_fn3='p047r027_7t20000730_z10_nn30.tif'
#opening the first path
in_data=gdal.Open(band_fn1)
print("The data you opened is",in_data)
in_band=in_data.GetRasterBand(1)
#Creating a new raster
driver=gdal.GetDriverByName("GTIFF")
out_band=driver.Create("Mustafa1",in_band.XSize,in_band.YSize,3,in_band.DataType)
out_band.SetProjection(in_data.GetProjection())
out_band.SetGeoTransform(in_data.GetGeoTransform())
#Writing the new raster
array=in_band.ReadAsArray()
out=out_band.GetRasterBand(3)
out.WriteArray(array)
data2=gdal.Open(band_fn2)
out2=out_band.GetRasterBand(2)
out2.WriteArray(data2.ReadAsArray())
data3=gdal.Open(band_fn3)
out3=out_band.GetRasterBand(1)
out3.WriteArray(data3.ReadAsArray())
out_band.FlushCache()




