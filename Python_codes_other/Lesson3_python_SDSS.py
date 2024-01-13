#importing libraries
import fiona
import geopandas
import geopy.geocoders
import matplotlib.pyplot as plt
import requests
import geojson
from pyproj import CRS
from shapely.geometry import Point,Polygon,LineString, MultiLineString
from shapely.ops import nearest_points
# Import the geocoding tool
from geopandas.tools import geocode
#Exploring a CSV data
source=r'F:\Mustafa stuff\IST_FYP_Project\Bootstrap-HTML and JAVA\Bootstrap4 HTML codes\population_density_punjab1csv.csv'
data=geopandas.read_file(source,sep='\s+')
print(type(data))
print(data.head())
#Using the nominatim geocoder of Open-Street-Map to geocode the column named districts 
#the timeout-parameter which specifies how many seconds we will wait for a response from the service.
geo = geocode(data['Districts'], provider='nominatim', user_agent='autogis_xx', timeout=4)
print(geo.head())
#joining the geocoded table with the csv
"""
join = geo.join(data)
print(join.head())
"""
#Checking wether a Geometry is within a geometry
"""
p1 = Point(24.952242, 60.1696017)
p2 = Point(24.976567, 60.1612500)
coords = [(24.950899, 60.169158), (24.953492, 60.169158), (24.953510, 60.170104), (24.950958, 60.169990)]
poly = Polygon(coords)
print(p1.within(poly))
print(p2.within(poly))
# Does polygon contain p1?
poly.contains(p1)
# Create two lines
line_a = LineString([(0, 0), (1, 1)])
line_b = LineString([(1, 1), (0, 2)])
line_a.intersects(line_b)
"""
#Opening a Kml file 

#enabling the KML driver
geopandas.io.file.fiona.drvsupport.supported_drivers['KML'] = 'rw'
#CHecking the supported drivers from fiona
print(geopandas.io.file.fiona.drvsupport.supported_drivers)
# Filepath to KML file
fp = r'F:\Mustafa stuff\NUST\Second Semester\SDSS\Lessons\Lesson 3\PKS_suuralue.kml'
data1 = geopandas.read_file(fp, driver='KML')
#Check the data
print("Number of rows:",len(data1))
print(data1.head(11))

#SPATIAL Joining

#Opening data directly from a geojson file online
# Specify the url for web feature service
url = 'https://kartta.hsy.fi/geoserver/wfs'
# Specify parameters (read data in json format).
# Available feature types in this particular data source: http://geo.stat.fi/geoserver/vaestoruutu/wfs?service=wfs&version=2.0.0&request=describeFeatureType
params = dict(service='WFS',
              version='2.0.0',
              request='GetFeature',
              typeName='asuminen_ja_maankaytto:Vaestotietoruudukko_2018',
              outputFormat='json')
# Fetch data from WFS using requests
r = requests.get(url, params=params)
# Create GeoDataFrame from geojson
pop = geopandas.GeoDataFrame.from_features(geojson.loads(r.content))
print(pop.head())
#Nearest Neighbour Analysis
# Origin point
orig = Point(1, 1.67)
# Destination points
dest1 = Point(0, 1.45)
dest2 =Point(2, 2)
dest3 = Point(0, 2.5)
#In order to obtain or find the nearest disyance we have to create a Multipoint
points=MultiPoint([dest1,dest2,dest3])
print(points)
#Calculating the nearest point
nearest_geoms = nearest_points(orig, points)
print(nearest_geom)