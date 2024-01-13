import os
import sys 
from osgeo import gdal
from osgeo import ogr
from osgeo import osr
import ospybook
from ospybook.vectorplotter import VectorPlotter 
#Calling your driver
#driver=ogr.GetDriverByName("Esri Shapefile")
#print("Your driver is:",driver)
#Reading data from Vector layer
#ds=r'D:\mustafa05\osgeopy-data\global\ne_50m_populated_places.shp'
ds=r'D:\mustafa05\osgeopy-data\global'
#data=ogr.Open(ds,0)
data=ogr.Open(ds,1)
if data is None:
    print("You have opened nothing please check your data")
input_lyr=data.GetLayer('ne_50m_populated_places')
print ("The layer you got is:",input_lyr)
count=input_lyr.GetFeatureCount()
print("The total number of features in this data laye are:",count)
'''
featur=lyr.GetFeature(7)
print("Your Feature is:",featur)
print(lyr.GetNextFeature())
print(lyr.GetSpatialRef())
print(lyr.GetGeomType())
'''
'''
i=0
for feat in lyr:
    geom=feat.geometry()
    X=geom.GetX()
    Y=geom.GetY()
    name=feat.GetField('Names')
    pop=feat.GetField('POP_MAX')
    print("The name is",name,"The Population is",pop,"The cordinates are",X,"and",Y)
    i+=1
    if i==10:
        break
del data
'''
#Using ospybook to print the attributes from the same layer
'''
ospybook.print_attributes(lyr,10,['Names','POP_MAX'],geom=False)
'''
#Exporting Capital cities to a new shapefile
'''
current_lyr=data.GetLayer('capital_cities')
if current_lyr:
    data.DeleteLayer('capital_cities')
name="d"
sr=input_lyr.GetSpatialRef()
out_lyr=data.CreateLayer(name,sr,ogr.wkbPoint)
out_lyr.CreateField(input_lyr.schema)
defn=out_lyr.GetLayerDefn()
bfeat=ogr.Feature(defn)
for feat in input_lyr:
    if feat.GetField("FEATURECLA")=='Admin-0 capital':
        geom=feat.geometry()
        field=bfeat.SetGeometry(geom)
        for i in range(feat.GetFieldCount()):
            value=feat.GetField(i)
            out=bfeat.SetField(i,value)
        out_lyr.CreateFeature(bfeat)
'''
#Creating a new shapefile
'''
drivern=ogr.GetDriverByName("Esri Shapefile")
print("The driver you called is:",drivern)
#Creating new data_source
sra=osr.SpatialReference()
sra.ImportFromEPSG(4326)
mustafa_haider=drivern.CreateDataSource('musta.shp')
#creating the layer
lyr=mustafa_haider.CreateLayer('musada',sra,ogr.wkbPoint)
#creating the field
field_name=ogr.FieldDefn('S',ogr.OFTReal)
field_name.SetWidth(12)
lyr.CreateField(field_name) 
lyr.CreateField(ogr.FieldDefn('X',ogr.OFTString))
lyr.CreateField(ogr.FieldDefn('Y',ogr.OFTString))
'''
#Editing a Field within a feature by using the AlterFieldDefn flag
'''
i=input_lyr.GetLayerDefn().GetFieldIndex("Names")
field_defn=ogr.FieldDefn("Name",ogr.OFTString)
input_lyr.AlterFieldDefn(i,field_defn,ogr.ALTER_NAME_FLAG)
'''
#Printing the number of layers in a data source
'''
for feat in range(data.GetLayerCount()):
    asd=data.GetLayer(feat)
    print(asd)
#for printing the number of features in a layer
for i in range(input_lyr.GetFeatureCount()):
    print(input_lyr.GetFeature(i))
# for printing all fields in a feature of an layer
for feat in input_lyr:
    for j in range(feat.GetFieldCount()):
        print(feat.GetField(j))
'''
'''
lyr=data.GetLayer('ne_50m_admin_0_countries')
lyr1 = data.GetLayer('ne_50m_populated_places')
vp=VectorPlotter (True)
lyr.SetAttributeFilter('continent="Asia"')
print (lyr.GetFeatureCount())
#vp=VectorPlotter(True)
vp.plot(lyr,'r')
'''
#Executing SQL commands
'''
data2=ogr.Open(r'D:\mustafa05\osgeopy-data\global\natural_earth_50m.sqlite')
print("Your chosen layer is:",data)
#sql='''SELECT geometry,area(geometry) AS area,name,pop_est FROM countries ORDER BY pop_est DESC LIMIT 3'''
dad=data2.ExecuteSQL(sql)
ospybook.print_attributes(dad)
#Manipulating vector geometry
'''
'''
#Creating Point Geometry
point=ogr.Geometry(ogr.wkbPoint)
point.AddPoint(123,45.67,0)
x,y=point.GetX(),point.GetY()
print("Your point geometry is:",point)
print("Your x and y values are",x,y)

#Creating a Line Geometry
line=ogr.Geometry(ogr.wkbLineString)
line.AddPoint(125,345,678)
line.AddPoint(56,34,123)
line.AddPoint(44,67,123)
print("Your Line Geometry is:",line)
#Editing your Line Geometry
line.SetPoint(2,42,53,0)
print("Your new LineString is",line.ExportToWkt())
#Looping over a LineString
for j in range(line.GetGeometryCount()):
    line.SetPoint(j,line.GetX(j)+1,line.GetY(j)-1)
print("Your LineString after looping is",line)
#vertices method
vertices=line.GetPoints()
vertices[2:2]=([12,34,0])
print("Your points are",vertices)
#Creating a new line from these points
sidewalk=ogr.Geometry(ogr.wkbLineString)
for vertex in vertices:
    sidewalk.AddPoint(*vertex)
print("The newly created linestring is",sidewalk.ExportToWkt())
#Creating a multipoint
multi=ogr.Geometry(ogr.wkbMultiPoint)
pt=ogr.Geometry(ogr.wkbPoint)
pt.AddPoint(90,87)
multi.AddGeometry(pt)
pt2=ogr.Geometry(ogr.wkbPoint)
pt2.AddPoint(93,57)
multi.AddGeometry(pt2)
print("your MultiPoint is:",multi)
print(multi.GetGeometryRef(1))
#looping on the multipoint Geometry
for i in range(multi.GetGeometryCount()):
    geo=multi.GetGeometryRef(i)
    geo.AddPoint(geo.GetX()+2,geo.GetY()-1)
print("Your New Multipoint is",multi)
#Creating a MultiLineString
mul=ogr.Geometry(ogr.wkbMultiLineString)
l1=ogr.Geometry(ogr.wkbLineString)
l1.AddPoint(1,2,3)
l1.AddPoint(4,5,6)
mul.AddGeometry(l1)
l2=ogr.Geometry(ogr.wkbLineString)
l2.AddPoint(7,8,9)
l2.AddPoint(10,11,12)
mul.AddGeometry(l2)
l3=ogr.Geometry(ogr.wkbLineString)
l3.AddPoint(13,14,15)
l3.AddPoint(16,17,18)
mul.AddGeometry(l3)
print("Your multiLineString is:",mul)
#Creating a polygon
Lring=ogr.Geometry(ogr.wkbLinearRing)
Lring.AddPoint(12,14,5)
Lring.AddPoint(313,131,345)
Lring.AddPoint(72,9,1)
poly=ogr.Geometry(ogr.wkbPolygon)
poly.AddGeometry(Lring)
print("Your Polygon is",poly.ExportToWkt())
'''