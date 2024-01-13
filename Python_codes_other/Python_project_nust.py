#Importing the libraries
import os
import sys
from osgeo import ogr
from osgeo import gdal
import ospybook
from ospybook.vectorplotter import VectorPlotter
#calling your driver
driver=ogr.GetDriverByName("Esri Shapefile")
print ("Your driver is :",driver)
#working with your data source
ds=r'F:\Mustafa stuff\NUST\First Semester\Geodatabase and programming\QGIS and OSM\islamabad_shapefile.shp'
#ds=r'D:\mustafa05\osgeopy-data\global'
data=ogr.Open(ds,0)# 0 means read-only. 1 means writeable.
print("Your data-source is:",data)
if data is None:
    print("You are calling nothing at all")
#Getting a layer from the shapefile
layer=data.GetLayer()#by default it would pick the first layer
print("Your layer is:",layer)
#Starting vector plotter
vp=VectorPlotter (True)
#Getting feature to be buffered in the shapefile
feat=layer.GetFeature(0)
print("Your feature is:",feat)
geom=feat.geometry()
#buffering the data
buffer_geom=geom.Buffer(160)
print("Your buffer is:",buffer_geom)
vp.plot(buffer_geom,fill=False)#For plotting purposes
#Calculating the area of all polygon within the shapefile
area = 0
for i in range (0,layer.GetFeatureCount()):
    feat2=layer.GetFeature(i)
    geom2=feat2.geometry()
    area += geom2.GetArea()
print(("The area of yourshapefile is %s")%(area)) 
#Calculating the envalope of a geometry
feat3=layer.GetFeature(1)
geom3=feat3.geometry()
envalope=geom3.GetEnvelope()
print (("minX: %d, minY: %d, maxX: %d, maxY: %d") %(envalope[0],envalope[2],envalope[1],envalope[3]))

#Overlay operations in spatial analysis (Intersection)
firstshapefile=r'F:\Mustafa stuff\NUST\First Semester\Geodatabase and programming\QGIS and OSM\islamabad_shapefile.shp'
firstshapefileDS = driver.Open(firstshapefile, 0)
firstlayer = firstshapefileDS.GetLayer()
print("Feature count of required features",firstlayer.GetFeatureCount())
firstfeat=firstlayer.GetFeature(894)
print("Your feature is:",firstfeat)
print("The name is",firstfeat.GetFieldAsString("name"))
firstgeom=firstfeat.geometry()
secondshapefile=r'F:\Mustafa stuff\NUST\First Semester\Geodatabase and programming\QGIS and OSM\Pakistan_Atomic_Energy_Commission.shp'
secondshapefileDS = driver.Open(secondshapefile, 0)
secondlayer = secondshapefileDS.GetLayer()
print("Count",secondlayer.GetFeatureCount())
secondfeat=secondlayer.GetFeature(0)
print("Your feature is:",secondfeat)
print(secondfeat.GetFieldAsString("name"))
    # Keep this feature
secondgeom=secondfeat.geometry()
intersection = firstgeom.Intersection(secondgeom)
print("The intersect is:",intersection)
pcnt =intersection.GetArea()
print("The area of the selected feature is:",pcnt)
vd=VectorPlotter(True)
vd.plot(intersection,fill="True")#For plotting purposes


#Clipping operation
#Clipping
## Input
#ShapefileInput=r'F:\Mustafa stuff\NUST\First Semester\Geodatabase and programming\QGIS and OSM\islamabad_shapefile.shp'
#inputDataSource = driver.Open(ShapefileInput, 0)
#inputLayer = inputDataSource.GetLayer()
#print("The number of features are:",inputLayer.GetFeatureCount())
## Clip
#CS=r'F:\Mustafa stuff\NUST\First Semester\Geodatabase and programming\QGIS and OSM\Pakistan_Atomic_Energy_Commission.shp'
#ClipingSource = driver.Open(CS,0)
#inputClipLayer = ClipingSource.GetLayer()
#print(("The Clip shapefile has %s number of features") %(inputClipLayer.GetFeatureCount()))
## Clipped Shapefile
#outputshapefile=r'F:\Mustafa stuff\NUST\First Semester\Geodatabase and programming\QGIS and OSM\clip_result2.shp'
#outputDataSource = driver.CreateDataSource(outputshapefile)
#outputLayer = outputDataSource.CreateLayer('FINAL', geom_type=ogr.wkbMultiPolygon)
#cliplayer=ogr.Layer.Clip(inputLayer, inputClipLayer, outputLayer)


#To count features and print their id
#for f in range(0,firstlayer.GetFeatureCount()):
 #   fe=firstlayer.GetFeature(f)
  #  print(("The name %s of id %s is")%(fe.GetFieldAsString("name"),f))
  #ogr2ogr -f KML "F:\Mustafa stuff\NUST\First Semester\Geodatabase and programming\QGIS and OSM\outputinkml.kml" "F:\Mustafa stuff\NUST\First Semester\Geodatabase and programming\QGIS and OSM\clip_result2.shp" 