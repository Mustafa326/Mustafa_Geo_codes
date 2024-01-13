# -*- coding: utf-8 -*-
"""
Created on Sat Dec 23 01:51:05 2023

@author: Imran
"""
import rasterio
print('start')
#importing the necessary libraries
import os
import sys
#from osgeo import ogr
#from osgeo import gdal

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
import folium# for web mapping services
#----------------------------------------------------------------------------------------------

#os.environ['PPP_CONFIG_DIR'] = r'C:\Users\Imran\anaconda3\Lib\site-packages\satpy-0.0.0-py3.10.egg\satpy\fogpy\etc'

import logging
#logging.basicConfig(level=logging.DEBUG)

# Date format in YYYYMMDDhhmm
fnames = glob.glob(r'D:/Mustafa/NASTAP_Internship/HRIT/00-00/H*202312140000-__')

#print("The Files for your hrit datasets all in one array are as follows:",fnames)
#to show seperate scenes
scn1 = Scene(reader='seviri_l1b_hrit', filenames=fnames)
# Step 3: Define the target area
# Replace the values below with the actual values for your target area
target_area_id = 'Pakistan'
target_extent = [60.8742484882, 23.6919650335, 77.8374507995, 37.1330309108]  # Replace with actual extent
#loading the scene fog composite
#print("thisis",scn1.available_dataset_names())
#scn1.load(['IR_120','IR_108','IR_087', '_intermediate_fls_day'],upper_right_corner="NE")
# Load the required channels for the intermediate FLS day composite

scn1.load(['VIS006', 'VIS008', 'IR_016', 'IR_039', 'IR_087', 'IR_108', 'IR_120' ])

scn = scn1.crop(ll_bbox = target_extent)
# Custom Fog Detection Algorithm
# Adjust thresholds based on your specific requirements
vis_threshold = 0.3  # Visible channel threshold
ir_threshold = 255   # IR channel threshold (in Kelvin)

# Daytime Fog Detection
fog_mask_day = (scn['VIS006'] <= vis_threshold) & (scn['IR_108'] < ir_threshold)

# Nighttime Fog Detection
fog_mask_night = (scn['IR_108'] - scn['IR_120'] > 0) & (scn['IR_108'] < ir_threshold)

# Combine masks for a full day-night fog mask
fog_mask = fog_mask_day #| fog_mask_night

# Plot fog mask
plt.imshow(fog_mask, cmap='gray')
plt.title('Fog Mask')
plt.show()

# Save fog mask as TIFF
fog_mask_data = fog_mask.astype(np.uint8)  # Convert to binary format (0 or 1)
import rasterio
from rasterio.transform import from_origin

# Pakistan extents: [min_lon, min_lat, max_lon, max_lat]
pakistan_extents = [60.8742484882, 23.6919650335, 77.8374507995, 37.1330309108]
west, south, east, north = pakistan_extents

# Assuming fog_mask_data is your fog mask array
height, width = fog_mask_data.shape

# Calculate pixel sizes
pixel_size_x = (east - west) / width
pixel_size_y = (north - south) / height

# Define transform
transform = from_origin(west, north, pixel_size_x, -pixel_size_y)

# Save fog mask as TIFF with georeferencing
with rasterio.open(
    'fog_mask_output.tif', 'w',
    driver='GTiff',
    height=height,
    width=width,
    count=1,
    dtype=fog_mask_data.dtype,
    crs='EPSG:4326',  # WGS84
    transform=transform
) as dst:
    dst.write(fog_mask_data, 1)
