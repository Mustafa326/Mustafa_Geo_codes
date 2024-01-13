
import matplotlib
import shapefile as shp  # Requires the pyshp package
import matplotlib.pyplot as plt
matplotlib.use('TkAgg')
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
#to import Tkinter
import sys
if sys.version_info[0] < 3:
    import Tkinter as Tk
else:
    import tkinter as Tk
#To read the shapefile
shp_path = r'D:\mustafa05\osgeopy-data\pak_adm_ocha_pco_gaul_20181218_SHP\punjab_pak.shp'
sf = shp.Reader(shp_path)
plt.figure()

for shape in sf.shapeRecords():
    x = [i[0] for i in shape.shape.points[:]]
    y = [i[1] for i in shape.shape.points[:]]

print("The values in X are:",x)
print("The values in Y are:",y)
print("The length of x is:",len(x))
print("The length of y is:",len(y))


root = Tk.Tk()
label=Tk.Label(master=root,text="This is the Shapefile of Punjab",font=("arial",18,"bold")).pack(side=Tk.TOP)
#for the graph
f= Figure(figsize=(7,7),dpi=100)
A=f.add_subplot(111)
#for creating the district polygons (without this you can only see the polygon of whole punjab)
for shape in sf.shapes():
    print("Finding Points")
    points = shape.points
    print("Found Points")    
    print("Now Creating Polygon")
    #ap = plt.Polygon(points,fill=False)
    ap = plt.Polygon(points)
    A.add_patch(ap) #to add the polygons to the subplot(figure)
    print("Polygon Created")
A.plot(x,y)

canvas = FigureCanvasTkAgg(f,master=root)
canvas.draw()
canvas.get_tk_widget().pack()
def _quit():
    root.quit()     # stops mainloop
    root.destroy()  # this is necessary on Windows to prevent
                    # Fatal Python Error: PyEval_RestoreThread: NULL tstate
button = Tk.Button(master=root, text='Quit', command=_quit)
button.pack(side=Tk.BOTTOM)

root.mainloop()

