#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Dec 31 15:10:57 2019

@author: grel
"""

# Open a Landsat band.

from osgeo import gdal,osr
import os, sys
import matplotlib.pyplot as plt
import numpy as np
# band stacking into a new one


path=gdal.Open(r'/GIS-BS-Python/osgeopy-data/washington/osgeopy-data/Landsat/Washington/p047r027_7t20000730_z10_nn10.tif')

#ds=gdal.Open(path)
band=path.GetRasterBand(1)

# Read in 3 rows and 6 columns starting at row 6000 and column 1400.
data = band.ReadAsArray(1400, 6000, 6, 3)
print(data)

# Convert the data to floating point using numpy.
data = band.ReadAsArray(1400, 6000, 6, 3).astype(float)
print(data)

# Or convert them to float by reading them into a floating point array.
data = np.empty((3, 6), dtype=float)
band.ReadAsArray(1400, 6000, 6, 3, buf_obj=data)
print(data)
# just check what will be the result very intersecting 
ds = gdal.GetDriverByName('GTiff').Create('test.tif', 10, 10)
band2 = ds.GetRasterBand(1)
band2.WriteArray(data, 4, 6)



img2 = band2.ReadAsArray(0, 0, ds.RasterXSize, ds.RasterYSize)
f = plt.figure()
#plt.gray()  # just to make it in black and white

plt.imshow(img2)
plt.show()



# Try reading 5 rows and columns from the test image you just made, but
# start at row 8 and column 2. This will fail because it's trying to read
# rows 8 through 13, but there are only 10 rows.

data = band.ReadAsArray(8, 2, 5, 5)

# What happens if you try to write more data than there is room for? First
# create an array of fake data.
data = np.reshape(np.arange(25), (5,5))
print(data)

# Now try to write it into the same area we just failed to read data from.
# That fails, too.
band.WriteArray(data, 8, 2)
