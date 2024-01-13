import os
import sys
from osgeo import ogr
from osgeo import gdal

#Creating the geometry of point
'''
p1=ogr.Geometry(ogr.wkbPoint)
p1.AddPoint(11.5,13)
x,y=p1.GetX(),p1.GetY()
print(p1)
'''
#Creating a MultiPointGeometry
'''
p2=ogr.Geometry(ogr.wkbMultiPoint)
p3=ogr.Geometry(ogr.wkbPoint)
p3.AddPoint(11.2,15)
p2.AddGeometry(p3)
#p3.AddPoint(11,14)
#p2.AddGeometry(p3)
p4=ogr.Geometry(ogr.wkbPoint)
p4.AddPoint(123,1234)
p2.AddGeometry(p4)
print(p2)
L=p2.GetGeometryRef(0)
print("abdals choice is",L)
'''
#Creating A line Geometry
A1=ogr.Geometry(ogr.wkbLineString)
A1.AddPoint(11.3,55)
A1.AddPoint(12,43)
A1.AddPoint(44,32)
print(A1)
A1.SetPoint(2,11.3,44)
print("your line after editing",A1)
V1=A1.GetPoints()
print(V1)
V1[3:3]=[(98,32)]
print(V1)

#Adding Multilines
I1=ogr.Geometry(ogr.wkbLineString)
I1.AddPoint(11,10)
I1.AddPoint(12,13)
I1.AddPoint(1,12)
print(I1)

I2=ogr.Geometry(ogr.wkbLineString)
I2.AddPoint(1,2)
I2.AddPoint(3,4)
I2.AddPoint(14,9)
print(I2)

I3=ogr.Geometry(ogr.wkbLineString)
I3.AddPoint(14,16)
I3.AddPoint(15,17)
I3.AddPoint(18,20)
print(I3)

I4=ogr.Geometry(ogr.wkbMultiLineString)
I4.AddGeometry(I1)
I4.AddGeometry(I2)
I4.AddGeometry(I3)
print("Your result will be",I4)
