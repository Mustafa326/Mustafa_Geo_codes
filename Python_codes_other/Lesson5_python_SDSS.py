import folium
# Create a Map instance
m = folium.Map(location=[33.72148,73.04329], zoom_start=10, control_scale=True)
print(m)
outfp = r'F:\Mustafa stuff\NUST\Second Semester\SDSS\Lessons\base_map.html'
m.save(outfp)