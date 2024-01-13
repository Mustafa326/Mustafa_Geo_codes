import os
import sys
from osgeo import gdal
from osgeo import ogr
import ospybook
driver=ogr.GetDriverByName("Esri Shapefile")
print (driver)
ds=r'D:\mustafa05\osgeopy-data\global\ne_50m_populated_places.shp'
print ("your data source is",ds)
data=ogr.Open(ds)
#in order to create a geometry first you have to create a blank geometry
'''
pnt=ogr.Geometry(ogr.wkbPoint)
pnt.AddPoint(123,34.5,23)
print ("your point is",pnt)
'''
#Creating a LineString
'''
lin=ogr.Geometry(ogr.wkbLineString)
lin.AddPoint(123,34.5,23)
lin.AddPoint(129,37.5,29)
lin.AddPoint(139,47.5,39)
print ("your line is",lin)
'''
#MultiPoint
'''
mlines=ogr.Geometry(ogr.wkbMultiPoint)
pii=ogr.Geometry(ogr.wkbPoint)
pii.AddPoint(123,34.5,23)
mlines.AddGeometry(pii)
pii.AddPoint(125,37.5,33)
mlines.AddGeometry(pii)
print ("your mline is",mlines)
print("your Geom REF is",mlines.GetGeometryRef(1))
'''
#print(mlines.GetGeometryRef(1).AddPoint(126,234))
#for editing through loops
'''
for i in range(mlines.GetGeometryCount()):
    pt=mlines.GetGeometryRef(i)
    pt.AddPoint(pt.GetX()+1,pt.GetY())
print("Your new multipoint is",mlines)
'''
#Using Set points for editing
lan=ogr.Geometry(ogr.wkbLineString)
lan.AddPoint(54,37)
lan.AddPoint(62,35.5)
lan.AddPoint(70.5,38)
lan.AddPoint(74.5,41.5)
print("Your Linestrig is:",lan)
lan.SetPoint(3,43,54)
print("Your Line after editing is",lan)
#Editing through for loop
for i in range(lan.GetPointCount()):
    pt=lan.SetPoint(i,lan.GetX(i)+12,lan.GetY()-3)
print("Your Line after editing through Setpoint is",lan)
#Geting the Points from The LineString
vertices=lan.GetPoints()
print("Your Points in lan are:",vertices)
#Creating a new points in the SameLine
vertices[2:2]=[(10,100)]
print("Your Points after editing",vertices)
#Now inserting the point in a new LineString
new_lan=ogr.Geometry(ogr.wkbLineString)
for vertexes in vertices:
    new_lan.AddPoint(*vertexes)
print("Your Line is",new_lan)
#Now inserting the point in a same original LineString
for j in range(len(vertices)):
    lan.SetPoint(j,*vertices[j])
print("Your edited Line is",lan)