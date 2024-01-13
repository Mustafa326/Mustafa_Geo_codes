#Importing the libraries
import os
import sys
from osgeo import ogr
from osgeo import gdal
import ospybook as ospy
#calling your driver
driver=ogr.GetDriverByName("Esri Shapefile")
print ("Your driver is :",driver)
#working with your data source
#ds=r'D:\mustafa05\osgeopy-data\global\ne_50m_populated_places.shp'
ds=r'D:\mustafa05\osgeopy-data\global'
data=ogr.Open(ds,1)
print("Your data-source is:",data)
if data is None:
    print("You are calling nothing at all")
#Using Ogr for extracting elements from a data_source

#getting the layer you want
lyr=data.GetLayer("ne_50m_populated_places")
#Getting the total amount of feature in the layer
count=lyr.GetFeatureCount()
print("the total amount of feature are:",count)
#print("Your lyr is:",lyr)
'''
#Looping over a shapefile to extract data from said shape file
i=0
for feat in lyr:
    pt=feat.geometry()
    x=pt.GetX()
    y=pt.GetY()
    name=feat.GetField("Names")
    pop=feat.GetField("POP_MAX")
    print("The name is",name,"The population is",pop,"The cordinates are",x,y)
    i+=1
    if i==10:
        break
del data
'''
'''
#Using Ospyboook
ospy.print_attributes(ds,5,['Names','POP_MAX'],geom=True)
'''
#Geting and printing the spatial reference
'''
ref=lyr.GetSpatialRef()
print(ref)
'''
if data.GetLayer('capital_cities.shp'):
    data.Delete('capital_cities.shp')
spatial=lyr.GetSpatialRef()
name="ofdCapital_cities"
#Creating a new layer in the data_source
output_lyr=data.CreateLayer(name,spatial,ogr.wkbPoint)
#creating a Field
sch=lyr.schema
output_lyr.CreateFields(lyr.schema)
#creating a blank feature
defn=output_lyr.GetLayerDefn()
features=ogr.Feature(defn)
for feat in lyr:
    if feat.GetField("FEATURECLA")=='Admin-0 capital':
        geom=feat.geometry()
        features.SetGeometry(geom)
        for i in range(feat.GetFieldCount()):
            a=feat.GetField(i)
            features.SetField(i,a)
        output_lyr.CreateFeature(features)
del data
    
