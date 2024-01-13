import satpy
import pyproj
import math
lat1,long1=(37.809662,-122.410408)
lat2,long2=(37.84161,-122.401489)
geometry=pyproj.Geod(ellps="WGS84")
angle1,angle2,distance=geometry.inv(long1,lat1,long2,lat2)
print(("the distance is %.2f:")%(distance))
