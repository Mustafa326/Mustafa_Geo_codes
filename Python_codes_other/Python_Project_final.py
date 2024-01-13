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
#latitude =dataset.lat
#longitude=dataset.lon
time=subset.time
a=subset.air_dep.values
#X = np.reshape(a,(1, a.size))
print("The subset of air_temp is:",a)
print("the subset of time is:",time)
print("The length of a is:",len(a))
print("The length of a is:",len(time))
#plt.title('mean Daily Air Temperature degK')
#plt.xlabel('Months by gap 2')
#plt.ylabel('Daily Air Temperature')
def open_window():
    top=Tk.Toplevel()
    top.title("Basemap")
    label1=Tk.Label(top,text="This is the base map for islamabad",font=("arial",18,"bold")).pack()
    #for base map
    m = Basemap(projection='mill',
            llcrnrlat = 32,
            llcrnrlon = 71,
            urcrnrlat = 35,
            urcrnrlon = 75,
            resolution='l',
            ax=ax1)
    m.drawcoastlines()
    m.drawcountries(linewidth=2)
    m.fillcontinents(color='coral',lake_color='aqua') 
#to plot a point on the map
    q,p=33,73
    a,b=np.meshgrid(p,q)
    d,f=m(a,b)
    m.plot(d,f,'ro')
    #m.drawstates(color='b')
    canvas = FigureCanvasTkAgg(fig,top)  ## here
    canvas.draw()
    canvas.get_tk_widget().pack(side=Tk.TOP, fill=Tk.BOTH, expand=1)
    canvas._tkcanvas.pack(side=Tk.TOP, fill=Tk.BOTH, expand=1)
   


root = Tk.Tk()
fig = Figure()  ## here
ax1 = fig.add_subplot(111)  ## here
button=Tk.Button(master=root,text="View Basemap",command=open_window).pack()
label=Tk.Label(text="This is the time series graph for air_dep in islamabad for 2012",font=("arial",18,"bold")).pack()

#for the graph
f= Figure(figsize=(5,5),dpi=100)
A=f.add_subplot(111)
#A.set_xlable('time')
#plt.title('mean Daily Air Temperature degK')
#plt.xlabel('Months by gap 2')
A.plot(time,a)
canvas = FigureCanvasTkAgg(f, master=root)
canvas.draw()
canvas.get_tk_widget().pack()

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

