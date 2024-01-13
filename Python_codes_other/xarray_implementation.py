# -*- coding: utf-8 -*-
"""
Created on Tue Jan 21 18:34:18 2020

@author: toshiba
"""
import matplotlib.pyplot as plt
import os
os.environ['PROJ_LIB']=r'C:\Users\mustafa\Anaconda3\Lib\site-packages\mpl_toolkits\basemap'
from mpl_toolkits.basemap import Basemap
import numpy as np
import xarray as xr
dataset = xr.open_dataset(r'D:\mustafa05\air.departure.sig995.2012.nc')
subset = dataset.sel(lon=73, lat=33,method='nearest')
latitude =dataset.lat
longitude=dataset.lon
time=subset.time
a=subset.air_dep.values
print(len(a))
print(len(time))
'''
plt.plot(time,a)
#X = np.reshape(a,(1, a.size))
plt.title('mean Daily Air Temperature degK')
plt.xlabel('Months by gap 2')
plt.ylabel('Daily Air Temperature')
'''