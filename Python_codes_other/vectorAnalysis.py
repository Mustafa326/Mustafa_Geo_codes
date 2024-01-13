#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Mon Dec 30 10:46:30 2019

@author: grel
"""

from osgeo import gdal, ogr,osr
import os,sys
from ospybook.vectorplotter import VectorPlotter

# question What percentage of New Orleans is made of wetlands

# getting water body file
ds= r'/GIS-BS-Python/osgeopy-data/us/osgeopy-data/US/wtrbdyp010.shp'
data=ogr.Open(ds)

if data is None:
    print "No file to read"
# plotting the data
lyr=data.GetLayer(0)
vp=VectorPlotter(1)
#v.plot(lyr,'b')

# restricting water body layer near to new orleans water bodies

# attribute filter
lyr.SetAttributeFilter('WaterbdyID = 1011327')
# layer.GetNext Feature
marsh_feat = lyr.GetNextFeature()
# making copy of geometry 
marsh_geom = marsh_feat.geometry().Clone()
vp.plot(marsh_geom, 'b')
# starting working on second layer
ds2= r'/GIS-BS-Python/osgeopy-data/louisiana/osgeopy-data/Louisiana/NOLA.shp'
data2=ogr.Open(ds2)

if data2 is None:
    print "No file to read"
# plotting the data
lyr1=data2.GetLayer(0)
nola_feat = lyr1.GetNextFeature()
nola_geom = nola_feat.geometry().Clone()
vp.plot(nola_geom, fill=False, ec='red', ls='dashed', lw=3)


# now coming to original point 
# making Intersection of marshy land with new orlean areas

intersection=marsh_geom.Intersection(nola_geom)
vp.plot(intersection, 'yellow', hatch='x')

# now we got the area which is in new orleans but comprised of water bodies

# one problem exist that lakes, rivers , streams and marshy lands are all consist of water bodies... 
# whereas our task here is to find areas of new orleans that is made up of marshy/wetland
# now we must strict water body only to wetland..
lyr.SetAttributeFilter("Feature !='Lake'")
lyr.SetSpatialFilter(nola_geom)
area=0
for f in lyr:
    intersct=f.geometry().Intersection(nola_geom)
    area=area+ intersct.GetArea()
print area
# calculating percenatge area
percentage=area/nola_geom.GetArea()
print percentage




