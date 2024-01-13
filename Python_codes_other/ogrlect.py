# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""
'''

from osgeo import gdal
# importing library
import matplotlib
from osgeo import ogr
import ospybook as pb
from ospybook.vectorplotter import VectorPlotter

# import matplotlib
# import numpy as np
# Step1:  to call the driver by name / checking

# driver=ogr.GetDriverByName('GeoJSON') # Driver name is case sensitive
driver1 = ogr.GetDriverByName('Esri Shapefile')
# print (driver)
print(driver1)

# step2: Print first 10 features of the vector shapefile
# as this is a Reading vector so no need to call the driver

# adding Path to shapefile
data_Path = r'/opt/mustafa05/osgeopy-data/global/ne_50m_populated_places.shp'
# data_Path=r'/GIS-BS-Python/osgeopy-data/global/ne_110m_admin_0_countries.shp'

# opening data using OGR
data = ogr.Open(data_Path)
# checking whether data is read correctley or not

if data is None:
    print('please do it again')
# getting the first layer
lyr = data.GetLayer()

# Task 1: Printing First 10 feature with their attributes of name Pop est and labelrank

i = 0
for f in lyr:
    if i == 10:
        break
    i = i + 1
    #    fname=f.GetField('name')
    # fname = f.GetField(8)
    fname = f.GetField('NAME')
    pop = f.GetField('pop_max')
    #  pop=f.GetFieldAsString('pop_max')
    #  lrank=f.GetField('labelrank')
    print(fname, type(fname), pop, type(pop))
del data

# getting feature count in the given shapefile
featcount = lyr.GetFeatureCount()
print(featcount)
# getting field Count for this we first have to call lyr-definition
# getting Layer Defination (means calling  )
ldef = lyr.GetLayerDefn()
fcount = ldef.GetFieldCount()
print
fcount
# alternative way to get features by using feature ID
tfeat = lyr.GetFeatureCount()
print
tfeat
nfeat = lyr.GetFeature(1)
print(lyr.GetNextFeature().Name)
# print (lyr.GetNextFeature().Name)
print
nfeat.Name, nfeat.pop_max, nfeat.geometry().GetX(), nfeat.geometry().GetY()

# just to check and want to extract last feature
# print (lyr.GetFeature(tfeat-1).Name)


# how to know that what will be the field names. really import (Attribute Names)
# 1st step is getting Field Count
lyrdef = lyr.GetLayerDefn()
print
lyrdef
# getting field count
fieldcount = lyrdef.GetFieldCount()

print
fieldcount
# As we have to get all the names of attribute fields so there is a need of loop iteration
# for i in range(fieldcount):
# fielddefn=lyrdef.GetFieldDefn(i)
# print fielddefn.width # (please try other attributes other than name or name with capital letter)


'''
#  Reading data using ospybook
# first printing some attributes using ospybook module
#pb.print_attributes(lyr,4,['NAME','POP_MAX'])
#for other vector data-format
#pb.print_attributes(lyr,11,['name', 'postal'])  # again make notice it is case sensitive

# View-Vector-data-using Vectorplotter

#vp=VectorPlotter(True) # you can also give 1 in replacement of true
#vp.plot(lyr,'o')
#vp.plot(lyr,'bo')

# Getting metadata of the file
# getting again feature count from layer

featcount=lyr.GetFeatureCount()
print featcount
# getting spatial extent. a rectangle contructed from minimum an maxiumum coordinates
extent=lyr.GetExtent()
print extent
# getting geometery type....
print lyr.GetGeomType()
# checking which type of geometry
#print (lyr.GetGeomType()==ogr.wkbPoint)
print (lyr.GetGeomType()==ogr.wkbPolygon)
# getting geometry name
# first get the layer
feat=lyr.GetFeature(0)
print (feat.geometry().GetGeometryName())

# also give spatial referene system assigned to the layer in WKT format

print lyr.GetSpatialRef()

# getting information about attribute fields
# first iterating through all the fields in lyr.schema

for f in lyr.schema:
    print (f.name,f.GetTypeName(),f.GetPrecision())

