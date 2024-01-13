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
import warnings
from satpy import available_writers
import matplotlib.pyplot as plt # matplotlib for plotting purposes
import matplotlib.colors as colors
from pyresample import SwathDefinition, geometry #setting the image
import numpy as np #for array manipulation purposes
from satpy.writers import get_enhanced_image # getting writers 
from dask.diagnostics import ProgressBar
import io
from PIL import Image
#from folium.plugins import MatplotlibLayer
import folium# for web mapping services
#----------------------------------------------------------------------------------------------
# Date format in YYYYMMDDhhmm
#fnames = glob.glob('/kaggle/input/meteosat-11-l1b-hrit-201802281500/H*201802281500-__')
fnames = ['F:/Mustafa_stuff/NASTAP_Internship/MSG4indian/MSG2-SEVI-MSG15-0100-NA-20231115074240.952000000Z-NA.nat']
print("The Files for your hrit datasets all in one array are as follows:",fnames)
#first we create a scene instance, pointing to the uncompressed HRIT data files.
scn1 = Scene(reader='seviri_l1b_native', filenames=fnames)
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
# Step 3: Define the target area
# Replace the values below with the actual values for your target area
target_area_id = 'Pakistan'
target_extent = [60.8742484882, 23.6919650335, 77.8374507995, 37.1330309108]  # Replace with actual extent
composite = 'natural_color'
composite1= 'fog'
#to show scene in natural color
scn1.load([composite1], upper_right_corner="NE")
scn1.show(composite1)
#cropping for the specific area
scn2 = scn1.crop(ll_bbox = target_extent)
#loading the scene fog composite
scn2.load([composite1], upper_right_corner="NE")
scn2.show(composite1)
#to show scene in severe storms
#scn2.load([composite1], upper_right_corner="NE")
#scn2.show(composite1)
#In order to load channel data to work with, the procedure is identical to what we presented above,
#except the name of a channel or its wavelengthIn order to load channel data to work with, 
#the procedure is identical to what we presented above 
#except the name of a channel or its wavelength
#show specific channels
scn2.keys()
image_data1 = scn2['fog'].values.astype(np.uint8)
image_data = np.dstack((image_data, image_data, image_data)) # Repeat the same values for red, green, and blue channels
image = Image.fromarray(image_data)

image.save('output.tif')
#with ProgressBar():
    #scn2.save_datasets(base_dir='F:/Mustafa_stuff/NASTAP_Internship/MSG4indian', filename='fog.float.tif', dtype=np.float32, enhance=False)
    #scn2.save_datasets(writer='geotiff', base_dir='F:/Mustafa_stuff/NASTAP_Internship/MSG4indian', filename='fog2.float.tif',enhance=False)







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
import warnings
from satpy import available_writers
import matplotlib.pyplot as plt # matplotlib for plotting purposes
import matplotlib.colors as colors
from pyresample import SwathDefinition, geometry #setting the image
import numpy as np #for array manipulation purposes
from satpy.writers import get_enhanced_image # getting writers 
from dask.diagnostics import ProgressBar
import io
from PIL import Image
#from folium.plugins import MatplotlibLayer
import folium# for web mapping services
#----------------------------------------------------------------------------------------------
# Date format in YYYYMMDDhhmm
fnames = glob.glob('F:/Mustafa_stuff/NASTAP_Internship/HRIT/00-00/H*202312140000-__')

#fnames = ['F:/Mustafa_stuff/NASTAP_Internship/MSG4indian/MSG2-SEVI-MSG15-0100-NA-20231115074240.952000000Z-NA.nat']
print("The Files for your hrit datasets all in one array are as follows:",fnames)
#first we create a scene instance, pointing to the uncompressed HRIT data files.
scn1 = Scene(reader='seviri_l1b_hrit', filenames=fnames)
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
# Step 3: Define the target area
# Replace the values below with the actual values for your target area
target_area_id = 'Pakistan'
target_extent = [60.8742484882, 23.6919650335, 77.8374507995, 37.1330309108]  # Replace with actual extent
composite = 'natural_color'
composite1= 'fog'
#to show scene in natural color
scn1.load([composite1], upper_right_corner="NE")
scn1.show(composite1)
#cropping for the specific area
scn2 = scn1.crop(ll_bbox = target_extent)
print("thisis",scn1.available_dataset_names())
scn1.load(['IR_108'])
v=scn1['IR_108']
print(scn1)
infrared_values = scn1.values
print(f'The values are as follows{infrared_values}')
#loading the scene fog composite
# Extract central wavelength from the WavelengthRange object
central_wavelength = v.wavelength.central
# Print values for debugging
print(f'The central wavelength value is: {central_wavelength}')
planck_constant = 6.62607015e-34  # Planck's constant (Joule second)
speed_of_light = 299792458  # Speed of light (meters per second)
boltzmann_constant = 1.380649e-23  # Boltzmann constant (Joule per Kelvin)

# Calculate brightness temperature using Planck's law
brightness_temp = (planck_constant * speed_of_light) / (
    boltzmann_constant * central_wavelength * np.log(1 + (2 * planck_constant * speed_of_light**2) /
                                                    (infrared_values * central_wavelength**5)))
print(f'The brightness_temp is value is: {brightness_temp}')
# Use MetPy's brightness temperature threshold for fog detection (adjust as needed)
fog_threshold = 273.15  # Example threshold in Kelvin

# Create a fog mask based on the threshold
fog_mask = brightness_temp < fog_threshold

# Visualize the fog mask or perform further analysis as needed
plt.imshow(fog_mask, cmap='viridis', origin='upper', vmin=0, vmax=1)
plt.title('Fog Mask')
plt.show()
#scn2.load([composite1], upper_right_corner="NE")
#scn2.show(composite1)
#to show scene in severe storms
#scn2.load([composite1], upper_right_corner="NE")
#scn2.show(composite1)
#In order to load channel data to work with, the procedure is identical to what we presented above,
#except the name of a channel or its wavelengthIn order to load channel data to work with, 
#the procedure is identical to what we presented above 
#except the name of a channel or its wavelength
#show specific channels
#scn2.keys()
#image_data1 = scn2['fog'].values.astype(np.uint8)
#image_data = np.dstack((image_data, image_data, image_data)) # Repeat the same values for red, green, and blue channels
#image = Image.fromarray(image_data)

#image.save('output.tif')
#with ProgressBar():
    #scn2.save_datasets(base_dir='F:/Mustafa_stuff/NASTAP_Internship/MSG4indian', filename='fog.float.tif', dtype=np.float32, enhance=False)
    #scn2.save_datasets(writer='geotiff', base_dir='F:/Mustafa_stuff/NASTAP_Internship/MSG4indian', filename='fog2.float.tif',enhance=False)


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
import warnings
from satpy import available_writers
import matplotlib.pyplot as plt # matplotlib for plotting purposes
import matplotlib.colors as colors
from pyresample import SwathDefinition, geometry #setting the image
import numpy as np #for array manipulation purposes
from satpy.writers import get_enhanced_image # getting writers 
from dask.diagnostics import ProgressBar
import io
from PIL import Image
#from folium.plugins import MatplotlibLayer
import folium# for web mapping services
#----------------------------------------------------------------------------------------------
# Date format in YYYYMMDDhhmm
fnames = glob.glob('F:/Mustafa_stuff/NASTAP_Internship/HRIT/00-00/H*202312140000-__')

#fnames = ['F:/Mustafa_stuff/NASTAP_Internship/MSG4indian/MSG2-SEVI-MSG15-0100-NA-20231115074240.952000000Z-NA.nat']
print("The Files for your hrit datasets all in one array are as follows:",fnames)
gv.extension("bokeh", "matplotlib")
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
red_band=scn1['IR_120']-scn1['IR_108']
print(f'The red_band is{red_band}')
green_band=scn1['IR_108']-scn1['IR_087']
print(f'The green_band is{green_band}')
blue_band=scn1['IR_108']
print(f'The blue_band is{blue_band}')
scn1['red_band'] = red_band
scn1['green_band'] = green_band
scn1['blue_band'] = blue_band
#fog=[scn1['red_band'],scn1['green_band'],scn1['blue_band]]
scn1.load(['red_band','green_band','blue_band'],upper_right_corner="NE")
fog=[red_band, green_band,blue_band]
print(f'This is the fog composite 24 hours{fog}')
print(f'The new scene is as follows {scn1}')
scn1.load(['fog'],upper_right_corner="NE")
print(f'The new scene with fog is as follows {scn1}')
#scn1['red_band','green_band','blue_band'] = fog
#scn1.show('fog')
scn2 = scn1.crop(ll_bbox = target_extent)
scn2.load(['fog'],upper_right_corner="NE")
print(f' The newly created fog composite of pakistan is:{scn2}')
#scn1.show('green_band')
scn2.show('fog')