#Improting the required libraries 
import io
import sys
from PyQt5 import QtWidgets, QtWebEngineWidgets
import geopandas 
import matplotlib.pyplot as plt
import shapely.speedups

#reading the required shapefiles 
source1borders=r'F:\Mustafa stuff\NUST\Second Semester\SDSS\Lessons\Lesson 4\Helsinki_borders.shp'
source2railway=r'F:\Mustafa stuff\NUST\Second Semester\SDSS\Lessons\Lesson 4\TravelTimes_to_5975375_RailwayStation.shp'
data1=geopandas.read_file(source1borders)
print("Your data is:",data1)
data2=geopandas.read_file(source2railway)
print("Your data is:",data2)
# Ploating the data 
ax = data2.plot(facecolor='gray')
data1.plot(ax=ax, facecolor='None', edgecolor='blue')
#Intersection through the overlay method
#In order to perform any kind of geometric operation we need to chekc crs
print(data1.crs==data2.crs)
#Intersection
intersection = geopandas.overlay(data1, data2, how='intersection')
intersection.plot(color="b")
print(intersection.head())
#Storing the data
# Output filepath
outfp = r'F:\Mustafa stuff\NUST\Second Semester\SDSS\Lessons\Lesson 4\TravelTimes_to_5975375_RailwayStation_Helsinki.geojson'
# Use GeoJSON driver
intersection.to_file(outfp, driver="GeoJSON")

## AGGREGATING DATA
#Data aggregation refers to a process where we combine data into groups, basically the geometries are jioned depending upon an atribute
#the dissolve() function can do that
# Conduct the aggregation
dissolved = intersection.dissolve(by="car_r_t")
# What did we get
print(dissolved.head())
# printing the number of rows and columns in the new layer
print("The Columns are as follows:",dissolved.columns)
print("THe number rows in the dissolved layer is:",len(dissolved)
)
#Simplifing the geometry
#Sometimes a person requires less detail in their data
source3rivers=r'F:\Mustafa stuff\NUST\Second Semester\SDSS\Lessons\Lesson 4\Amazon_river.shp'
data3=geopandas.read_file(source3rivers)
print(data3.head(4))
#Print crs
print(data3.crs)
# Plot the river
data3.plot();
#Ploting column
print(data3.columns)
#simplifying data
# Generalize geometry
data3['geom_gen'] = data3.simplify(tolerance=20000)
#seting the new column
data3=data3.set_geometry('geom_gen')
#ploting
data3.plot()
#DATA RECLASSIFICATION
