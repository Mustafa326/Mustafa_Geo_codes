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
def open_window():
    top=Tk.Toplevel()
    top.title("Matplotlib_graph")
    f= Figure(figsize=(5,5),dpi=100)
    a=f.add_subplot(111)
    a.plot([1,2,3,4,5,6,7,8],[5,6,1,3,8,9,3,5])
    canvas = FigureCanvasTkAgg(f, top)
    canvas.draw()
    canvas.get_tk_widget().pack()


root = Tk.Tk()
fig = Figure()  ## here
ax1 = fig.add_subplot(111)  ## here
button=Tk.Button(master=root,text="Open the graph window",command=open_window).pack()
label=Tk.Label(text="This is the base map for the islamabad region",font=("arial",18,"bold")).pack()
#root.configure(bg="black")
m = Basemap(width=10000000, height=7000000,\
        resolution='l', projection='moll',\
        lat_ts=40, lat_0=50, lon_0=0,ax=ax1)
m.drawcoastlines()
m.drawparallels(np.arange(-80.,81,20))
m.drawmeridians(np.arange(-180.,181,20))

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

