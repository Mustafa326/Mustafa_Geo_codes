import shapefile as shp  # Requires the pyshp package
import matplotlib.pyplot as plt
shp_path = r'D:\mustafa05\osgeopy-data\pak_adm_ocha_pco_gaul_20181218_SHP\punjab_pak.shp'
sf = shp.Reader(shp_path)
#plt.figure()

for shape in sf.shapeRecords():
    x = [i[0] for i in shape.shape.points[:]]
    y = [i[1] for i in shape.shape.points[:]]
    plt.plot(x,y)

print("The values in X are:",x)
print("The values in Y are:",y)
print("The length of x is:",len(x))
print("The length of y is:",len(y))
plt.show()


for shape in sf.shapes():
    print("Finding Points")
    points = shape.points
    print("Found Points")    

    print("Creating Polygon")
    ap = plt.Polygon(points, fill=False, edgecolor="k")
    ax.add_patch(ap)
    print("Polygon Created")