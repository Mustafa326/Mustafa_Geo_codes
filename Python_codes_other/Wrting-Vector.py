#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Sat Nov  9 16:20:29 2019

@author: grel
"""
import os
import sys
from osgeo import ogr
from ospybook.vectorplotter import VectorPlotter
driver=ogr.GetDriverByName("Esri Shapefile")
print("The Driver you called is",driver)
driver1=ogr.GetDriverByName("GeoJSON")
print("The Driver you called is:",driver)
ds = ogr.Open(r'D:\mustafa05\osgeopy-data\global', 1)
if ds is None:
    sys.exit('Could not open folder.')
in_lyr = ds.GetLayer('ne_50m_populated_places')
if ds.GetLayer('capital_cities'):
    ds.DeleteLayer('capital_cities')

# getting inlayer spatial reference
inp_ref=in_lyr.GetSpatialRef()
print (inp_ref)
out_lyr = ds.CreateLayer('capital_cities', inp_ref, ogr.wkbPoint)
# getting scheme definition of input layer
sceme_input=in_lyr.schema
#print sceme_input
# getting input layer scheme to the output layer

out_lyr.CreateFields(sceme_input)

# creating the blank feature
#defining layer definition
out_defn=out_lyr.GetLayerDefn()
out_feat=ogr.Feature(out_defn)

# now start iterating through input layer features and adding to output_layer
for in_feat in in_lyr:
    if in_feat.GetField('FEATURECLA') == 'Admin-0 capital':
        geom = in_feat.geometry()
        out_feat.SetGeometry(geom)
        for i in range(in_feat.GetFieldCount()):
            value = in_feat.GetField(i)
            out_feat.SetField(i, value)
        out_lyr.CreateFeature(out_feat)
del ds
#Creating a new field
driver=


#Now checking the new shapefile using Vector plotter
