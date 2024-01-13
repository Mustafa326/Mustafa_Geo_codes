#importing the libraries
import io
import os
from pathlib import Path
from PyQt5 import QtCore, QtWidgets, QtWebEngineWidgets
from PyQt5.QtWidgets import QApplication, QVBoxLayout, QWidget
from PyQt5.QtWebEngineWidgets import QWebEngineView 
import folium
import geopandas
import pandas as pd
#print('folium ver: ', folium.__version__)
from folium import plugins
from branca.colormap import linear
#Loading geojson and csv data for covid
covidcsvsourec = r"D:\mustafa05\CORONA_final.csv"
covidcsv = pd.read_csv(covidcsvsourec)
#print(covidcsv.head(5))
geodata=r"D:\mustafa05\pakistan_corona.geojson"
covid_dict = covidcsv.set_index('District')['Total_corona_cases_June']
print(covid_dict)
def my_color_function(feature):
    """Maps low values to green and hugh values to red."""
    if covid_dict[feature['Total_corona_cases_June']] > 25:
        return '#ff0000'
    else:
        return '#008000'  
m = folium.Map([33.72148, 73.04329], tiles='cartodbpositron', zoom_start=4)
def my_color_function(feature):
    """Maps low values to green and hugh values to red."""
    if  feature["properties"]["Total_corona_cases_June"]>20290:
        return '#800026'
    elif feature["properties"]["Total_corona_cases_June"]>3201:
        return '#E31A1C'
    elif feature["properties"]["Total_corona_cases_June"]>785:
        return '#FC4E2A'
    elif feature["properties"]["Total_corona_cases_June"]>331:
        return'#FD8D3C'
    elif feature["properties"]["Total_corona_cases_June"]>103:
        return '#FED976'
    else:
        return '#FFEDA0'
folium.GeoJson(
    geodata,
    style_function=lambda feature: {
        'fillColor': my_color_function(feature),
        'color' : 'black',
        'weight' : 2,
        'fill_opacity':0.7,
        'line_opacity':0.1,
        'dashArray' : '5, 5'
        }
    ).add_to(m)

m 
outfpa = r'D:\mustafa05\Choro45.html'
m.save(outfpa)
"""

class FoliumWidget(QWidget):
    def __init__(self, parent=None):
        QWidget.__init__(self, parent)


        current_dir = Path(__file__).resolve().parent
        self.view = QtWebEngineWidgets.QWebEngineView()

        covidcsvsourec = r"D:\mustafa05\CORONA_final.csv"
        covidcsv = pd.read_csv(covidcsvsourec)
        geodata=r"D:\mustafa05\pakistan_corona.geojson"
        m = folium.Map(location=[33.72148, 73.04329], tiles="cartodbpositron", zoom_start=3)

        choropleth = folium.Choropleth(
            geo_data=geodata,
            name="choropleth",
            data=covidcsv,
           columns=["District", "Total_corona_cases_March"],
           key_on="feature.properties.District",
           fill_color='YlOrRd',
            fill_opacity=0.7,
            line_opacity=0.5,
            legend_name="CovidCases",
            reset=True,
        ).add_to(m)
        tmp_file = QtCore.QTemporaryFile("choropleth.html", self)
        if tmp_file.open():
            m.save(tmp_file.fileName())
            url = QtCore.QUrl.fromLocalFile(tmp_file.fileName())
            self.view.load(url)
        lay = QtWidgets.QVBoxLayout(self)
        lay.addWidget(self.view)

        #choropleth.geojson.add_child(folium.features.GeoJsonTooltip(["name"]))



def main():
    app = QtWidgets.QApplication([])
    w = FoliumWidget()
    w.show()
    app.exec_()


if __name__ == "__main__":
    main()
"""
"""
        webView = QWebEngineView()
        layout.addWidget(webView)

        data = io.BytesIO()
        m.save(data, close_file=False)
        webView.setHtml(data.getvalue().decode())


def main():
    import sys

    app = QApplication(sys.argv)

    widget = FoliumWidget()
    widget.show()

    sys.exit(app.exec_())


if __name__ == "__main__":
    main()
#importing the libraries
import io
import os
from pathlib import Path
from PyQt5 import QtCore, QtWidgets, QtWebEngineWidgets
from PyQt5.QtWidgets import QApplication, QVBoxLayout, QWidget
from PyQt5.QtWebEngineWidgets import QWebEngineView 
import folium
import geopandas
import pandas as pd
#print('folium ver: ', folium.__version__)
from folium import plugins
from branca.colormap import linear
geodata=r"D:\mustafa05\pakistan_corona.geojson"
gdf= geopandas.read_file(geodata)
print(gdf.head())
print(gdf.columns)
colormap = linear.YlOrRd_09.scale(gdf.Total_corona_cases_June.min(), gdf.Total_corona_cases_June.max())
#print(colormap(6.0))
colormap
case_dict=gdf.set_index('District')['Total_corona_cases_June']
case_dict
#print(colormap)
#print(colormap.linear)
def style_function(feature):
    case_d = case_dict.get(int(feature['id']), None)
    return {
        'fillColor': '#black' if case_d is None else colormap(case_d),
        'color': 'black',
        'weight': 1,
        'dashArray': '5, 5',
        'fillOpacity': 0.9,
    }
my_map= folium.Map([33.72148, 73.04329], zoom_start=5)

x=folium.GeoJson(
    gdf,
    name='COvid19Pakistan',
    style_function=style_function,
    highlight_function= None,
    tooltip=(gdf[i] for i in gdf['District'])
).add_to(my_map)
x.add_child(
folium.features.GeoJsonTooltip(['District']))
colormap.add_to(my_map)
folium.LayerControl().add_to(my_map)

my_map.save('my_choropleth_geojson1.html')
my_map
"""