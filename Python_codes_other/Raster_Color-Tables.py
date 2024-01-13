#importing all the important libraries
import os
import sys
from osgeo import gdal
#Making a copy of the datasets
os.chdir(r'D:\mustafa05\osgeopy-data\Switzerland')
original_data_source=gdal.Open('dem_class.tif')
driver=gdal.GetDriverByName("GTIFF")
data=driver.CreateCopy('dem_class3.tif',original_data_source)
band=data.GetRasterBand(1)
#creating a colortable object
Ct=gdal.ColorTable()
Ct.SetColorEntry(1,(54,112,87))
Ct.SetColorEntry(2,(142,138,162))
Ct.SetColorEntry(3,(242,306,133))
Ct.SetColorEntry(4,(124,140,124))
Ct.SetColorEntry(5,(212,193,156))
#Seting raster color table
band.SetRasterColorTable(Ct)
band.SetRasterColorInterpretation(gdal.GCI_PaletteIndex)
del band,data

