#Importing the libraries
import io
import sys
import folium
import geopandas
import pandas as pd
from PyQt5 import QtWidgets, QtWebEngineWidgets,QtGui,QtCore
from PyQt5.QtGui import *
from PyQt5.QtWebEngineWidgets import *
from PyQt5.QtWidgets import QApplication, QMainWindow
import matplotlib.pyplot as plt
from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas
from matplotlib.backends.backend_qt5agg import NavigationToolbar2QT as NavigationToolbar
#Functions
def openwindow():
    win2.show()
    win.show()
def openwindow2():
    win3.show()
    win.show()
def closewindow():
    win2.close()
def closewindow2():
    win3.close()
#Creating a Choropleth through matplotlib for population density 2010
geodata=r"F:\SharukhKhan.geojson"
gdf= geopandas.read_file(geodata)
print(gdf.head())
print(gdf.columns)
print(gdf.plot())
name=gdf['District']
longitude=gdf['Longitude']
latitude=gdf['Latitude']
# set a variable that will call whatever column we want to visualise on the map
variable = 'Pop_2010'
# set the range for the choropleth
vmin, vmax = 116, 4379
# create figure and axes for Matplotlib
fig, ax = plt.subplots(1, figsize=(10, 6))
# create map
gdf.plot(column=variable, cmap='YlOrRd', linewidth=0.8, ax=ax, edgecolor='0.8')
#label

# remove the axis
ax.axis('off')
# add a title
ax.set_title('Population Density 2010 Punjab Pakistan', \
              fontdict={'fontsize': '25',
                        'fontweight' : '3'})

# Create colorbar as a legend
sm = plt.cm.ScalarMappable(cmap='YlOrRd', norm=plt.Normalize(vmin=vmin, vmax=vmax))
sm._A = []
cbar = fig.colorbar(sm)
#figure for the canvas
figure = fig  
# this is the Canvas Widget that 
canvas = FigureCanvas(figure)
#Creating the second choropleth
#Creating a Choropleth through matplotlib for population density 2015
# set a variable that will call whatever column we want to visualise on the map
variable2 = 'Pop_2015'
# set the range for the choropleth
vmin2, vmax2 = 130, 4883
# create figure and axes for Matplotlib
fig2, ax2 = plt.subplots(1, figsize=(10, 6))
# create map
gdf.plot(column=variable2, cmap='YlOrRd', linewidth=0.8, ax=ax2, edgecolor='0.8')
# remove the axis
ax2.axis('off')
# add a title
ax2.set_title('Population Density 2015 Punjab Pakistan', \
              fontdict={'fontsize': '25',
                        'fontweight' : '3'})

# Create colorbar as a legend
sm2 = plt.cm.ScalarMappable(cmap='YlOrRd', norm=plt.Normalize(vmin=vmin2, vmax=vmax2))
sm2._A = []
cbar2 = fig2.colorbar(sm2)
#figure for the canvas
figure2 = fig2  
# this is the Canvas Widget that 
canvas2 = FigureCanvas(figure2)
#Creating the third Choropleth
#Creating a Choropleth through matplotlib for population density 2010
geodata=r"F:\SharukhKhan.geojson"
gdf= geopandas.read_file(geodata)
print(gdf.head())
print(gdf.columns)
print(gdf.plot())
# set a variable that will call whatever column we want to visualise on the map
variable3 = 'Pop_2020'
# set the range for the choropleth
vmin3, vmax3 = 144, 5405
# create figure and axes for Matplotlib
fig3, ax3 = plt.subplots(1, figsize=(10, 6))
# create map
gdf.plot(column=variable3, cmap='YlOrRd', linewidth=0.8, ax=ax3, edgecolor='0.8')
# remove the axis
ax3.axis('off')
# add a title
ax3.set_title('Population Density 2020 Punjab Pakistan', \
              fontdict={'fontsize': '25',
                        'fontweight' : '3'})

# Create colorbar as a legend
sm3 = plt.cm.ScalarMappable(cmap='YlOrRd', norm=plt.Normalize(vmin=vmin3, vmax=vmax3))
sm3._A = []
cbar3 = fig3.colorbar(sm3)
#figure for the canvas
figure3 = fig3  
# this is the Canvas Widget that 
canvas3 = FigureCanvas(figure3)
#Starting the creation of the main window
app = QApplication(sys.argv)
win = QMainWindow()
win.setWindowTitle("SDSS")
height=700
width=900
win.setFixedWidth(width)
win.setFixedHeight(height)
win.setStyleSheet("background : lightgrey;")
bar=QtWidgets.QMainWindow.menuBar(win)
M1=bar.addMenu('&Population Density map 2010')
alreadyopen = QtWidgets.QAction("Already opened",win)
M1.addAction(alreadyopen)
M2=bar.addMenu('&Population Density map 2015')
display = QtWidgets.QAction("Display",win)
M2.addAction(display)
display.triggered.connect(openwindow)
M3=bar.addMenu('&Population Density map 2020')
display2 = QtWidgets.QAction("Display",win)
M3.addAction(display2)
display2.triggered.connect(openwindow2)
label = QtWidgets.QLabel(win)
label.setText("SDSS for Monitoring Population Density")
label.adjustSize()
label.setStyleSheet("color: white; background-color: black")
#label.setFixedWidth(win.width())
label.setAlignment(QtCore.Qt.AlignCenter)
label.move(160,20)
#label1 = QtWidgets.QLabel(win)
#label1.setPixmap(QtGui.QPixmap(''))
#label1.adjustSize()
#label1.move(160,100)
#win.resize(label1.width(),label1.height())
#Verticle layout
central_widget = QtWidgets.QWidget()
win.setCentralWidget(central_widget)
vertical = QtWidgets.QVBoxLayout(central_widget)
vertical.setSpacing(30)
vertical.addStretch()
vertical.addWidget(bar)
vertical.addWidget(label)
vertical.addWidget(canvas)
vertical.addStretch()
#win.setLayout(vertical)
#label.setAlignment(PyQt5.AlignCenter)

#The second window
win2 = QMainWindow()
win2.setWindowTitle("SDSS")
height2=700
width2=900
win2.setFixedWidth(width2)
win2.setFixedHeight(height2)
win2.setStyleSheet("background : lightgrey;")
closebutton=QtWidgets.QPushButton(win2)
closebutton.setText("Go Back")
closebutton.clicked.connect(closewindow)
label2 = QtWidgets.QLabel(win2)
label2.setText("SDSS for Monitoring Population Density")
label2.adjustSize()
label2.setStyleSheet("color: white; background-color: black")
#label.setFixedWidth(win.width())
label2.setAlignment(QtCore.Qt.AlignCenter)
label2.move(160,20)
#Verticle layout
central_widget2 = QtWidgets.QWidget()
win2.setCentralWidget(central_widget2)
vertical2 = QtWidgets.QVBoxLayout(central_widget2)
vertical2.setSpacing(30)
vertical2.addStretch()
vertical2.addWidget(closebutton)
vertical2.addWidget(label2)
vertical2.addWidget(canvas2)
vertical2.addStretch()

#
#The second window
win3 = QMainWindow()
win3.setWindowTitle("SDSS")
height3=700
width3=900
win3.setFixedWidth(width3)
win3.setFixedHeight(height3)
win3.setStyleSheet("background : lightgrey;")
closebutton2=QtWidgets.QPushButton(win3)
closebutton2.setText("Go Back")
closebutton2.clicked.connect(closewindow2)
label3 = QtWidgets.QLabel(win3)
label3.setText("SDSS for Monitoring Population Density")
label3.adjustSize()
label3.setStyleSheet("color: white; background-color: black")
#label.setFixedWidth(win.width())
label3.setAlignment(QtCore.Qt.AlignCenter)
label3.move(160,20)
#Verticle layout
central_widget3 = QtWidgets.QWidget()
win3.setCentralWidget(central_widget3)
vertical3 = QtWidgets.QVBoxLayout(central_widget3)
vertical3.setSpacing(30)
vertical3.addStretch()
vertical3.addWidget(closebutton2)
vertical3.addWidget(label3)
vertical3.addWidget(canvas3)
vertical3.addStretch()
win.show()
sys.exit(app.exec_())
"""
#importing the libraries 
import folium
import geopandas
import pandas as pd
#loading the csv data
covidcsvsourec = r"D:\mustafa05\CORONA_final.csv"
covidcsv = pd.read_csv(covidcsvsourec)

print(covidcsv.head(5))
geodata=r"D:\mustafa05\pakistan_corona.geojson"
layers=geopandas.read_file(geodata,driver="GeoJSON")
#print(layers)
#generating map
m = folium.Map(
            location=[33.72148, 73.04329],zoom_start=5
        )
#folium.GeoJson(geodata).add_to(m)

folium.Choropleth(
    geo_data=geodata,
    data=covidcsv,
    columns=["District", "Total_corona_cases_March"],
    key_on="feature.properties.District",
    fill_color='YlOrRd',
    fill_opacity=1
).add_to(m)
print(m)
outfp = r'D:\mustafa05\base_map.html'
m.save(outfp)
#geojson_data="D:/mustafa05/pakistan_corona.geojson"
#gdf = geopandas.read_file(geojson_data)
#fp = "mustafa05/pakistan_corona.geojson"
#data = geopandas.read_file(fp, driver="GeoJSON")
"""
"""
#loading the csv data
covidcsvsourec = r"D:\mustafa05\CORONA_final.csv"
covidcsv = pd.read_csv(covidcsvsourec)

print(covidcsv.head(5))
geodata=r"D:\mustafa05\pakistan_corona.geojson"
layers=geopandas.read_file(geodata,driver="GeoJSON")
#print(layers)
#generating map
m = folium.Map(
            location=[33.72148, 73.04329],zoom_start=5
        )
#folium.GeoJson(geodata).add_to(m)

folium.Choropleth(
    geo_data=geodata,
    data=covidcsv,
    columns=["District", "Total_corona_cases_March"],
    key_on="feature.properties.District",
    fill_color='YlOrRd',
    fill_opacity=1
).add_to(m)
print(m)
outfp = r'D:\mustafa05\base_map.html'
m.save(outfp)
#geojson_data="D:/mustafa05/pakistan_corona.geojson"
#gdf = geopandas.read_file(geojson_data)
#fp = "mustafa05/pakistan_corona.geojson"
#data = geopandas.read_file(fp, driver="GeoJSON")
"""