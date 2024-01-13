#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Mon Jan  6 10:26:12 2020

@author: grel
"""
from osgeo import gdal
import glob
import os, sys
import math
# function to compute output extent for each input raster
def get_extent(fn):
    '''Returns min_x, max_y, max_x, min_y'''
    ds = gdal.Open(fn)
    gt = ds.GetGeoTransform()
    return (gt[0], gt[3], gt[0] + gt[1] * ds.RasterXSize,
        gt[3] + gt[5] * ds.RasterYSize)
    
os.chdir(r'D:\mustafa05\osgeopy-data\Massachusetts')
input_files=glob.glob('O*.tif')
# calculating extent for O raster
min_x, max_y,max_x,min_y=get_extent (input_files[0])
print("The x and y values are:","min_x:",min_x,"max_y,",max_y,"max_x",max_x,"min_y",min_y)
# now looping through all raster formats to compute the output extent
for fn in input_files[1:]:
    minx, maxy, maxx, miny = get_extent(fn)
   # print minx
    min_x = min(min_x, minx)
    max_y = max(max_y, maxy)
    max_x = max(max_x, maxx)
    min_y = min(min_y, miny)
   # print min_x
    
# calculae the dimesions of the output
input_ds = gdal.Open(input_files[0])
gt = input_ds.GetGeoTransform()
rows = math.ceil((max_y - min_y) / -gt[5]) # to get smallest integer value ,"Ceil"function is used
columns = math.ceil((max_x - min_x) / gt[1])# as rows are coloumns are integers
print("The column is:",columns,"The rows is:",rows)


# Create the output dataset.
driver = gdal.GetDriverByName('GTiff')
out_ds = driver.Create('mosaic.tif', int (columns), int (rows))
out_ds.SetProjection(input_ds.GetProjection())
out_band = out_ds.GetRasterBand(1)
# Change the upper left coordinates in the geotransform and add it to the
# output image.
gt = list(input_ds.GetGeoTransform())
gt[0], gt[3] = min_x, max_y
out_ds.SetGeoTransform(gt)
for fn in input_files:
    in_ds = gdal.Open(fn)
    # Create a transformer between this input image and the output mosaic
    # and then use it to calculate the offsets for this raster in the
    # mosaic.
    trans = gdal.Transformer(input_ds, out_ds, [])
    print("Yourtransform is:",trans)
    success,xyz = trans.TransformPoint(False, 0, 0) # calculating correct pixel offset for the mosaic (upper left corner)
    # flase is used to compute offsets from source to destination
    x, y, z = map(int, xyz)
    # Copy the data.
    data = input_ds.GetRasterBand(1).ReadAsArray()
    out_band.WriteArray(data, x, y)
del input_ds, out_band, out_ds

# From later in the text, get the real-world coordinates from out_ds at
# column 1078 and row 648.
'''
trans = gdal.Transformer(out_ds, None, [])
success, xyz = trans.TransformPoint(0, 1078, 648)
print(xyz)
del input_ds, out_band, out_ds
'''