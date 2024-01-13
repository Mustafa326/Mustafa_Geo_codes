#importing the necessary libraries
from satpy.scene import Scene
from satpy.resample import get_area_def
from satpy import find_files_and_readers
from satpy.dataset import combine_metadata
from datetime import datetime
import glob
import warnings
from satpy import available_writers

#----------------------------------------------------------------------------------------------
# Date format in YYYYMMDDhhmm
#fnames = glob.glob('/kaggle/input/meteosat-11-l1b-hrit-201802281500/H*201802281500-__')
fnames = glob.glob('F:/Mustafa_stuff/NASTAP_Internship/MSG4/H*201802281500-__')
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
composite = 'natural_color'
composite1= 'fog'
#to show scene in natural color
scn1.load([composite], upper_right_corner="NE")
scn1.show(composite)
#to show scene in severe storms
#scn2.load([composite1], upper_right_corner="NE")
#scn2.show(composite1)
#In order to load channel data to work with, the procedure is identical to what we presented above,
#except the name of a channel or its wavelengthIn order to load channel data to work with, 
#the procedure is identical to what we presented above 
#except the name of a channel or its wavelength
#show specific channels
scn1.load(['VIS006', 'VIS008'], upper_right_corner="NE")
scn1['VIS008']
#showing the channel
#scn1.show(0.8)
nir_data=scn1['VIS008'].values
print("Your nir values are :",nir_data)
# showing the available channels
#scn1.available_dataset_ids()
#----------------------------------------------------------------------------------------------------------
#working with channels in order to generate products such as ndvi
#Working with the data is quite straightforward as the datasets inside the scene are in effect DataArrays
#As per the xarray python package.
ndvi = (scn1[0.8] - scn1[0.6]) / (scn1[0.8] + scn1[0.6])
ndvi.attrs = combine_metadata(scn1[0.8], scn1[0.6])
ndvi.attrs.pop("standard_name")
print(ndvi.values)
scn1['ndvi'] = ndvi
scn1.show('ndvi')
#scn1.show('ndvi')
#we will want to project the data onto a specific area so that only the area of interest is depicted in the RGB composites.
local_scn = scn1.resample("eurol", radius_of_influence=20000)
#print(local_scn)
#printing ndvi with the resampled image
local_scn.show('ndvi')
local_scn.show('natural_color')
#showing the scene with natural colors
#ndviresult.show()
ndvi.save_geotiff("F:/Mustafa_stuff/NASTAP_Internship/MSG4",dtype="float32", overwrite=True)