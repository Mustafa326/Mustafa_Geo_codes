#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Mon Dec 30 11:15:32 2019

@author: grel
"""

from osgeo import gdal, ogr,osr
import os,sys
from ospybook.vectorplotter import VectorPlotter

data=ogr.Open(r'/GIS-BS-Python/osgeopy-data/us/osgeopy-data/US')
vol_lyr=data.GetLayer('us_volcanos_albers')
cities_lyr = data.GetLayer('cities_albers')

# Flawed_method
# making Temporay memory file to save our results
# will give no effect on the disk

memory_driver=ogr.GetDriverByName('memory')
mem_datasource=memory_driver.CreateDataSource('temp')
# creating layer
buff_lyr=mem_datasource.CreateLayer('buffer')
# creating  feature
buff_feat=ogr.Feature(buff_lyr.GetLayerDefn())

# Now coming to our task.
# first we loop through volcano feeatures and setting the required buffers

for vol_feat in vol_lyr:
    buff_geom=vol_feat.geometry().Buffer(16000)
    tmp=buff_feat.SetGeometry(buff_geom)
    tmp=buff_lyr.CreateFeature(buff_feat)

# creating another temporary layer to save the results
    
result_lyr=mem_datasource.CreateLayer('result')

buff_lyr.Intersection(cities_lyr,result_lyr)
print (result_lyr.GetFeatureCount())

# Easy and efficient-Method

vol_lyr.ResetReading()
# making multipolygon geometry to save the reults
multipoly=ogr.Geometry(ogr.wkbMultiPolygon)
for v_feat in vol_lyr:
    buff_geom=v_feat.geometry().Buffer(16000)
    multipoly.AddGeometry(buff_geom)

# applying union cascaded function 
# it is used to combine small polygons into a  large or we can say in one polygon and also overlap area counted only one time
cities_lyr.SetSpatialFilter(multipoly.UnionCascaded())
print cities_lyr.GetFeatureCount()