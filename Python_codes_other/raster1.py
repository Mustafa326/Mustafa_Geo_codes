#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Dec 31 14:30:18 2019

@author: grel
"""

from osgeo import gdal,osr
import os, sys
import matplotlib.pyplot as plt

# band stacking into a new one

path=gdal.Open(r'/GIS-BS-Python/osgeopy-data/washington/osgeopy-data/Landsat/Washington/p047r027_7t20000730_z10_nn10.tif')
path1=gdal.Open(r'/GIS-BS-Python/osgeopy-data/washington/osgeopy-data/Landsat/Washington/p047r027_7t20000730_z10_nn20.tif')
path2=gdal.Open(r'/GIS-BS-Python/osgeopy-data/washington/osgeopy-data/Landsat/Washington/p047r027_7t20000730_z10_nn30.tif')
#ds=gdal.Open(path)
bnd1=path.GetRasterBand(1)
bnd2=path1.GetRasterBand(1)
bnd3=path2.GetRasterBand(1)


# creating output raster to save our results


driver=gdal.GetDriverByName('GTiff')
data_source=driver.Create('nat_color.tif',bnd1.XSize, bnd1.YSize,3,bnd1.DataType)
srs=path.GetProjection()
data_source.SetProjection (srs)
data_source.SetGeoTransform(path.GetGeoTransform())


# now copying the pixel data from input to output bands

# first reatding input band as input array
array_data=bnd1.ReadAsArray()
out_bnd3=data_source.GetRasterBand(3)
out_bnd3.WriteArray(array_data)


# similarly copying the other datasets
array_data1=bnd2.ReadAsArray()
out_bnd2=data_source.GetRasterBand(2)
out_bnd2.WriteArray(array_data1)

array_data2=bnd3.ReadAsArray()
out_bnd1=data_source.GetRasterBand(1)
out_bnd1.WriteArray(array_data2)
data_source.FlushCache()

# now displaying the raster
img = out_bnd1.ReadAsArray(0, 0, data_source.RasterXSize, data_source.RasterYSize)
img1 = out_bnd2.ReadAsArray(0, 0, data_source.RasterXSize, data_source.RasterYSize)
img2 = out_bnd3.ReadAsArray(0, 0, data_source.RasterXSize, data_source.RasterYSize)
f = plt.figure()
#plt.gray()  # just to make it in black and white
plt.imshow(img)
plt.imshow(img1)
plt.imshow(img2)
plt.show()