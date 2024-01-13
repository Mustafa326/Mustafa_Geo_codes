import numpy as np
import matplotlib.pyplot as plt
import xarray as xr
#import cartopy.crs as ccrs
ds1= xr.open_dataset("C3S_OZONE-L3-LP_CONC_MZM-GOMOS_ENVISAT_CCI-201001-fv0001.nc")
#data = xr.open_dataarray("AERDB_M3_VIIRS_SNPP.A2018335.1.nc")
ds11=ds1.ozone_concentration
#print (ds11)
pt=ds11.isel(latitude_centers=0, altitude=0)
lhr1=ds11.sel(latitude_centers=75.0, altitude=31)
#lhr1.plot()
np.log(lhr1).plot() #for lahore
#np.log(data).plot() #for 
'''
I1=((579-338)/(821.9+999)*(lhr1+999))+338
print (I1)
ds2 = xr.open_dataset("201001-C3S-L3_AEROSOL-AER_PRODUCTS-IASI-METOPA-ULB-MONTHLY-v8AN.nc")
#data = xr.open_dataarray("AERDB_M3_VIIRS_SNPP.A2018335.1.nc")
ds21=ds2.D_AOD10000_mean
#print (ds21)
pt=ds21.isel(latitude=0, longitude=0)
lhr2=ds21.sel(latitude=74.5, longitude=31.5)
lhr2.plot()
I2=((579-338)/(821.9+999)*(lhr2+999))+338
print (I2)
AQI=(I1+I2)/2
print('AQI is:', AQI)
#data.isel().plot(robust=True)
ax = plt.axes(projection=ccrs.Orthographic())
ax.coastlines()
b = ds11.isel().plot(transform=ccrs.UTM(zone=42, southern_hemisphere=False, globe=None), robust=True)
c = ds21.isel().plot(transform=ccrs.UTM(zone=42, southern_hemisphere=False, globe=None), robust=True)
#b.figure.savefig('project.png')
#UTM(42, southern_hemisphere=False, globe=None) #PlateCarree() 
#LambertCylindrical(central_longitude=0.0)
#Robinson(central_longitude=31)
'''