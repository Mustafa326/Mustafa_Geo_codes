#importing all the libraries
from tkinter import *
from matplotlib.figure import Figure 
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg,NavigationToolbar2Tk
import numpy as np
import xarray as xr
dataset = xr.open_dataset(r'D:\mustafa05\air.departure.sig995.2012.nc')
subset = dataset.sel(lon=73, lat=33,method='nearest')
latitude =dataset.lat
longitude=dataset.lon
time=subset.time
a=subset.air_dep.values
print(a)
print(time)
print(len(a))
print(len(time))
class Root(Tk):
    def __init__(self):
        super(Root,self).__init__()
        self.title("Ploting a graph")
        self.geometry("500x500")
        #self.configure(bg="black")
        #for linking the matplotlibCanvas function with tkinter
        self.matplotlibCanvas()

    def matplotlibCanvas(self):
        f= Figure(figsize=(5,5),dpi=100)
        A=f.add_subplot(111)
        A.plot(time,a)
        canvas = FigureCanvasTkAgg(f, self)
        canvas.draw()
        canvas.get_tk_widget().pack(side=BOTTOM,fill=BOTH,expand=TRUE)
        #for navigation toolbar
        '''
        toolbar = NavigationToolbar2Tk(canvas, self)
        toolbar.update()
        canvas._tkcanvas.pack(side=TOP, fill=BOTH, expand=True)
        '''

window=Root()
window.mainloop()
