#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Dec 31 11:04:59 2019

@author: grel
"""

from osgeo import gdal,osr
import os, sys
import matplotlib.pyplot as plt
# please change raster data except this given on path
path=r'D:\mustafa05\osgeopy-data\Landsat\Washington\p047r027_7t20000730_z10_nn20.tif'
ds=gdal.Open(path,1)
if ds is None:
    print("Please read the file again")

band=ds.GetRasterBand(1)
print("your raster band is",band)
#print ds.RasterXSize
#print ds.RasterYSize

#print band.GetBlockSize()
#print ds.RasterCount

#print band.GetNoDataValue()


# reading partial datasets

#data=band.ReadAsArray(115,258, 123,309).astype(float)
#print data

# displaying DataSource using matplotlib

#lyr = gdal.Open(t1)
#bnd = lyr.GetRasterBand(1)
img = band.ReadAsArray(0, 0, ds.RasterXSize, ds.RasterYSize)
f = plt.figure()
#plt.gray()  # just to make it in black and white
plt.imshow(img)
plt.show()




# writing   output array with numpy 
import numpy as np
# making empty  numpy array to store output
#data=np.empty((3,6), dtype=float)
#band.ReadAsArray(115,258, 123,309, buf_obj=data)
#band2.WriteArray(data,1400,6000)
#  Writing raster data
'''
array=band.ReadAsArray()
array=array+10

band.WriteArray(array)
band=None
ds=None
'''


# creating new raster dataset.....
# first step is same as of vector dataset 

#driver=gdal.GetDriverByName('GTiff')
#data=driver.Create('t',2,3)
