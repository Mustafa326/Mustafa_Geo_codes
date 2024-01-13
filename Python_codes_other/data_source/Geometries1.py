#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Dec 10 19:24:14 2019

@author: grel
"""

import os , sys
from osgeo import ogr
from ospybook.vectorplotter import VectorPlotter


# first making data source  opened with ogr.Your data source path is will be changed depending upon your OS 

vp=VectorPlotter(True)
ds=ogr.Open(r'D:\mustafa05\data_source',1)
if ds is None:
    print("Data Source not found")
# first making check that if there is a Layer of pt_name it should be deleted
if ds.GetLayer('Line_lyr'):
    ds.DeleteLayer('Line_lyr')

# now reading railway(Line) file and try to check by plotting is file is read or not

poly_lyr = ds.GetLayer(# Add ploygon layer name)
#vp.plot('wilderness.shp',fill='False')
# convential Check 
sr = poly_lyr.GetSpatialRef()
# plotting the vector layer    
#vp.plot('states_48.shp',fill=False)
#vp.plot(line_name, 'bo') # File is fetehed successfully 
line_lyr = ds.CreateLayer('Line_lyr', sr, ogr.wkbLineString)
line_lyr.CreateFields(poly_lyr.schema)
line_feat = ogr.Feature(line_lyr.GetLayerDefn())
for poly_feat in poly_lyr:
    atts = poly_feat.items()
    for fld_name in atts.keys():
        line_feat.SetField(fld_name, atts[fld_name])
    poly_geom = poly_feat.geometry()
    for i in range(poly_geom.GetGeometryCount()):
        ring = poly_geom.GetGeometryRef(i)
        line_geom = ogr.Geometry(ogr.wkbLineString)
        for coords in ring.GetPoints():
            print(coords)
            line_geom.AddPoint(*coords)
        line_feat.SetGeometry(line_geom)
        line_lyr.CreateFeature(line_feat)