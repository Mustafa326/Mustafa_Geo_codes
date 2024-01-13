#importing all the important libraries
import os
import sys
from osgeo import gdal
#calling the data_sources
os.chdir(r'D:\mustafa05\osgeopy-data\Switzerland')
data_source=gdal.Open('dem_class2.tif')
#geting the band
band=data_source.GetRasterBand(1)
#geting the histogram from the band
approximate_hist=band.GetHistogram()#where the argument of approx_ok is true
exact_hist=band.GetHistogram(approx_ok=False)
print("The approximate histogram is:",approximate_hist)
print("The exact values are:",exact_hist)