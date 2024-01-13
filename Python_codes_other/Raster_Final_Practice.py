import os
import sys
from osgeo import gdal
import osr
from ospybook.vectorplotter import VectorPlotter
import numpy as np
import matplotlib.pyplot as plt
#General practice
'''
#Calling driver
driver=gdal.GetDriverByName("GTIFF")
print("Your driver is:",driver)
#opening a dataset
path=r'D:\mustafa05\osgeopy-data\Landsat\Washington\p047r027_7t20000730_z10_nn10.tif'
dataset=gdal.Open(path,1)
#dataset as array
#arr=dataset.ReadAsArray()
print("The number of rasters in the dataset is:",dataset.RasterCount)
print(dataset.GetDriver().ShortName)
if dataset is None:
    print("Please check your data")
#Calling the band from the dataset
band=dataset.GetRasterBand(1)
print("The raster band you chose from the data set is:",band)
print("The band raster size or block size is:",band.GetBlockSize())#gives you the entire first row
#Checking the spatial reference system

pr=dataset.GetProjection()
print("The projection you got is:",pr)
sr=osr.SpatialReference()
sr.ImportFromWkt(pr)
print("The reference system i:",sr)
sr.ExportToPrettyWkt()
print("The Sr in PrettyWkt is:",sr)
#Geting the number of rows(Y) and colums(X) of the raster
print("The number of Columns is:",dataset.RasterXSize)
print("The number of Rows is:",dataset.RasterYSize

#Extracting values from the raster band
bandarray=band.ReadAsArray(1400,6000,6,3).astype(float)
#for displaying the figure

f = plt.figure()
#plt.gray()  # just to make it in black and white
plt.imshow(bandarray)
plt.show()

print("Their are",band.GetNoDataValue(),"no data values")
metadata=band.GetMetadata()
print("while the band metada is:",metadata)
#reading partial datasets

epty=np.empty((3,6), dtype=float)
band.ReadAsArray(1400,6000,6,3,buf_obj=epty)

#Writing in a band through writearray method

bandarray-=1
band.WriteArray(bandarray)
band=None
dataset=None
'''
#Creating a raster from an existing one
'''
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
out_band=driver.Create("Abdal.tif",in_band.XSize,in_band.YSize,3,in_band.DataType)
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

'''
# Geo trasformation
path=gdal.Open(r'D:\mustafa05\osgeopy-data\Landsat\Washington\p047r027_7t20000730_z10_nn10.tif')
gt=path.GetGeoTransform()
print("the geotransform is:",gt)
inv=gdal.InvGeoTransform(gt)
print("The inverse is:",inv)
band=path.GetRasterBand(1)
data=band.ReadAsArray()
Xoff,Yoff=map(int,gdal.ApplyGeoTransform(inv,465200, 5296000))
value=data[Xoff,Yoff]
