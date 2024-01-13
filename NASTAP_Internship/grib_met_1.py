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
    print(f"Processing data from {file_path} - Variable: {grb}")    
    # Access data from each GRIB message (grb)
    #data = grb.values
    #latitude,longitude=grb.latlons()
            # Perform further processing or analysis as needed
            # Extract data and metadata from the GRIB message
            #datas = first_message.values
            #lats, lons = first_message.latlons()
            # Fetch the units information
            #units = first_message.units
    #units = grb.units
            # Convert units to a string format
    units_str = str(units)# to convert units into string
    grb_str=str(grb)# to convert grb variable names to string
    #filtering the variables from the grib files as follows:
    u10_grb = grbs.select(name='10 metre U wind component', typeOfLevel='heightAboveGround', level=10)[0]
    print(f'The U wind component is as follows {u10_grb}')
    v10_grb = grbs.select(name='10 metre V wind component', typeOfLevel='heightAboveGround', level=10)[0]
    print(f'The V wind component is as follows {v10_grb}')
    #Obtaining values from said variables first message
    u10_values = u10_grb.values
    print(f'The U wind component values are  as follows {u10_values}')
    v10_values = v10_grb.values
    print(f'The V wind component values are  as follows {v10_values}')
    print (f'The V wind component shape is:{v10_values.shape},The U wind component shape is :{u10_values.shape}')
    latsV10,lonsV10=v10_grb.latlons()
    print(f'The V wind Latitudes are as follows: {latsV10}-The Longitudes are :{lonsV10}- The maximum latidude:{latsV10.max()}-The minimum latitude:{latsV10.min()}-The maximum longitude{lonsV10.max()}-The minimum longitude{lonsV10.min()} ')
    latsu10,lonsu10=u10_grb.latlons()
    print(f'The U wind Latitudes are as follows: {latsu10}-The Longitudes are :{lonsu10}- The maximum latidude:{latsu10.max()}-The minimum latitude:{latsu10.min()}-The maximum longitude{lonsu10.max()}-The minimum longitude{lonsu10.min()} ')
    #print(f"Processing data from {file_path} - Variable: {grb}--latitude:{latitude}-Longitude:{longitude}-Values:{data}-Units:{units}")    
    #print(f"Processing data from {file_path} - Variable: {grb}-Message:{first_message}")
    #print(f"Processing data from {file_path} - Variable: {grb}-Message:{first_message}-latitude:{latitude}-Longitude:{lons}-Values:{datas}-Units:{units}")
    #for key in grb.keys(): #to optain the parameters in the variables in the grib file
        #print (f'The keys are as follows-{key}')
   #ploting the data with basemap for wind speed U component
    figu = plt.figure(figsize=(16,35))
    mu = Basemap(llcrnrlon=lonsu10.min(), llcrnrlat=latsu10.min(), urcrnrlon=lonsu10.max(), urcrnrlat=latsu10.max())
    mu.drawcoastlines()
    mu.drawcountries()
    skip = 20
    csu = mu.contourf(lonsu10, latsu10, u10_values)
    qvu = mu.quiver(lonsu10[::skip, ::skip], latsu10[::skip, ::skip], u10_values[::skip, ::skip], v10_values[::skip, ::skip])