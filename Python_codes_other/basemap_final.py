import numpy as np
from netCDF4 import Dataset
import os
os.environ['PROJ_LIB']=r'G:\anaconda\Lib\site-packages\mpl_toolkits\basemap'
import matplotlib.pyplot as plt
import xarray as xr
from mpl_toolkits.basemap import Basemap
when = 0
filename = 'F:/Semester 7/Python and customization with GIS/python project/air.departure.sig995.2012.nc' # input the complete filepath here
fopen = Dataset(filename, 'r') 
x = fopen.variables['lon'][:]
y = fopen.variables['lat'][:] 
data = fopen.variables['air_dep'][:] 
when=0
data_when = data[when,:,:]
m = Basemap(projection='mill',
            llcrnrlat = 32,
            llcrnrlon = 71,
            urcrnrlat = 35,
            urcrnrlon = 75,
            resolution='l')
m.drawcoastlines()
m.drawcountries(linewidth=2)
q,p=33,73
a,b=np.meshgrid(p,q)
d,f=m(a,b)
m.plot(d,f,'ro')
m.drawstates(color='b')
xx, yy = np.meshgrid(x, y)
xx, yy = m(xx,yy)
plt.contourf(xx, yy,data_when)
