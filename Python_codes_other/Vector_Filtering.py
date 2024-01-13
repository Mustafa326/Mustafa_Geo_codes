#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Thu Nov 21 19:39:58 2019

@author: grel
"""

import os
import sys
from osgeo import ogr
import ospybook as pb
from ospybook.vectorplotter import VectorPlotter
ds = ogr.Open(r'D:\mustafa05\osgeopy-data\global')
 #getting the layer
if ds is None:
    print("Your datasource has not been read please check again your data path")
lyr=ds.GetLayer('ne_50m_admin_0_countries')
lyr1 = ds.GetLayer('ne_50m_populated_places')
vp=VectorPlotter (True)
vp.plot(lyr,fill=False)
'''

lyr.SetAttributeFilter('continent="Asia"')
print (lyr.GetFeatureCount())
#vp=VectorPlotter(True)
vp.plot(lyr,'r')
'''
'''
# applying another filter on the existing filtered layer
lyr.SetAttributeFilter("continent='South America'")
vp.plot(lyr,'y')
'''
# for clearning attribute filter simply pass None
'''
lyr.SetAttributeFilter (None)
print (lyr.GetFeatureCount())
'''
'''
# Applying Bounding Box (Rectangular)
lyr.SetSpatialFilterRect (100,-50,160,10)
vp.plot(lyr,'b')
'''
'''
# combining operations of both Spatial and Attribute Filter
vp.plot(lyr, fill=False)
lyr.SetAttributeFilter("name = 'Germany'")
feat = lyr.GetNextFeature()

#print lyr.GetFeatureCount()
germany = feat.geometry().Clone()

# checking features in Layer 2
print (lyr1.GetFeatureCount())
vp.plot(lyr1,'b.')
# now applying Spatial filter by giving Geometry of germany
lyr1.SetSpatialFilter(germany)
print (lyr1.GetFeatureCount())
vp.plot(lyr1,'ro')
 # combing filters by applying Attribute filter to Cities Layer
 
lyr1.SetAttributeFilter('pop_min>1000000')
print (lyr1.GetFeatureCount())
vp.plot(lyr1,'y.')

# now remove Spatial Filter
lyr1.SetSpatialFilter(None)
print (lyr1.GetFeatureCount())
vp.plot(lyr1, 'm^', markersize=8)
'''

'''
# now applying ExecuteSQL Function queries
ds = ogr.Open(r'/GIS-BS-Python/project/global')
# sql = #'''#SELECT ogr_geom_area as area, name, pop_est FROM 'ne_50m_admin_0_countries' ORDER BY POP_EST DESC'''
#lyr1=ds.ExecuteSQL(sql)
#pb.print_attributes(lyr, 3)
