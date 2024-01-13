print('start')
#importing the necessary libraries
import os
import sys
from osgeo import ogr
from osgeo import gdal
from satpy.scene import Scene
from satpy.resample import get_area_def
from satpy import find_files_and_readers
from satpy.dataset import combine_metadata
from datetime import datetime
import glob
from satpy.composites import GenericCompositor
import warnings
from satpy import available_writers
import matplotlib.pyplot as plt # matplotlib for plotting purposes
import matplotlib.colors as colors
import pygrib
from pyresample import SwathDefinition, geometry #setting the image
from pyresample.kd_tree import resample_nearest
import numpy as np #for array manipulation purposes
from satpy.writers import get_enhanced_image # getting writers
from satpy.composites import GenericCompositor
from satpy.composites import DifferenceCompositor
from dask.diagnostics import ProgressBar
import xarray as xr
from satpy.writers import to_image
import io
from PIL import Image
#from folium.plugins import MatplotlibLayer
import folium# for web mapping services
#----------------------------------------------------------------------------------------------
# Date format in YYYYMMDDhhmm
fnames = glob.glob('F:/Mustafa_stuff/NASTAP_Internship/2023_12_20_04-00/04-00_rawHrit/H*202312200400-__')
# Date format in YYYYMMDDhhmm
fnames2 = glob.glob('F:/Mustafa_stuff/NASTAP_Internship/HRIT/00-00/H*202312140000-__')
#fnames = ['F:/Mustafa_stuff/NASTAP_Internship/MSG4indian/MSG2-SEVI-MSG15-0100-NA-20231115074240.952000000Z-NA.nat']
print("The Files for your hrit datasets all in one array are as follows:",fnames)
#to show seperate scenes
scn1 = Scene(reader='seviri_l1b_hrit', filenames=fnames)
#available_writers()
#We then choose a composite to load and show it. 
#You may see warnings due to deprecated pyproj features and when numpy/dask process NaNs values.
#NaNs are used to mark invalid pixels and space pixels (like you'll see in a full disk image). 
#You can silence these with warnings.filterwarnings('ignore')
#---------------------------------------------------------------------------------------------------
#the coding line to get the list of all available composites in the data
#scn.available_composite_ids()
#loading the scene with natural color composites
# Step 3: Define the target area
# Replace the values below with the actual values for your target area
target_area_id = 'Pakistan'
target_extent = [60.8742484882, 23.6919650335, 77.8374507995, 37.1330309108]  # Replace with actual extent
print("this is",scn1.available_dataset_names())
scn1.load(['VIS008','VIS006','IR_120','IR_108','IR_087','IR_097','IR_039','WV_062'],upper_right_corner="NE")
compositor1 = DifferenceCompositor("red_band")
compositor2 = DifferenceCompositor("green_band")
red_band = compositor1([scn1['IR_120'], scn1['IR_108']])
green_band = compositor2([scn1['IR_108'],scn1['IR_087']])
#red_band=scn1['IR_120']-scn1['IR_108']
print(f'This is the red_band is{red_band}')
#green_band=scn1['IR_108']-scn1['IR_087']
print(f'This is the green_band is{green_band}')
blue_band=scn1['IR_108']
print(f'This is the blue_band is{blue_band}')
scn1['red_band'] = red_band
scn1['green_band'] = green_band
scn1['blue_band'] = blue_band
scn1.load(['red_band','green_band','blue_band'],upper_right_corner="NE")
print(f'This is the loaded scene{scn1}')
#to get the band calculated composite for 24 hour fog for globe
compositor = GenericCompositor("overview")
composite = compositor([scn1['red_band'],
                        scn1['green_band'],
                        scn1['blue_band']])
print(f'this is the scene composite{composite}')
# Step 4: Resample the scene to the target area
scn2 = scn1.crop(ll_bbox = target_extent)
scn2.load(['VIS008','VIS006','IR_120','IR_108','IR_087','IR_097','IR_039','WV_062','red_band','green_band','blue_band'],upper_right_corner="NE")
print(f'This is the clipped scene {scn2}')
compositor3 = GenericCompositor("overview")
composite2 = compositor3([scn2['red_band'],
                        scn2['green_band'],
                        scn2['blue_band']])
print(f'this is the scene2 composite{composite2}')
#ploting with basic plotter
plt.figure()
img1 = get_enhanced_image(composite2)
# get DataArray out of `XRImage` object
img_data1 = img1.data
img_data1.plot.imshow(vmin=0, vmax=1, rgb='bands')
#plotting with matplotlib
print(f'The Scene 2 is as follows {scn2}')
#calculating the ndvi (normalized difference fog index)
ndvi = (scn2['VIS008'] - scn2['VIS006']) / (scn2['VIS008'] + scn2['VIS006'])
print(f'These are the ndvi values{ndvi.values}')
scn2["ndvi"] = (scn2['VIS008'] - scn2['VIS006']) / (scn2['VIS008'] + scn2['VIS006'])
print(f'The ndvi scene is as follows {scn2["ndvi"]}')
#calculating the ndfi (normalized difference fog index)
ndfi = (scn2['IR_087'] - scn2['IR_120']) / (scn2['IR_087'] + scn2['IR_120'])
print(f'These are the ndfi values{ndfi.values}')
scn2["ndfi"] = (scn2['IR_087'] - scn2['IR_120']) / (scn2['IR_087'] + scn2['IR_120'])
print(f'The ndfi scene is as follows {scn2["ndfi"]}')
#another formulla for ndfi
ndfi2 = (scn2['VIS008'] - scn2['IR_087']) / (scn2['VIS008'] + scn2['IR_087'])
print(f'These are the ndfi2 another formulla values{ndfi2.values}')
scn2["ndfi2"] = (scn2['VIS008'] - scn2['IR_087']) / (scn2['VIS008'] + scn2['IR_087'])
print(f'The ndfi2 scene is as follows {scn2["ndfi2"]}')
#scn2.plot('ndfi')
#scn2.show("ndfi")
# Daytime Fog Detection DFI dfi=BT_11 - BT_12 + NDVI * (BT_11 - BT_31)
dfi=(scn2['IR_097']+scn2["ndvi"]*(scn2['IR_108']-scn2['IR_039']))
print(f'These are the dfi values{dfi.values}')
scn2["dfi"] = (scn2['IR_097']+scn2["ndvi"]*(scn2['IR_108']-scn2['IR_039']))
print(f'The dfi scene is as follows {scn2["dfi"]}')
#Fog Propability index FPI caclulationFormula: FPI = 0.55 * BT_108 + 0.45 * BT_120 - BT_062 - NDVI * (BT_108 - BT_120) + 30
fpi=(0.55*scn2['IR_108']+0.45*scn2['IR_120']-scn2['WV_062']-scn2["ndvi"]*(scn2['IR_108']-scn2['IR_120'])+30)
print(f'These are the fpi values{fpi.values}')
scn2["fpi"] = (0.55*scn2['IR_108']+0.45*scn2['IR_120']-scn2['WV_062']-scn2["ndvi"]*(scn2['IR_108']-scn2['IR_120'])+30)
print(f'The fpi scene is as follows {scn2["fpi"]}')
lons_attr = "x"
lats_attr = "y"
lat=scn2["ndfi"][lats_attr].values
lons=scn2["ndfi"][lons_attr].values
lat2=scn2["ndfi2"][lats_attr].values
lons2=scn2["ndfi2"][lons_attr].values
lat3=scn2["dfi"][lats_attr].values
lons3=scn2["dfi"][lons_attr].values
lat4=scn2["fpi"][lats_attr].values
lons4=scn2["fpi"][lons_attr].values
# Plot the single band (ndfi) using matplotlib
plt.figure(figsize=(10, 8))
# Access the ndfi data and coordinates
ndfi_data = scn2["ndfi"].values
ndfi_data2 = scn2["ndfi2"].values
dfi_data = scn2["dfi"].values
fpi_data = scn2["fpi"].values
#Fog mask for first ndfi
fog_mask_ndfi_data =( ndfi_data<0.005)
#Fog mask for second ndfi
fog_mask_ndfi2_data =( ndfi_data2<-0.85)
#Fog mask for dfi
fog_mask_dfi_data =( dfi_data<250)
#Fog mask for fpi
fog_mask_fpi_data =( fpi_data<60)
#latitude and longitude of Normalized Difference Fog index 
latitudes = lat
longitudes = lons
#latitude and longitude of Normalized Difference Fog index (another formulla)
latitudes2 = lat2
longitudes2 = lons2
#latitude and longitude of Day Fog index
latitudes3 = lat3
longitudes3 = lons3
#latitude and longitude of Fog Propabilitiy index
latitudes4 = lat4
longitudes4 = lons4
#plotting NDVI
# Step 3: Display NDVI Scene
fig, ax = plt.subplots(figsize=(5, 5))
ax.imshow(ndvi, cmap='RdYlGn', vmin=-1, vmax=1)  # Adjust colormap and vmin/vmax as needed
plt.show()
# Plot the ndfi data
plt.imshow(ndfi_data, cmap='gray', extent=[longitudes.min(), longitudes.max(), latitudes.min(), latitudes.max()])
plt.colorbar(label="NDFI1")
plt.title("Normalized Difference Fog Index (NDFI) first formulla")
plt.xlabel("Longitude")
plt.ylabel("Latitude")
plt.show()
# Plot the ndfi2 data
plt.imshow(ndfi_data2, cmap='gray', extent=[longitudes2.min(), longitudes2.max(), latitudes2.min(), latitudes2.max()])
plt.colorbar(label="NDFI2")
plt.title("Normalized Difference Fog Index (NDFI) second formulla")
plt.xlabel("Longitude")
plt.ylabel("Latitude")
plt.show()
# Plot the dfi data
plt.imshow(dfi_data, cmap='gray', extent=[longitudes3.min(), longitudes3.max(), latitudes3.min(), latitudes3.max()])
plt.colorbar(label="DFI")
plt.title("Day Fog Index (DFI) ")
plt.xlabel("Longitude")
plt.ylabel("Latitude")
plt.show()
# Plot the fpi data
plt.imshow(fpi_data, cmap='gray', extent=[longitudes4.min(), longitudes4.max(), latitudes4.min(), latitudes4.max()])
plt.colorbar(label="FPI")
plt.title("Fog Propability index (FPI) ")
plt.xlabel("Longitude")
plt.ylabel("Latitude")
plt.show()
# Plot the fog mask data for first NDFI
plt.imshow(fog_mask, cmap='gray', extent=[longitudes.min(), longitudes.max(), latitudes.min(), latitudes.max()])
plt.colorbar(label="fog_mask_day")
plt.title("fog_mask")
plt.xlabel("Longitude")
plt.ylabel("Latitude")
plt.show()
# Plot the fog mask data for second NDFI
plt.imshow(fog_mask_ndfi2_data, cmap='gray', extent=[longitudes.min(), longitudes.max(), latitudes.min(), latitudes.max()])
plt.colorbar(label="fog_mask_ndfi2_data")
plt.title("fog mask data for second NDFI")
plt.xlabel("Longitude")
plt.ylabel("Latitude")
plt.show()
# Plot the fog mask data for DFI
plt.imshow(fog_mask_dfi_data, cmap='gray', extent=[longitudes.min(), longitudes.max(), latitudes.min(), latitudes.max()])
plt.colorbar(label="fog_mask_dfi_data")
plt.title("fog mask data for DFI")
plt.xlabel("Longitude")
plt.ylabel("Latitude")
plt.show()
# Plot the fog mask data for FPI
plt.imshow(fog_mask_fpi_data, cmap='gray', extent=[longitudes.min(), longitudes.max(), latitudes.min(), latitudes.max()])
plt.colorbar(label="fog_mask_fpi_data")
plt.title("fog mask data for FPI")
plt.xlabel("Longitude")
plt.ylabel("Latitude")
plt.show()