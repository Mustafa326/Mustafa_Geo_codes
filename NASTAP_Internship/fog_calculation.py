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
from pyresample import SwathDefinition, geometry #setting the image
import numpy as np #for array manipulation purposes
from satpy.writers import get_enhanced_image # getting writers
from satpy.composites import GenericCompositor
from satpy.composites import DifferenceCompositor
from dask.diagnostics import ProgressBar
from satpy.writers import to_image
import io
from PIL import Image
#from folium.plugins import MatplotlibLayer
import folium# for web mapping services
#----------------------------------------------------------------------------------------------
# Date format in YYYYMMDDhhmm
fnames = glob.glob('F:/Mustafa_stuff/NASTAP_Internship/HRIT/00-00/H*202312140000-__')

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
#composite = 'natural_color'
#composite1= 'fog'
#to show scene in natural color
#scn1.load([composite1], upper_right_corner="NE")
#scn1.show(composite1)
#scn2 = scn1.crop(ll_bbox = target_extent)
#loading the scene fog composite
print("thisis",scn1.available_dataset_names())
scn1.load(['IR_120','IR_108','IR_087'],upper_right_corner="NE")
print(f'This is the scene{scn1}')
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
#plt.figure()
#img = get_enhanced_image(composite)
# get DataArray out of `XRImage` object
#img_data = img.data
#img_data.plot.imshow(vmin=0, vmax=1, rgb='bands')
#crooping the scene with extent provided in the code
scn2 = scn1.crop(ll_bbox = target_extent)
scn2.load(['red_band','green_band','blue_band'],upper_right_corner="NE")
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
# Step 3: Display NDVI Scene
fig, ax = plt.subplots(figsize=(10, 10))
ax.imshow(img_data1, cmap='RdYlGn', vmin=-1, vmax=1)  # Adjust colormap and vmin/vmax as needed
plt.show()
#print(f' The newly created fog composite of pakistan is:{scn2}')
#scn1.show('green_band')
#scn2.show('fogdata')