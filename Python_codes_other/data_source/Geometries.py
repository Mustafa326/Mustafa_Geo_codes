#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Tue Dec 10 17:46:36 2019

@author: grel
"""

import os , sys
from osgeo import ogr
from ospybook.vectorplotter import VectorPlotter


# first making data source  opened with ogr.Your data source path is will be changed depending upon your OS 


ds=ogr.Open(r'D:\mustafa05\data_source',1)
vp=VectorPlotter(True)
# first making check that if there is a Layer of pt_name it should be deleted
if ds.GetLayer('pt_Name'):
    ds.DeleteLayer('pt_Name')

# now reading railway(Line) file and try to check by plotting is file is read or not
    
line_name=ds.GetLayer('railways')
sch=line_name.schema
print(sch)
# convential Check 

if line_name is None:
    print("No layer was fetched in this regard")

# plotting the vector layer
    

#vp.plot(line_name, 'bo') # File is fetehed successfully 


# making a  point layer to save line vertics points 
    
pt_name= ds.CreateLayer('pt_Name', line_name.GetSpatialRef(), ogr.wkbPoint)

# now making schames means creating attribute field tables from line layer

pt_name.CreateFields(sch)

# now making blank feature using point layer defination

pt_feat=ogr.Feature(pt_name.GetLayerDefn())

# creating point geometry instance 
pt_geom=ogr.Geometry(ogr.wkbPoint)

# now making iterations to extract the points from line layer
for line_feat in line_name:
    attrib=line_feat.items() 
    
    attribut=attrib.keys()
    #print attribut
    for fld_name in attribut:
        #print attrib[fld_name]
        pt_feat.SetField(fld_name, attrib[fld_name])
    for cord in line_feat.geometry().GetPoints():
        pt_geom.AddPoint(*cord)
        pt_feat.SetGeometry(pt_geom)
        pt_name.CreateFeature(pt_feat)

pt=ds.GetLayer('pt_Name')
vp.plot(pt, 'bo')

#
