#importing libraries
import fiona
import geopandas
import matplotlib.pyplot as plt
from pyproj import CRS
from shapely.geometry import Point
#opening or simply reading shapefile
data=r'F:\Mustafa stuff\NUST\Second Semester\SDSS\Lessons\lesson 2\L2_data\NLS\2018\L4\L41\L4132R.shp\m_L4132R_p.shp'
#reading the shapefile
layer=geopandas.read_file(data)
layer.set_geometry(col='geometry', inplace=True)
# Write to Shapefile (just make a copy)
print("The type of your data is:",type(layer))#to print the type of data

#outfp = "L2_data/Finland_copy.shp"
#data.to_file(outfp)#copies the data in first shapefile into the second
#Exploring the data
dataimp=layer.head()#printing the first rows of the data using the head function
dataimp2=layer.columns#for keeping a record of column names
print(dataimp)
print(dataimp2)
#choosing specific colums
layer=layer[['TEKSTI', 'RYHMA', 'LUOKKA','geometry']]
colnames={'RYHMA':'GROUP','LUOKKA':'CLASS','geometry':'geom'}
layer.rename(columns=colnames,inplace=True)#changing the names of columns
print("The result is",layer.columns,layer.head())

#printing the number of rows,classes and groups
print("Number of rows", len(layer['CLASS']))
print("Number of classes", layer['CLASS'].nunique())
print("Number of groups", layer['GROUP'].nunique())

#ploting the data of the sapefile
#layer.plot()
#printing a specific column
print(layer['CLASS'].head())
#printing a specific entry from a specific column
print("Result is:", layer.at[0, "geom"])
#Calculating area of the first five polygons in the geom column
# Iterate over rows and print the area of a Polygon
for index,i in layer[0:5].iterrows():#the iterrows() function takes into account index aswell
    # Get the area from the shapely-object stored in the geometry-column
    poly_area = i['geom'].area
    print(("The Polygon of Index %s has %s area")%(index,poly_area))

#A simple method of calculating the area
#print(layer['geom'].area.head())

#Adding a new column into the data
for i in range(len(layer['geom'])):
    print(layer.at[i,'geom'].area)
    layer['area']=layer.at[i,'geom'].area
print(layer['area'].head())
#Calculating the minimum and maximum from the area colum
maximum=layer['area'].max()
minimum=layer['area'].min()
print(("The maximum area is:%s,while the minimum area is:%s")%(maximum,minimum))
#layer['area']=layer.area

#Exploring a CSV data

source=r'F:\Mustafa stuff\IST_FYP_Project\Bootstrap-HTML and JAVA\Bootstrap4 HTML codes\population_density_punjab1csv.csv'
data=geopandas.read_file(source,sep='\s+')
print(type(data))
print(data.head())

#Printing the crs of a shapefile

#source=r'F:\Mustafa stuff\NUST\Second Semester\SDSS\Lessons\lesson 2\L2_data\Europe_borders.shp'
#layers=geopandas.read_file(source)
#coordinates=layers.crs
#print("The coordinates are as follows:",coordinates)
#print(layers['geometry'].area.head())

#converting the coordinate system of the data 

#source=r'F:\Mustafa stuff\NUST\Second Semester\SDSS\Lessons\lesson 2\L2_data\Europe_borders.shp'
#layers=geopandas.read_file(source)
#layers1=layers.copy()
#layers=layers.to_crs({'init': 'epsg:3035'})
#print(layers.crs)
#print(layers['geometry'].head)

#Printing the data
 
fp = r'F:\Mustafa stuff\NUST\Second Semester\SDSS\Lessons\lesson 2\L2_data\ne_110m_admin_0_countries\ne_110m_admin_0_countries.shp'
admin = geopandas.read_file(fp)
coordinates=admin.crs
# Set fig size
plt.rcParams['figure.figsize'] = [12, 6]
#Plot in original crs
admin.plot()
plt.title("WGS84")
# Define projection as web mercator, 3785
#web_mercator = CRS.from_epsg(3785)
# Re-project and plot
#admin.to_crs(web_mercator).plot()
# Remove x and y axis
#plt.axis('off')
#plt.title("Web mercator")

#Calculating the distance by creating a geodataframe
hki_lon = 24.9417
hki_lat = 60.1666
# Create GeoDataFrame
helsinki = geopandas.GeoDataFrame([[Point(hki_lon, hki_lat)]], geometry='geometry', crs={'init': 'epsg:4326'}, columns=['geometry'])
# Print
print(helsinki)
#Converting the helsinki data to Azimuthal Equidistant Projection
# Define the projection using the coordinates of our Helsinki point (hki_lat, hki_lon) as the center point
# The .srs here returns the text presentation of the projection
aeqd = CRS(proj='aeqd', ellps='WGS84', datum='WGS84', lat_0=hki_lat, lon_0=hki_lon).srs
# Reproject to aeqd projection using Proj4-string
helsinki = helsinki.to_crs(crs=aeqd)
# Print the data
print(helsinki)
# Print the crs
print('\nCRS:\n', helsinki.crs)


# Reproject to aeqd projection that we defined earlier
source=r'F:\Mustafa stuff\NUST\Second Semester\SDSS\Lessons\lesson 2\L2_data\Europe_borders.shp'
layers=geopandas.read_file(source)
layers = layers.to_crs(crs=aeqd)
# Print
print(layers.head(2))
def calculate_distance(row, dest_geom, src_col='geometry', target_col='distance'):
    """
    Calculates the distance between Point geometries.

    Parameters
    ----------
    dest_geom : shapely.Point
       A single Shapely Point geometry to which the distances will be calculated to.
    src_col : str
       A name of the column that has the Shapely Point objects from where the distances will be calculated from.
    target_col : str
       A name of the target column where the result will be stored.

    Returns
    -------
    Distance in kilometers that will be stored in 'target_col'.
    """
    # Calculate the distances
    dist = row[src_col].distance(dest_geom)
    # Convert into kilometers
    dist_km = dist / 1000
    # Assign the distance to the original data
    row[target_col] = dist_km
    return row
layers = layers.apply(calculate_distance, dest_geom=helsinki_geom, src_col='centroid', target_col='dist_to_Hki', axis=1)
print(layers.head(10))