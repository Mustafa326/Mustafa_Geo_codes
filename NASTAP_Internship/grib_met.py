#importing the necessary libraries
from satpy.scene import Scene
from satpy.resample import get_area_def# getting defenition of area
from satpy import find_files_and_readers #reader of data 
from satpy.dataset import combine_metadata# combining metadata
from datetime import datetime #for dates
import glob# file reader glob
import warnings# all warnings
from satpy import available_readers # importing all available readers
from satpy import available_writers #all available data writers in satpy
import pygrib #for Grib data handeling
import matplotlib.pyplot as plt # for plotting purposes
from mpl_toolkits.basemap import Basemap
import cartopy.crs as ccrs
import cartopy.feature as cfeature
import geopandas as gpd
import fiona
import pyogrio
import numpy as np
from dask.diagnostics import ProgressBar
import io
# Import the 'Point' function from shapely.geometry
from shapely.geometry import Point
# Import the 'shape' function from shapely.geometry
from shapely.geometry import shape
#fnames = glob.glob('F:/Mustafa_stuff/NASTAP_Internship/data/*.grb')
#print("The Files for your grib datasets all in one array are as follows:",fnames)
#print("The first file in the grb data sets are as folows:",fnames[0])
fnames = 'F:/Mustafa_stuff/NASTAP_Internship/data\GRB_data/N_Indian/_cache_weather-cache_NIndian.wind.7days.grb' 
# Loop through each file
print("Your Selected file is as follows :",fnames)
grbs= pygrib.open(fnames)
print(grbs)
#first_message=grbs
        # Process the data as needed
for grb in grbs:
    first_message = grbs[1]
    # Access data from each GRIB message (grb)
    data = grb.values
    latitude,longitude=grb.latlons()
            # Perform further processing or analysis as needed
            # Extract data and metadata from the GRIB message
            #datas = first_message.values
            #lats, lons = first_message.latlons()
            # Fetch the units information
            #units = first_message.units
    units = grb.units
            # Convert units to a string format
    units_str = str(units)# to convert units into string
    variable= grb.parameterName.replace(' ', '_')
    #convert the name of variables into part
    #convert the name of variables into part
    part= variable.split('_')
    print(part[0])
    grb_str=str(grb)# to convert grb variable names to string
    print(f"Processing data from {fnames} - Variable: {grb}--latitude:{latitude}-Longitude:{longitude}-Values:{data}-Units:{units}")
    # Plot the data using matplotlib
    plt.contourf(longitude, latitude, data, cmap='viridis')  # Adjust the colormap as needed
    plt.colorbar(label= units_str)  # Replace 'Variable Units' with the actual units
    plt.title(grb_str)  # Customize the plot title
    plt.xlabel('Longitude')
    plt.ylabel('Latitude')
    plt.show()