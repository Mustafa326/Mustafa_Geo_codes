#Importing the required libraries 
import os
import sys
from osgeo import ogr
import osr
import pyproj as py
#Opening the data under question
ds=r'D:\mustafa05\osgeopy-data\US'
data=ogr.Open(ds)
if data is None:
    print("Please check your path")
lyr=data.GetLayer("cities_48")
print("The first layer you choosed is:",lyr)
lyr1=data.GetLayer("states_48")
print("The second layer you choosed is:",lyr1)
#Printing the spatial reference system at layer level
srs=lyr.GetSpatialRef()
print("The spatial reference system of your first layer is:",srs)
ref=lyr1.GetSpatialRef()
print("The spatial reference system of your second layer is:",ref)
#print(srs.IsGeographic)
#Fetching thigs from the Spatial reference
print("You fetched:",ref.GetAttrValue("GEOGCS"))
print("You second fetched:",ref.GetAttrValue("AUTHORITY"))
print("You third fetched:",ref.GetAttrValue("AUTHORITY",1))
print("You fourth fetched:",ref.GetAuthorityCode("DATUM"))
# Create a UTM SRS from an EPSG code.
sr = osr.SpatialReference()
sr.ImportFromEPSG(4326)
print("THe spatial reference you created is:",sr)
print("You first thing fetched:",sr.GetAttrValue("GEOGCS"))
print("You second thing fetched:",sr.GetAttrValue("AUTHORITY"))
print("You third thing fetched:",sr.GetAttrValue("AUTHORITY",1))
print("You fourth thing fetched:",sr.GetAuthorityCode("DATUM"))
#Creating a UTM SRS from Projp4
sr1=osr.SpatialReference()
sr1.ImportFromProj4('''+proj=utm +zone=12 +ellps=GRS80
                      +towgs84=0,0,0,0,0,0,0 +units=m +no_defs''')
print("The spatial reference system is:",sr1)
# Create an Albers SRS using parameters.
sr2 = osr.SpatialReference()
sr2.SetProjCS('USGS Albers')
sr2.SetWellKnownGeogCS('NAD83')
sr2.SetACEA(29.5, 45.5, 23, -96, 0, 0)
sr2.Fixup()
sr2.Validate()
print("Your Albers spatial reference system is",sr2)
print("You first thing fetched:",sr2.GetAttrValue("DATUM"))
print("You second thing fetched:",sr2.GetAttrValue("AUTHORITY"))
print("You third thing fetched:",sr2.GetAttrValue("AUTHORITY",1))
print("You fourth thing fetched:",sr2.GetAuthorityCode("DATUM"))

# Set lat/lon coordinates for Los Angeles and Berlin.
la_lat, la_lon = 34.0500, -118.2500
berlin_lat, berlin_lon = 52.5167, 13.3833

# Create a WGS84 Geod.
geod = py.Geod(ellps='WGS84')

# Get the bearings and distance between LA and Berlin
forward, back, dist = geod.inv(la_lon, la_lat, berlin_lon, berlin_lat)
print('forward: {}\nback: {}\ndist: {}'.format(forward, back, dist))

# Get your final coordinates if you start in Berlin and go dist distance in
# the back direction. These coordinates should match LA.
x, y, bearing = geod.fwd(berlin_lon, berlin_lat, back, dist)
print('{}, {}\n{}'.format(x, y, bearing))

# Get a list of equally spaced coordinates along the great circel from LA
# to Berlin.
coords = geod.npts(la_lon, la_lat, berlin_lon, berlin_lat, 100)

# Only print the first 3.
for i in range(3):
    print(coords[i])