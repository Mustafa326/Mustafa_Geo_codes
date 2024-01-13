from osgeo import gdal,osr
import os, sys
import matplotlib.pyplot as plt
import numpy as np
# band stacking into a new one

path=gdal.Open(r'D:\mustafa05\osgeopy-data\Landsat\Washington\p047r027_7t20000730_z10_nn10.tif')

#ds=gdal.Open(path)
band=path.GetRasterBand(1)

gt = path.GetGeoTransform()
print("The geotransform you got is:",gt)

# Now get the inverse geotransform. The original can be used to convert offsets to real-world coordinates.
# while the inverse can be used to convert real-world coordinates to offsets  
# AS I am using GDAL 2 version so nothing to worry at all# GDAL 2.x: You get the geotransform or None
inv_gt = gdal.InvGeoTransform(gt)
print("The inverse is:",inv_gt)

# Use the inverset geotransform to get some pixel offsets from real-world UTM Co-ordinates (Since that is what the landsat images use).
# The offsets are returned as floating points
offsets = gdal.ApplyGeoTransform(inv_gt, 465200, 5296000)
print("Your image-coordinates or offsets are:",offsets)

# Convert the offsets to integers.
xoff, yoff = map(int, offsets)
print(xoff, yoff)

# And use them to read a pixel value.
value = band.ReadAsArray(xoff, yoff, 1, 1)[0,0]
print(value)

# Reading in one pixel at a time is really inefficient if you need to read
# a lot of pixels, though, so here's how you could do it by reading in all
# of the pixel values first and then pulling out the one you need.
'''
data = band.ReadAsArray()
x, y = map(int, gdal.ApplyGeoTransform(inv_gt, 465200, 5296000))
value = data[yoff, xoff]
print(value)
'''