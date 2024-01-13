#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Mon Dec 30 11:33:33 2019

@author: grel
"""



from osgeo import gdal, ogr,osr
import os,sys
from ospybook.vectorplotter import VectorPlotter

# opening datasource for writing
data=ogr.Open(r'/GIS-BS-Python/osgeopy-data/california/osgeopy-data/California/ca_census_albers.shp',1)
census_lyr=data.GetLayer()
#cities_lyr = data.GetLayer('cities_albers')

# creating field of population density per square kilometer

# first making field definition
density_field = ogr.FieldDefn('popsqkm', ogr.OFTReal)
#using field definition creating field
census_lyr.CreateField(density_field)
for row in census_lyr:
    pop = row.GetField('HD01_S001')# this field contains population per tract information
    sqkm = row.geometry().GetArea() / 1000000
    row.SetField('popsqkm', pop / sqkm)
    census_lyr.SetFeature(row)


# now step 2: getting and opening imperial county data file and copying the geometry for analsis
county_fn = r'/GIS-BS-Python/osgeopy-data/us/osgeopy-data/US/countyp010.shp'
county_ds = ogr.Open(county_fn)
county_lyr = county_ds.GetLayer()
county_lyr.SetAttributeFilter("COUNTY ='Imperial County'")
county_row = next(county_lyr) # I think it will take imperial country feature details
print county_row
county_geom = county_row.geometry().Clone()
del county_ds

# one more problem

# county layer is not projected
srs=census_lyr.GetSpatialRef()
county_geom.TransformTo(srs)
census_lyr.SetSpatialFilter(county_geom)


# Set an attribute filter based on the population field you created a minute
# ago.
census_lyr.SetAttributeFilter('popsqkm < 0.5')


# Open the wind layer and select the polygons with a good enough wind rating.
wind_fn = (r'/GIS-BS-Python/osgeopy-data/california/osgeopy-data/California/california_50m_wind_albers.shp')
wind_ds = ogr.Open(wind_fn)
wind_lyr = wind_ds.GetLayer()
wind_lyr.SetAttributeFilter('WPC >= 3')

# creating result layer to add the required fields
# Create a shapefile to hold the output data.
out_fn = (r'/GIS-BS-Python/osgeopy-data/california/osgeopy-data/California/wind_farm.shp')
out_ds = ogr.GetDriverByName('ESRI Shapefile').CreateDataSource(out_fn)
out_lyr = out_ds.CreateLayer('wind_farm', wind_lyr.GetSpatialRef(), ogr.wkbPolygon)
out_lyr.CreateField(ogr.FieldDefn('wind', ogr.OFTInteger))
out_lyr.CreateField(ogr.FieldDefn('popsqkm', ogr.OFTReal))
out_row = ogr.Feature(out_lyr.GetLayerDefn())


# first creating intersection between census layer and county
for census_row in census_lyr:
    census_geom = census_row.geometry()
    census_geom = census_geom.Intersection(county_geom)
    wind_lyr.SetSpatialFilter(census_geom) # mapping wind geomrty over result of intersection between census and county layer

    print('Intersecting census tract with {0} wind polygons'.format(
        wind_lyr.GetFeatureCount()))

    # Only bother with adding new rows to the output if there are wind
    # polygons selected by the filters.
    if wind_lyr.GetFeatureCount() > 0:
        value=census_row.GetField('popsqkm')
        out_row.SetField('popsqkm',value )
        for wind_row in wind_lyr:
            wind_geom = wind_row.geometry()

            # Again, only bother with adding rows to the output if there is
            # an intersection to add.
            if census_geom.Intersect(wind_geom):
                new_geom = census_geom.Intersection(wind_geom)
                out_row.SetField('wind', wind_row.GetField('WPC'))
                out_row.SetGeometry(new_geom)
                out_lyr.CreateFeature(out_row)
del out_ds

