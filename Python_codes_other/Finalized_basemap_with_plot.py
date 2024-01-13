import xarray as xr
from netCDF4 import Dataset
import os
os.environ['PROJ_LIB']=r'C:\Users\mustafa\Anaconda3\Lib\site-packages\mpl_toolkits\basemap'
import matplotlib
import numpy as np
matplotlib.use('TkAgg')
from mpl_toolkits.basemap import Basemap
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg, NavigationToolbar2Tk

import sys
if sys.version_info[0] < 3:
    import Tkinter as Tk
else:
    import tkinter as Tk
dataset = xr.open_dataset(r'D:\mustafa05\air.departure.sig995.2012.nc')
subset = dataset.sel(lon=73, lat=33,method='nearest')
latitude =dataset.lat
longitude=dataset.lon
time=subset.time
a=subset.air_dep.values
X = np.reshape(a,(1, a.size))
print("Your air_dep values are",a)
print("your time values are",time)
print("the length of a",len(a))
print("the length of time",len(time))
#plt.title('mean Daily Air Temperature degK')
#plt.xlabel('Months by gap 2')
#plt.ylabel('Daily Air Temperature')
'''
when = 0
filename = r'D:\mustafa05\air.departure.sig995.2012.nc' # input the complete filepath here
fopen = Dataset(filename, 'r') 
x = fopen.variables['lon'][:]
y = fopen.variables['lat'][:] 
data = fopen.variables['air_dep'][:] 
when=0
data_when = data[when,:,:]
'''
def open_window():
    top=Tk.Toplevel()
    top.title("Matplotlib_Time series_graph")
    #top.Label(text="This is the time series graph for tempereature in islamabad for the year 2012")
    f= Figure(figsize=(5,5),dpi=100)
    A=f.add_subplot(111)
    A.plot(a,time)
    canvas = FigureCanvasTkAgg(f, top)
    canvas.draw()
    canvas.get_tk_widget().pack()


root = Tk.Tk()
fig = Figure()  ## here
ax1 = fig.add_subplot(111)  ## here
button=Tk.Button(master=root,text="Open the graph window",command=open_window).pack()
label=Tk.Label(text="This is the base map for the islamabad region",font=("arial",18,"bold")).pack()
#for the base map
'''
m = Basemap(width=10000000, height=7000000,\
        resolution='l', projection='moll',\
        lat_ts=40, lat_0=50, lon_0=0,ax=ax1)
m.drawcoastlines()
m.drawparallels(np.arange(-80.,81,20))
m.drawmeridians(np.arange(-180.,181,20))
'''
m = Basemap(projection='mill',
            llcrnrlat = 32,
            llcrnrlon = 71,
            urcrnrlat = 35,
            urcrnrlon = 75,
            resolution='l',
            ax=ax1)
m.drawcoastlines()
m.drawcountries(linewidth=2)
#to plot a point on the map
q,p=33,73
a,b=np.meshgrid(p,q)
d,f=m(a,b)#to combine with basemap
m.plot(d,f,'ro')
#m.drawstates(color='b')

canvas = FigureCanvasTkAgg(fig, master=root)  ## here
canvas.draw()
canvas.get_tk_widget().pack(side=Tk.TOP, fill=Tk.BOTH, expand=1)
canvas._tkcanvas.pack(side=Tk.TOP, fill=Tk.BOTH, expand=1)
#navigation toolbar
'''
toolbar = NavigationToolbar2Tk(canvas, root)
toolbar.update()
canvas._tkcanvas.pack(side=Tk.TOP, fill=Tk.BOTH, expand=1)
'''
def _quit():
    root.quit()     # stops mainloop
    root.destroy()  # this is necessary on Windows to prevent
                    # Fatal Python Error: PyEval_RestoreThread: NULL tstate
button = Tk.Button(master=root, text='Quit', command=_quit)
button.pack(side=Tk.BOTTOM)

root.mainloop()

