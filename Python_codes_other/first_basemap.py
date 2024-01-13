# -*- coding: utf-8 -*-
"""
Created on Mon Jan 20 22:19:47 2020

@author: toshiba
"""

import numpy as np
from netCDF4 import Dataset
# from scipy.io import netcdf
import os
os.environ['PROJ_LIB']=r'C:\Users\mustafa\Anaconda3\Lib\site-packages\mpl_toolkits\basemap'
import matplotlib.pyplot as plt
from mpl_toolkits.basemap import Basemap

when = 0 # improve this variable later so that user input can be date/ time

#filename = 'F:/Semester 7/Python and customization with GIS/python project/air.departure.sig995.2012.nc' 
filename = r'D:\mustafa05\air.departure.sig995.2012.nc' 
 # input the complete filepath here

# open the file at the address 'filename' for reading:
fopen = Dataset(filename, 'r') # <-- turn on if using netCDF4
# fopen = netcdf.netcdf_file(filename, 'r') <-- turn on if using scipy.io

# now set variables x, y and 'data':
x = fopen.variables['lon'][:] # this is a 1D longitude array
y = fopen.variables['lat'][:] # this is a 1D latitude array 
data = fopen.variables['air_dep'][:] 
print(data)
# this is a 3D array with a value saved at each point in 2D space and time
# reduce data to a 2D array for a specific time:
data_when = data[when,:,:]
print(data_when)

#close the file at the address
fopen.close()

# create a basemap to plot onto:
m = Basemap(width=10000000, height=7000000,\
        resolution='l', projection='moll',\
        lat_ts=40, lat_0=50, lon_0=0)
m.drawcoastlines()
m.drawparallels(np.arange(-80.,81,20))
m.drawmeridians(np.arange(-180.,181,20))
# 
#   add other basemap drawing options here 
xx, yy = np.meshgrid(x, y)
xx, yy = m(xx, yy)
plt.contourf(xx, yy,data_when)

plt.show()
#