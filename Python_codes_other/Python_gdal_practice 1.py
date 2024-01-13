import os
import sys
from osgeo import gdal
from osgeo import ogr
import ospybook
from ospybook.vectorplotter import VectorPlotter
#to Test wether the Vscode is working or not, gdal.Open would give an error as no directory is defined and the file test.tiff oes not exist
'''
gdal.UseExceptions()
ds=gdal.Open('test.tiff')
'''
#creating a point Geomentry
'''
point=ogr.Geometry(ogr.wkbPoint)
point.AddPoint(1198054.34, 648493.09)
print ("Your First Point Is",point)
Alpha=ogr.Geometry(ogr.wkbPoint)
Alpha.AddPoint(12.34,5.65)
print ("Your Second Point Geometry is",Alpha.ExportToWkt())
'''
#Creating a linestring
'''
line=ogr.Geometry(ogr.wkbLineString)
line.AddPoint(12,32,23)
line.AddPoint(23,45)
line.AddPoint(34,56)
line.AddPoint(57,67)
print ("The LineString you Created is",line)
'''
# Create ring along with geometry
'''
Lring = ogr.Geometry(ogr.wkbLinearRing)
Lring.AddPoint(1179091.1646903288, 712782.8838459781)
Lring.AddPoint(1161053.0218226474, 667456.2684348812)
Lring.AddPoint(1214704.933941905, 641092.8288590391)
Lring.AddPoint(1228580.428455506, 682719.3123998424)
Lring.AddPoint(1218405.0658121984, 721108.1805541387)
Lring.AddPoint(1179091.1646903288, 712782.8838459781)
#creating a polygon
Lpoly = ogr.Geometry(ogr.wkbPolygon)
Lpoly.AddGeometry(Lring)
print (Lpoly.ExportToWkt())
'''
#Creating a Multipont
'''
mul=ogr.Geometry(ogr.wkbMultiPoint)
poi1=ogr.Geometry(ogr.wkbPoint)
poi1.AddPoint(12.45,13.45,15.67)
print("Your first",poi1.ExportToWkt())
mul.AddGeometry(poi1)
poi2=ogr.Geometry(ogr.wkbPoint)
poi2.AddPoint(17.56,17.71,22.56)
print("Your Second",poi2)
mul.AddGeometry(poi2)
print(mul.ExportToWkt())
'''
#Gis Manipulation

driver=ogr.GetDriverByName("Esri Shapefile")
print (driver)
ds=r'D:\mustafa05\osgeopy-data\global\ne_50m_populated_places.shp'
print (ds)
data=ogr.Open(ds,0)
if data is None:
    print("You have no data please try again")
else:
    lyr=data.GetLayer()
    count=lyr.GetFeatureCount()
    print("The total amount of features in the layer is",count)

#iterating over  a data

i=0
for feat in lyr:
    i+=1
    pt=feat.geometry()
    x=pt.GetX()
    y=pt.GetY()
    pop=feat.GetField("POP_MAX")
    print ("Your x points is",x,"And","your y point is",y,"And your population is",pop)
    #print (pt)
    if i==10:
        break
#del ds

#To print specific feature

layt=lyr.GetFeature(8)
print ("your 8th feature is",layt)

#using ospybook to show a nice table through extracting the attributes from the feature in the layer

ospybook.print_attributes(ds,4,['POP_MAX'])

#Getting Spatial Reference

sre=lyr.GetSpatialRef()
print (sre)

#Altering data from vector
'''
i=lyr.GetLayerDefn().GetFieldIndex("Name")
fld1=ogr.FieldDefn("Names", ogr.OFTString)
lyr.AlterFieldDefn(i,fld1,ogr.ALTER_NAME_FLAG)
'''
