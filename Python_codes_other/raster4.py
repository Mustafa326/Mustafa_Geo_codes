#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Dec 31 15:20:34 2019

@author: grel
"""

from osgeo import gdal,osr
import os, sys
import matplotlib.pyplot as plt
import numpy as np
# band stacking into a new one

'''
path=gdal.Open(r'D:\mustafa05\osgeopy-data\Landsat\Washington\p047r027_7t20000730_z10_nn10.tif')

#ds=gdal.Open(path)
band=path.GetRasterBand(1)

gt = path.GetGeoTransform()
print(gt)

# Now get the inverse geotransform. The original can be used to convert
# offsets to real-world coordinates, and the inverse can be used to convert
# real-world coordinates to offsets.

 # AS I am using GDAL 2 version so nothing to worry at all# GDAL 2.x: You get the geotransform or None
inv_gt = gdal.InvGeoTransform(gt)
print(inv_gt)

# Use the inverset geotransform to get some pixel offsets from real-world
# UTM coordinates (since that's what the Landsat image uses). The offsets
# are returned as floating point.
offsets = gdal.ApplyGeoTransform(inv_gt, 465200, 5296000)
print(offsets)

# Convert the offsets to integers.
xoff, yoff = map(int, offsets)
print(xoff, yoff)

# And use them to read a pixel value.
value = band.ReadAsArray(xoff, yoff, 1, 1)[0,0]
print(value)

# Reading in one pixel at a time is really inefficient if you need to read
# a lot of pixels, though, so here's how you could do it by reading in all
# of the pixel values first and then pulling out the one you need.
data = band.ReadAsArray()
x, y = map(int, gdal.ApplyGeoTransform(inv_gt, 465200, 5296000))
value = data[yoff, xoff]
print(value)

'''


# Don't forget to change the folder.
in_ds=gdal.Open(r'/GIS-BS-Python/osgeopy-data/washington/osgeopy-data/Landsat/Washington/p047r027_7t20000730_z10_nn10.tif')

#ds=gdal.Open(path)
in_band=in_ds.GetRasterBand(1)



# Computer the number of output rows and columns (double the input numbers
# because we're cutting pixel size in half).
out_rows = in_band.YSize * 2
out_columns = in_band.XSize * 2

# Create the output raster using the computed dimensions.
gtiff_driver = gdal.GetDriverByName('GTiff')
out_ds = gtiff_driver.Create('band1_resampled.tif',
    out_columns, out_rows)

# Change the geotransform so it reflects the smaller cell size before
# setting it onto the output.
out_ds.SetProjection(in_ds.GetProjection())
geotransform = list(in_ds.GetGeoTransform())
geotransform[1] /= 2
geotransform[5] /= 2
out_ds.SetGeoTransform(geotransform)

# Read in the data, but have gdal resample it so that it has the specified
# number of rows and columns instead of the numbers that the input has.
# This effectively resizes the pixels.
data = in_band.ReadAsArray(
    buf_xsize=out_columns, buf_ysize=out_rows)

# Write the data to the output raster.
out_band = out_ds.GetRasterBand(1)
out_band.WriteArray(data)

# Compute statistics and build overviews.
out_band.FlushCache()
out_band.ComputeStatistics(False)
out_ds.BuildOverviews('average', [2, 4, 8, 16, 32, 64])
# plotting 
img2 = out_band.ReadAsArray(0, 0, out_ds.RasterXSize, out_ds.RasterYSize)
f = plt.figure()
plt.gray()  # just to make it in black and white

plt.imshow(img2)
plt.show()


del out_ds
