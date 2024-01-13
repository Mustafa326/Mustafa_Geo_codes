from osgeo import ogr
import os
import gdal
import ospybook as pb
from ospybook.vectorplotter import VectorPlotter
vp=VectorPlotter(True)
vs=VectorPlotter(True)
ve=VectorPlotter(True)
#buffering
Shapefile = r"C:\Users\hp\Documents\multipoly.shp"
dr = ogr.GetDriverByName('ESRI Shapefile')
dS = dr.Open(Shapefile, 0) # 0 means read-only. 1 means writeable.
vp.plot(Shapefile,fill=False)
dN = "ESRI Shapefile"
driver = ogr.GetDriverByName(dN)
layer=dS.GetLayer()
print("Your selected layer is:",layer)
for feat in layer:
    geom=feat.geometry()
    bD = 123
    buffer = geom.Buffer(bD)
    ve.plot(buffer,fill=True)
print ("%s buffered by %d is %s" % (geom.ExportToWkt(), bD, buffer.ExportToWkt()))
#intersection
feat1=layer.GetFeature(4)
feat2=layer.GetFeature(5)
print("Your first feature is",feat1)
print("Your second feature",feat2)
geom1 = feat1.geometry()
geom2 = feat2.geometry()
intersection = geom1.Intersection(geom2)
#vp.plot(intersection,fill=False)
#union
union=geom1.Union(geom2)
vp.plot(union,fill=False)
#Area of a geometry
print ("The area is:",geom1.GetArea())
print("The union is:",union.ExportToWkt())
print ("The Intersection is: ",intersection.ExportToWkt())
#Clipping
## Input
inputShapefile=r'C:\Users\hp\Documents\multipoly.shp'
inDataSource = driver.Open(inputShapefile, 0)
inLayer = inDataSource.GetLayer()
print("The number of features in your shapefile are:",inLayer.GetFeatureCount())
## Clip
Clipshapefile=r'C:\Users\hp\Desktop\mygeodata\map\landcover-polygon.shp'
inClipSource = driver.Open(Clipshapefile,0)
inClipLayer = inClipSource.GetLayer()
print("The number of features in your clip shapefile are:",inClipLayer.GetFeatureCount())

## Clipped Shapefile... Maybe??? 
outputshapefile=r'C:\Users\hp\Desktop\mygeodata\map\output.shp'
outDataSource = driver.CreateDataSource(outputshapefile)

outLayer = outDataSource.CreateLayer('FINAL', geom_type=ogr.wkbMultiPolygon)
layerclip=ogr.Layer.Clip(inLayer, inClipLayer, outLayer)
print(outLayer.GetFeatureCount())
inDataSource.Destroy()
inClipSource.Destroy()
outDataSource.Destroy()
ClipDataSource = driver.Open(outputshapefile, 0)
layerclip=ClipDataSource.GetLayer()
geomclip=layerclip.GetFeature(0).geometry()
vs.plot(geomclip,fill=False)

for alphafeat in firstlayer:
    for betafeat in secondlayer:
        geom1=alphafeat.geometry()
        geom2=betafeat.geometry()
        if geom1=geom2:
            intersection1 = geom1.Intersection (geom2)
            print("The intersect is:",intersection1)