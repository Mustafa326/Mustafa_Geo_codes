#importing the necessary libraries
from satpy.scene import Scene # For creating the scene
from satpy.resample import get_area_def #for resampling of the data purposes 
from satpy import find_files_and_readers #for reading various files such as hrit and lrit
from satpy.dataset import combine_metadata #combining_metadata through this library
from datetime import datetime # importing the date and time 
import glob #basic library fro the glob event
import matplotlib.pyplot as plt # matplotlib for plotting purposes
from pyresample import SwathDefinition, geometry #setting the image
import numpy as np #for array manipulation purposes
from satpy.writers import get_enhanced_image # getting writers 
import warnings
from satpy import available_writers #importing all available writers

#----------------------------------------------------------------------------------------------
# Date format in YYYYMMDDhhmm
#fnames = glob.glob('/kaggle/input/meteosat-11-l1b-hrit-201802281500/H*201802281500-__')
fnames = glob.glob('F:/Mustafa_stuff/NASTAP_Internship/MSG4/H*201802281500-__')
print("The Files for your hrit datasets all in one array are as follows:",fnames)
#first we create a scene instance, pointing to the uncompressed HRIT data files.
scn1 = Scene(reader='seviri_l1b_hrit', filenames=fnames)
scn1.load(['VIS006', 'VIS008', 10.8], upper_right_corner="NE")
nir_band=scn1['VIS008']
red_band=scn1['VIS006']
# Step 3: Define the target area
# Replace the values below with the actual values for your target area
target_area_id = 'South_Africa'
target_extent = [16.45,-34.5, 33.533, -22.133]  # Replace with actual extent

target_swath_def = SwathDefinition(lons=target_extent[::2], lats=target_extent[1::2])

# Step 4: Resample the scene to the target area
scn2 = scn1.crop(ll_bbox = target_extent)
scn3 = scn2.resample(scn2.coarsest_area(),
                                 resampler='native')
#resampled_scene = scn1.resample(target_swath_def)
#----------------------------------------------------------------------------------------------
#calculating the NDVI as another method
#ndvi=(nir_band.values - red_band.values)/(nir_band.values + red_band.values)
ndvi = (scn2['VIS008'] - scn2['VIS006']) / (scn2['VIS008'] + scn2['VIS006'])
# Step 3: Display NDVI Scene
fig, ax = plt.subplots(figsize=(10, 10))
ax.imshow(ndvi, cmap='RdYlGn', vmin=-1, vmax=1)  # Adjust colormap and vmin/vmax as needed
plt.show()
ndvi.attrs = combine_metadata(scn2[0.8], scn2[0.6])
ndvi.attrs.pop("standard_name")
#print(ndvi.values)
scn2['ndvi'] = ndvi
scn2.show('ndvi')
#scn1.show('ndvi')
scn2.save_datasets(writer='geotiff', dtype=np.float32, enhance=False)
#scn2.save_geotiff("F:/Mustafa_stuff/NASTAP_Internship/MSG4",dtype="float32", overwrite=True)
#----------------------------------------------------------------------------------------------
# Step 4: Convert Scene to GeoTIFF
# Define geotransform and projection information
#geotransform = (127485.0, 30.0, 0.0, 4111515.0, 0.0, -30.0)  # Example geotransform
#projection = '+proj=latlong +datum=WGS84'  # Example projection
#basic manipulation for satpy
#to show seperate scenes
#scn2 = Scene(reader='seviri_l1b_hrit', filenames=fnames)
#available_writers()
#We then choose a composite to load and show it. 
#You may see warnings due to deprecated pyproj features and when numpy/dask process NaNs values.
#NaNs are used to mark invalid pixels and space pixels (like you'll see in a full disk image). 
#You can silence these with warnings.filterwarnings('ignore')
#---------------------------------------------------------------------------------------------------
#the coding line to get the list of all available composites in the data
#scn.available_composite_ids()
#loading the scene with natural color composites
#composite = 'natural_color'
#composite1= 'fog'
#to show scene in natural color
#scn1.load([composite], upper_right_corner="NE")
#scn1.show(composite)
#to show scene in severe storms
#scn2.load([composite1], upper_right_corner="NE")
#scn2.show(composite1)
#In order to load channel data to work with, the procedure is identical to what we presented above,
#except the name of a channel or its wavelengthIn order to load channel data to work with, 
#the procedure is identical to what we presented above 
#except the name of a channel or its wavelength
#show specific channels
#scn1.load(['VIS006', 'VIS008'], upper_right_corner="NE")
#scn1['VIS008']
#showing the channel
#scn1.show(0.8)
#nir_data=scn1['VIS008'].values
#print("Your nir values are :",nir_data)
# showing the available channels
#scn1.available_dataset_ids()
#----------------------------------------------------------------------------------------------------------
#working with channels in order to generate products such as ndvi
#Working with the data is quite straightforward as the datasets inside the scene are in effect DataArrays
#As per the xarray python package.
#ndvi = (scn1[0.8] - scn1[0.6]) / (scn1[0.8] + scn1[0.6])
#ndvi.attrs = combine_metadata(scn1[0.8], scn1[0.6])
#ndvi.attrs.pop("standard_name")
#print(ndvi.values)
#scn1['ndvi'] = ndvi
#scn1.show('ndvi')
#scn1.show('ndvi')
#we will want to project the data onto a specific area so that only the area of interest is depicted in the RGB composites.
#local_scn = scn1.resample("eurol", radius_of_influence=20000)
#print(local_scn)
#printing ndvi with the resampled image
#local_scn.show('ndvi')
#local_scn.show('natural_color')
#showing the scene with natural colors
#ndviresult.show()
#ndvi.save_geotiff("F:/Mustafa_stuff/NASTAP_Internship/MSG4",dtype="float32", overwrite=True)