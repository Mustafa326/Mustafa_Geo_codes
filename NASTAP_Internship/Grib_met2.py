#importing the necessary libraries
print("Start")
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
from shapely.geometry import box
from shapely.ops import unary_union
#for raster conversion
import rasterio
#for transformation purposes
from rasterio.transform import from_origin
#resampling purposes
from rasterio.enums import Resampling
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
    # Create a basemap using cartopy
    fig, ax = plt.subplots(subplot_kw={'projection': ccrs.PlateCarree()})
    ax.set_extent([longitude.min(), longitude.max(), latitude.min(), latitude.max()])
    # Plot the data
    im = ax.contourf(longitude, latitude, data, cmap='viridis', transform=ccrs.PlateCarree())
    # Add coastlines and other map features
    ax.add_feature(cfeature.COASTLINE)
    ax.add_feature(cfeature.BORDERS, linestyle=':')
    ax.add_feature(cfeature.LAND, edgecolor='black')
    ax.add_feature(cfeature.LAKES, edgecolor='black')
    ax.add_feature(cfeature.RIVERS)
    # Add a colorbar
    cbar = plt.colorbar(im, ax=ax, orientation='vertical', pad=0.05)
    cbar.set_label(units_str)  # Replace 'Variable Units' with the actual units
    # Add a title
    plt.title(part)
    # Show the plot
    plt.show()
    # Specify the output GeoTIFF file path
    output_geotiff_path = f'F:/Mustafa_stuff/NASTAP_Internship/data/GRB_data/N_Indian/geotiff_{part[0]}.tif'

    # Set the resolution factor (increase the resolution)
    resolution_factor = 2  # Adjust this value as needed

    # Calculate the cell size
    cell_size_x = abs(longitude[0, 1] - longitude[0, 0]) / resolution_factor
    cell_size_y = abs(latitude[0, 0] - latitude[1, 0]) / resolution_factor

    # Calculate the number of rows and columns
    rows = data.shape[0] * resolution_factor
    cols = data.shape[1] * resolution_factor

    # Get the transformation parameters
    transform = from_origin(longitude[0, 0], latitude[-1, 0], cell_size_x, cell_size_y)

    # Create a GeoTIFF file with increased resolution
    with rasterio.open(output_geotiff_path, 'w', driver='GTiff',
                       height=rows, width=cols,
                       count=1, dtype=str(data.dtype),
                       crs='EPSG:4326', transform=transform) as dst:
        dst.write(data, 1)