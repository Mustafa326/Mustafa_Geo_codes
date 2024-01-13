# -*- coding: utf-8 -*-
"""
Created on Mon Nov 11 05:38:15 2019

@author: root
"""

import os
import sys
from osgeo import ogr
from ospybook.vectorplotter import VectorPlotter
ds= r'/opt/mustafa05/osgeopy-data/global/capital_cities.shp'
lyr=ogr.Open(ds)
lyr1=lyr.GetLayer()
print lyr1

vp=VectorPlotter(1)
vp.plot(lyr1,'o')