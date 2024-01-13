# -*- coding: utf-8 -*-
"""
Created on Fri Dec 22 02:58:59 2023

@author: Imran
"""



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
#scn.load([10.8])
#scn2.load(['_intermediate_fls_day'])
#scn.show(10.8)

# Example threshold values (these are just starting points and should be refined)
ir_threshold_min = 0.0  # minimum threshold for IR difference
ir_threshold_max = 255.0  # maximum threshold for IR difference
vis_threshold = 0.4     # threshold for visible channel reflectance

# Apply IR threshold
ir_difference = scn['IR_108'] - scn['IR_120']
fog_mask_ir = (ir_difference > ir_threshold_min) & (ir_difference < ir_threshold_max)

# Apply visible threshold during daytime
fog_mask_vis = (scn['VIS006'] < vis_threshold) & (scn['VIS008'] < vis_threshold)
fog_mask = fog_mask_ir & fog_mask_vis

# Generate fog composite
fog_composite = scn['IR_108'].where(fog_mask, other=np.nan)
fog_data = fog_composite.values
fog_data = np.ma.masked_invalid(fog_data)  # Mask NaN values
plt.figure(figsize=(10, 8))
plt.imshow(fog_data, cmap='gray')  # 'gray' colormap for fog visualization
plt.colorbar(label='Brightness Temperature Difference (K)')
plt.title('Fog Composite')
plt.xlabel('Longitude')
plt.ylabel('Latitude')
plt.show()
