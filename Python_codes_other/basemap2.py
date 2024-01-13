import os
os.environ['PROJ_LIB']=r'C:\Users\mustafa\Anaconda3\Lib\site-packages\mpl_toolkits\basemap'
import numpy as np
from netCDF4 import Dataset
# from scipy.io import netcdf
import matplotlib
matplotlib.use('TkAgg')
import matplotlib.pyplot as plt
from mpl_toolkits.basemap import Basemap
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk

#importing tkinter

import sys
if sys.version_info[0] < 3:
    import Tkinter as Tk
else:
    import tkinter as Tk

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

root = Tk.Tk()
fig = Figure()  ## here
ax1 = fig.add_subplot(111)  ## here
m = Basemap(width=10000000, height=7000000,\
        resolution='l', projection='moll',\
        lat_ts=40, lat_0=50, lon_0=0,ax=ax1)
m.drawcoastlines()
m.drawparallels(np.arange(-80.,81,20))
m.drawmeridians(np.arange(-180.,181,20))
xx, yy = np.meshgrid(x, y)
xx, yy = m(xx, yy)
plt.contourf(xx, yy,data_when)


canvas = FigureCanvasTkAgg(fig, master=root)  ## here
canvas.draw()
canvas.get_tk_widget().pack(side=Tk.TOP, fill=Tk.BOTH, expand=1)
canvas._tkcanvas.pack(side=Tk.TOP, fill=Tk.BOTH, expand=1)

root.mainloop()