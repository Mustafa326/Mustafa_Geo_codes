#this is practice for creating a new vector
import os
import sys
from osgeo import gdal
from osgeo import ogr
import osr
import ospybook
ds=r'D:\mustafa05\osgeopy-data\global\ne_50m_admin_0_countries.shp'
print ("The data_source you called is",ds)
data=ogr.Open(ds)
#getting supported Drivers from the data_source that you called
driver=data.GetDriver()
print (driver)
#Trying to create a new vector

driver1=ogr.GetDriverByName("ESRI Shapefile")
print("The driver you called is:",driver1)
data_source_driver=driver1.CreateDataSource("data_source.shp")
#setting the spatial reference
sr=osr.SpatialReference()
sr.ImportFromEPSG(4326)
if data_source_driver is None:
    print("You are caling nothing")
outfile = driver1.CreateDataSource('exampledata.shp') # create new shapefile
outlayer = outfile.CreateLayer('exampledata', geom_type=ogr.wkbPolygon, srs=sr)  # create new layer in the shapefile 
 
#nameField = ogr.FieldDefn('Name', ogr.OFTString)        # create new field of type string called Name to store the country names
outlayer.CreateField(ogr.FieldDefn('Name', ogr.OFTString))                         # add this new field to the output layer
#nameField = ogr.FieldDefn('Population', ogr.OFTInteger) # create new field of type integer called Population to store the population numbers
outlayer.CreateField(ogr.FieldDefn('Population', ogr.OFTInteger))                         # add this new field to the output layer
 
featureDefn = outlayer.GetLayerDefn()  # get field definitions