import io
import sys
import folium
import geopandas
import pandas as pd
from PyQt5 import QtWidgets, QtWebEngineWidgets,QtGui,QtCore
from PyQt5.QtGui import *
from PyQt5.QtWebEngineWidgets import *
from PyQt5.QtWidgets import QApplication, QMainWindow
from folium import plugins
#For legend
from branca.element import Template, MacroElement
from branca.colormap import linear
import covsirphy as cs
import math
import numpy as np
from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas
from matplotlib.backends.backend_qt5agg import NavigationToolbar2QT as NavigationToolbar
import matplotlib.pyplot as plt
from sklearn.linear_model import Ridge
from sklearn.model_selection import GridSearchCV
np.seterr(divide='ignore', invalid='ignore')
#Loading geojson and csv data for covid
covidcsvsourec = r"D:\mustafa05\CORONA_final.csv"
covidcsv = pd.read_csv(covidcsvsourec)
#print(covidcsv.head(5))
#geodata=r"D:\mustafa05\pakistan_corona.geojson"
geodata=r"D:\mustafa05\covid19Pakistan2020.geojson"
gdf= geopandas.read_file(geodata)
print(gdf.head())
print(gdf.columns)
case_dict=gdf.set_index('District')['Total_corona_cases_June']
recoveries_dict=gdf.set_index('District')['Total_corona_recoveries_June']
death_dict=gdf.set_index('District')['Total_corona_death_June']
print(case_dict)
#Function which styles the choropleth for Cases
def my_color_function(feature):
    """Maps low values to green and hugh values to red."""
    if  feature["properties"]["Total_corona_cases_June"]>20290:
        return '#FF0000 '
    elif feature["properties"]["Total_corona_cases_June"]>3201:
        return '#F80000 '
    elif feature["properties"]["Total_corona_cases_June"]>785:
        return '#F00000 '
    elif feature["properties"]["Total_corona_cases_June"]>444:
        return '#E80000 '
    elif feature["properties"]["Total_corona_cases_June"]>209:
        return '#FF6600'
    elif feature["properties"]["Total_corona_cases_June"]>103:
        return '#FF9900'
    elif feature["properties"]["Total_corona_cases_June"]>112:
        return '#FFCC00'
    elif feature["properties"]["Total_corona_cases_June"]>30:
        return '#FFFF66'
    else:
        return '#FFFFCC'
#Function which styles the choropleth for Deaths
def my_color_function2(feature):
    if  feature["properties"]["Total_corona_death_June"]>388:
        return '#FF0000 '
    elif feature["properties"]["Total_corona_death_June"]>35:
        return '#F80000 '
    elif feature["properties"]["Total_corona_death_June"]>23:
        return '#F00000 '
    elif feature["properties"]["Total_corona_death_June"]>15:
        return '#E80000 '
    elif feature["properties"]["Total_corona_death_June"]>12:
        return '#FF6600'
    elif feature["properties"]["Total_corona_death_June"]>9:
        return '#FF9900'
    elif feature["properties"]["Total_corona_death_June"]>5:
        return '#FFCC00'
    elif feature["properties"]["Total_corona_death_June"]>1:
        return '#FFFF66'
    else:
        return '#FFFFCC'
#Function which styles the choropleth for Recoveries
def my_color_function3(feature):
    if  feature["properties"]["Total_corona_recoveries_June"]>10476:
        return '#264d00'
    elif feature["properties"]["Total_corona_recoveries_June"]>2635:
        return '#4d9900'
    elif feature["properties"]["Total_corona_recoveries_June"]>1277:
        return '#59b300'
    elif feature["properties"]["Total_corona_recoveries_June"]>352:
        return '#66cc00'
    elif feature["properties"]["Total_corona_recoveries_June"]>166:
        return '#80ff00'
    elif feature["properties"]["Total_corona_recoveries_June"]>80:
        return '#a6ff4d'
    elif feature["properties"]["Total_corona_recoveries_June"]>37:
        return '#bfff80'
    elif feature["properties"]["Total_corona_recoveries_June"]>10:
        return '#d9ffb3'
    else:
        return '#FFFFCC'
#Function which styles the choropleth for population density
def my_color_function4(feature):
    if  feature["properties"]["Populationdensity"]>6402:
        return '#FF0000 '
    elif feature["properties"]["Populationdensity"]>3322:
        return '#F80000 '
    elif feature["properties"]["Populationdensity"]>1632:
        return '#F00000 '
    elif feature["properties"]["Populationdensity"]>988:
        return '#E80000 '
    elif feature["properties"]["Populationdensity"]>585:
        return '#FF6600'
    elif feature["properties"]["Populationdensity"]>299:
        return '#FF9900'
    elif feature["properties"]["Populationdensity"]>129:
        return '#FFCC00'
    elif feature["properties"]["Populationdensity"]>2:
        return '#FFFF66'
    else:
        return '#FFFFCC'
app = QApplication(sys.argv)
#For the main window
win = QMainWindow()
#win.setGeometry(400,400,500,300)
#Setting width, height and title for the main window
win.setWindowTitle("Project")
height=800
width=1300
win.setFixedWidth(width)
win.setFixedHeight(height)
win.setStyleSheet("background : lightgrey;")
#creating buttons in the mainwindow
button = QtWidgets.QPushButton(win)
button.setText("Covid19 Deaths")
#Function to run when buttons would be clicked
def showwindow():
    win2.show()
    win.show()
def showwindow2():
    win3.show()
    win.show()
def showwindow3():
    win4.show()
    win.show()
def showwindow4():
    win6.show()
    win5.show()
def showwindow5():
    win5.show()
    win.show()
def closewindow():
    win2.close()
def closewindow2():
    win3.close()
def closewindow3():
    win4.close()
def closewindow4():
    win5.close()
def closewindow5():
    win6.close()
button.clicked.connect(showwindow)
button1 = QtWidgets.QPushButton(win)
button1.setText("Covid19 Recoveries")
button1.clicked.connect(showwindow2)
button2 = QtWidgets.QPushButton(win)
button2.setText("Population Density")
button2.clicked.connect(showwindow3)
buttonSIR = QtWidgets.QPushButton(win)
buttonSIR.setText("SIR Model Prediction")
buttonSIR.clicked.connect(showwindow5)

#sizing the buttons for the first window
button.setFixedSize(120, 50)
button1.setFixedSize(120, 50)
button2.setFixedSize(120, 50)
buttonSIR.setFixedSize(120, 50)
#creating a wbengine viewer
web=QtWebEngineWidgets.QWebEngineView(win)
web.setContentsMargins(10, 10, 10, 10)
central_widget = QtWidgets.QWidget()
win.setCentralWidget(central_widget)
lay = QtWidgets.QHBoxLayout(central_widget)
button_container = QtWidgets.QWidget()
vlay = QtWidgets.QVBoxLayout(button_container)
vlay.setSpacing(20)
vlay.addStretch()
vlay.addWidget(button)
vlay.addWidget(button1)
vlay.addWidget(button2)
vlay.addWidget(buttonSIR)
vlay.addStretch()
lay.addWidget(button_container)
lay.addWidget(web,stretch=1)
#for the second window
win2=QMainWindow()
#Setting width, height and title for the second window
win2.setWindowTitle("Covid19 Deaths 2020")
height=800
width=1300
win2.setFixedWidth(width)
win2.setFixedHeight(height)
win2.setStyleSheet("background : lightgrey;")
#creating buttons in the second mainwindow
button3 = QtWidgets.QPushButton(win2)
button3.setText("Go back")
button3.clicked.connect(closewindow)
web2=QtWebEngineWidgets.QWebEngineView(win2)
web2.setContentsMargins(10, 10, 10, 10)
central_widget2 = QtWidgets.QWidget()
win2.setCentralWidget(central_widget2)
lay2 = QtWidgets.QHBoxLayout(central_widget2)
button_container2 = QtWidgets.QWidget()
vlay2 = QtWidgets.QVBoxLayout(button_container2)
vlay2.setSpacing(20)
vlay2.addStretch()
vlay2.addWidget(button3)
vlay2.addStretch()
lay2.addWidget(button_container2)
lay2.addWidget(web2,stretch=1)
#For the third window
win3=QMainWindow()
#Setting width, height and title for the second window
win3.setWindowTitle("Covid19 Recoveries 2020")
height=800
width=1300
win3.setFixedWidth(width)
win3.setFixedHeight(height)
win3.setStyleSheet("background : lightgrey;")
#creating buttons in the third mainwindow
button4 = QtWidgets.QPushButton(win3)
button4.setText("Go Back")
button4.clicked.connect(closewindow2)
web3=QtWebEngineWidgets.QWebEngineView(win3)
web3.setContentsMargins(10, 10, 10, 10)
central_widget3 = QtWidgets.QWidget()
win3.setCentralWidget(central_widget3)
lay3 = QtWidgets.QHBoxLayout(central_widget3)
button_container3 = QtWidgets.QWidget()
vlay3 = QtWidgets.QVBoxLayout(button_container3)
vlay3.setSpacing(20)
vlay3.addStretch()
vlay3.addWidget(button4)
vlay3.addStretch()
lay3.addWidget(button_container3)
lay3.addWidget(web3,stretch=1)
#For the fourth window which shows population density data
#For the third window
win4=QMainWindow()
#Setting width, height and title for the fourth window
win4.setWindowTitle("Population Density")
height=800
width=1300
win4.setFixedWidth(width)
win4.setFixedHeight(height)
win4.setStyleSheet("background : lightgrey;")
#creating buttons in the second mainwindow
button5 = QtWidgets.QPushButton(win4)
button5.setText("Go Back")
button5.clicked.connect(closewindow3)
web4=QtWebEngineWidgets.QWebEngineView(win4)
web4.setContentsMargins(10, 10, 10, 10)
central_widget4 = QtWidgets.QWidget()
win4.setCentralWidget(central_widget4)
lay4 = QtWidgets.QHBoxLayout(central_widget4)
button_container4 = QtWidgets.QWidget()
vlay4 = QtWidgets.QVBoxLayout(button_container4)
vlay4.setSpacing(20)
vlay4.addStretch()
vlay4.addWidget(button5)
vlay4.addStretch()
lay4.addWidget(button_container4)
lay4.addWidget(web4,stretch=1)
#The 5th window for the purpose of graphs
win5=QMainWindow()
#Setting width, height and title for the second window
win5.setWindowTitle("SIR Analysis")
height=800
width=1300
win5.setFixedWidth(width)
win5.setFixedHeight(height)
win5.setStyleSheet("background : lightgrey;")
#creating buttons in the second mainwindow
button6 = QtWidgets.QPushButton(win5)
button6.setText("SR Analysis")
button7=QtWidgets.QPushButton(win5)
button7.setText("Time Dependent simulation")
button8=QtWidgets.QPushButton(win5)
button8.setText("Close")
pic=QtWidgets.QLabel(win5)
pic.setGeometry(10, 10, 800, 800)
pic.setPixmap(QtGui.QPixmap("D:\mustafa05\SIR_Pakistan.png"))
# Connect button to image updating 
def change(self):
    pic.setPixmap(QtGui.QPixmap( "D:\mustafa05\S-Rtrend.png"))
button7.clicked.connect(showwindow4)
button8.clicked.connect(closewindow4)
button6.clicked.connect(change)
central_widget5 = QtWidgets.QWidget()
win5.setCentralWidget(central_widget5)
lay5 = QtWidgets.QHBoxLayout(central_widget5)
button_container5 = QtWidgets.QWidget()
vlay5 = QtWidgets.QVBoxLayout(button_container5)
vlay5.setSpacing(20)
vlay5.addStretch()
vlay5.addWidget(button6)
vlay5.addWidget(button7)
vlay5.addWidget(button8)
vlay5.addStretch()
lay5.addWidget(button_container5)
lay5.addWidget(pic,stretch=1)
#other window
# Download and update datasets
data_loader = cs.DataLoader("input")
jhu_data = data_loader.jhu()
df=jhu_data.subset("Pakistan", province=None)
X_cml=np.array(df["Confirmed"])
print(X_cml)
recovered=np.array(df["Recovered"])
print(recovered)
d=np.array(df["Fatal"])
death=d+1
print(death)
#N=200
#df["Susceptible"]=df["Susceptible"].div(N)
#to save files
#filer = cs.Filer(directory="D:\mustafa05", prefix="SIR", suffix=None, numbering="01")
#Model name
model = cs.SIR
print(cs.SIR.NAME)
print(df.tail())
#ploting sir
# Line plot with the example data
#cs.line_plot(df.set_index("Date"),filename="D:\mustafa05\SIR_Pakistan.png", title="Pakistan SIR Model",ylabel="Cases", math_scale=True, y_integer=True)
# Select country name and register the data
#snl = cs.Scenario(country="Pakistan")
#snl.register(jhu_data)
# Check records
#snl.interactive = False
#snl.records(filename="D:\mustafa05\Casesovertine.png")
#snl.records(variables=["Confirmed", "Infected", "Fatal", "Recovered","Susceptible"], color_dict={"Confirmed": "blue", "Infected": "orange", "Fatal": "red", "Recovered": "green","Susceptible":"purple"})
# S-R trend analysis
#snl.trend(filename="D:\mustafa05\S-Rtrend.png")#.summary()
# Parameter estimation of SIR-F model
#print(snl.estimate(cs.SIR))
# History of reproduction number
#_ = snl.history(target="Rt",filename="D:\mustafa05\RT_simulation.png")
# History of parameters
#_ = snl.history_rate(filename="D:\mustafa05\parameterhistory.png")
#_ = snl.history(target="rho",filename="D:\mustafa05\rho_simulation.png")
# Simulation for 5000 days
#snl.add(days=500)
#_ = snl.simulate(filename="D:\mustafa05\simulation.png")
def data_spilt(data, orders, start):
    x_train = np.empty((len(data) - start - orders, orders))
    y_train = data[start + orders:]

    for i in range(len(data) - start - orders):
        x_train[i] = data[i + start:start + orders + i]


    return x_train, y_train


def ridge(x, y):
    print('\nStart searching good parameters for the task...')
    parameters = {'alpha': np.arange(0, 0.100005, 0.000005).tolist(),
                  "tol": [1e-8],
                  'fit_intercept': [True, False],
                  'normalize': [True, False]}

    clf = GridSearchCV(Ridge(), parameters, n_jobs=-1, cv=5)
    clf.fit(x, y)

    print('\nResults for the parameters grid search:')
    print('Model:', clf.best_estimator_)
    print('Score:', clf.best_score_)

    return clf


########## data ##########
# data collected from https://voice.baidu.com/act/newpneumonia/newpneumonia
# X_cml = cumulative confirmed cases
#X_cml = np.array([41, 45, 62, 121, 199, 291, 440, 574, 835, 1279, 1985, 2761, 4535, 5997, 7736, 9720, 11821, 14411, 17238, 20471, 24363, 28060, 31211, 34598, 37251, 40235, 42708, 44730, 59882, 63932, 66576, 68584, 70635, 72528, 74279, 75101, 75993, 76392, 77041, 77262, 77779, 78190, 78630, 78959, 79389, 79968, 80174, 80302, 80422, 80565, 80710, 80813, 80859, 80904, 80924, 80955, 80980, 81003, 81201, 81048, 81077, 81116, 81151, 81235, 81300, 81416, 81498, 81600, 81747, 81846, 81960, 82078, 82213, 82341, 82447, 82545, 82631, 82724, 82802, 82875, 82930, 83005, 83071, 83157, 83249], dtype=np.float64)[:-27]
# recovered = cumulative recovered cases
#recovered = np.array([12, 12, 16, 21, 25, 25, 28, 28, 34, 38, 49, 51, 60, 103, 124, 171, 243, 328, 475, 632, 892, 1153, 1540, 2050, 2651, 3283, 3998, 4742, 5915, 6728, 8101, 9425, 10853, 12561, 14387, 16170, 18279, 20673, 22907, 24757, 27353, 29775, 32531, 36157, 39049, 41675, 44518, 47260, 49914, 52109, 53793, 55477, 57143, 58684, 59982, 61567, 62887, 64216, 65649, 67022, 67863, 68799, 69725, 70547, 71284, 71876, 72382, 72841, 73299, 73791, 74196, 74737, 75122, 75600, 75937, 76225, 76415, 76610, 76785, 76984, 77210, 77348, 77450, 77586, 77711], dtype=np.float64)[:-27]
# death = cumulative deaths
#death = np.array([2, 3, 3, 3, 4, 6, 9, 18, 25, 41, 56, 80, 106, 132, 170, 213, 259, 304, 361, 425, 491, 564, 637, 723, 812, 909, 1017, 1114, 1368, 1381, 1524, 1666, 1772, 1870, 2006, 2121, 2239, 2348, 2445, 2595, 2666, 2718, 2747, 2791, 2838, 2873, 2915, 2946, 2984, 3015, 3045, 3073, 3100, 3123, 3140, 3162, 3173, 3180, 3194, 3204, 3218, 3231, 3242, 3250, 3253, 3261, 3267, 3276, 3283, 3287, 3293, 3298, 3301, 3306, 3311, 3314, 3321, 3327, 3331, 3335, 3338, 3340, 3340, 3342, 3344], dtype=np.float64)[:-27]

population = 225199937
########## data preprocess ##########
X = X_cml - recovered - death
R = recovered + death

n = np.array([population] * len(X), dtype=np.float64)

S = n - X - R

X_diff = np.array([X[:-1], X[1:]], dtype=np.float64).T
R_diff = np.array([R[:-1], R[1:]], dtype=np.float64).T

gamma = (R[1:] - R[:-1]) / X[:-1]
#gamma=gammaa +1 
print(gamma)
beta = n[:-1] * (X[1:] - X[:-1] + R[1:] - R[:-1]) / (X[:-1] * (n[:-1] - X[:-1] - R[:-1]))
R0 = beta / gamma

########## Parameters for Ridge Regression ##########
##### Orders of the two FIR filters in (12), (13) in the paper. #####
orders_beta = 3
orders_gamma = 3

##### Select a starting day for the data training in the ridge regression. #####
start_beta = 10
start_gamma = 10

########## Print Info ##########
print("\nThe latest transmission rate beta of SIR model:", beta[-1])
print("The latest recovering rate gamma of SIR model:", gamma[-1])
print("The latest basic reproduction number R0:", R0[-1])

########## Ridge Regression ##########
##### Split the data to the training set and testing set #####
x_beta, y_beta = data_spilt(beta, orders_beta, start_beta)
x_gamma, y_gamma = data_spilt(gamma, orders_gamma, start_gamma)

##### Searching good parameters #####
#clf_beta = ridge(x_beta, y_beta)
#clf_gamma = ridge(x_gamma, y_gamma)

##### Training and Testing #####
clf_beta = Ridge(alpha=0.003765, copy_X=True, fit_intercept=False, max_iter=None, normalize=True, random_state=None, solver='auto', tol=1e-08).fit(x_beta, y_beta)
clf_gamma = Ridge(alpha=0.001675, copy_X=True, fit_intercept=False, max_iter=None,normalize=True, random_state=None, solver='auto', tol=1e-08).fit(x_gamma, y_gamma)

beta_hat = clf_beta.predict(x_beta)
gamma_hat = clf_gamma.predict(x_gamma)

##### Plot the training and testing results #####
plt.figure(1)
plt.plot(y_beta, label=r'$\beta (t)$')
plt.plot(beta_hat, label=r'$\hat{\beta}(t)$')
plt.legend()

plt.figure(2)
plt.plot(y_gamma, label=r'$\gamma (t)$')
plt.plot(gamma_hat, label=r'$\hat{\gamma}(t)$')
plt.legend()

########## Time-dependent SIR model ##########

##### Parameters for the Time-dependent SIR model #####
stop_X = 0 # stopping criteria
stop_day = 60 # maximum iteration days (W in the paper)

day_count = 0
turning_point = 0

S_predict = [S[-1]]
X_predict = [X[-1]]
R_predict = [R[-1]]

predict_beta = np.array(beta[-orders_beta:]).tolist()
predict_gamma = np.array(gamma[-orders_gamma:]).tolist()
while (X_predict[-1] >= stop_X) and (day_count <= stop_day):
    if predict_beta[-1] > predict_gamma[-1]:
        turning_point += 1

    next_beta = clf_beta.predict(np.asarray([predict_beta[-orders_beta:]]))[0]
    next_gamma = clf_gamma.predict(np.asarray([predict_gamma[-orders_gamma:]]))[0]

    if next_beta < 0:
        next_beta = 0
    if next_gamma < 0:
        next_gamma = 0

    predict_beta.append(next_beta)
    predict_gamma.append(next_gamma)

    next_S = ((-predict_beta[-1] * S_predict[-1] *
               X_predict[-1]) / n[-1]) + S_predict[-1]
    next_X = ((predict_beta[-1] * S_predict[-1] * X_predict[-1]) /
              n[-1]) - (predict_gamma[-1] * X_predict[-1]) + X_predict[-1]
    next_R = (predict_gamma[-1] * X_predict[-1]) + R_predict[-1]

    S_predict.append(next_S)
    X_predict.append(next_X)
    R_predict.append(next_R)

    day_count += 1

########## Print Info ##########
print('\nConfirmed cases tomorrow:', np.rint(X_predict[1] + R_predict[1]))
print('Infected persons tomorrow:', np.rint(X_predict[1]))
print('Recovered + Death persons tomorrow:', np.rint(R_predict[1]))

print('\nEnd day:', day_count)
print('Confirmed cases on the end day:', np.rint(X_predict[-2] + R_predict[-2]))

print('\nTuring point:', turning_point)

########## Plot the time evolution of the time-dependent SIR model ##########
plt.figure(3)
plt.plot(range(len(X) - 1, len(X) - 1 + len(X_predict)), X_predict, '*-', label=r'$\hat{X}(t)$', color='darkorange')
plt.plot(range(len(X) - 1, len(X) - 1 + len(X_predict)), R_predict, '*-', label=r'$\hat{R}(t)$', color='limegreen')
plt.plot(range(len(X)), X, 'o--', label=r'$X(t)$', color='chocolate')
plt.plot(range(len(X)), R, 'o--', label=r'$R(t)$', color='darkgreen')
plt.xlabel('Day')
plt.ylabel('Person')
plt.title('Time evolution of the time-dependent SIR model.')

plt.legend()

plt.show()
 # a figure instance to plot on
figure = plt.figure(3)
   
        # this is the Canvas Widget that 
        # displays the 'figure'it takes the
        # 'figure' instance as a parameter to __init__
canvas = FigureCanvas(figure)

#for the 6th window
win6=QMainWindow()
#Setting width, height and title for the second window
win6.setWindowTitle("Time prediction")
height=400
width=900
win6.setFixedWidth(width)
win6.setFixedHeight(height)
win6.setStyleSheet("background : lightgrey;")
#creating labels
labela = QtWidgets.QLabel(win6)
labela.setText(print('Infected persons tomorrow:', np.rint(X_predict[1])))
labela2 = QtWidgets.QLabel(win6)
labela2.setText(print('\nConfirmed cases tomorrow:', np.rint(X_predict[1] + R_predict[1])))
button9 = QtWidgets.QPushButton(win6)
button9.setText("Close")
button9.clicked.connect(closewindow5)
central_widget6 = QtWidgets.QWidget()
win6.setCentralWidget(central_widget6)
lay6 = QtWidgets.QHBoxLayout(central_widget6)
button_container6 = QtWidgets.QWidget()
vlay6 = QtWidgets.QVBoxLayout(button_container6)
vlay6.setSpacing(20)
vlay6.addStretch(1)
vlay6.addWidget(labela)
vlay6.addWidget(labela2)
vlay6.addWidget(button9)
#vlay2.addWidget(canvas)
vlay6.addStretch()
lay6.addWidget(button_container6)
lay6.addWidget(canvas,stretch=1)
#The first map on the original window
m = folium.Map(
            location=[33.72148, 73.04329], tiles="cartodbpositron", zoom_start=5
        )
#folium.Marker(location=[33.72148, 73.04329]).add_to(m)
#The choropleth
x=folium.GeoJson(
    gdf,
    style_function=lambda feature: {
        'fillColor': my_color_function(feature),
        'color' : 'black',
        'weight' : 2,
        'fill_opacity':5,
        'line_opacity':0.2,
        #'dashArray' : '5, 5'
        },
    highlight_function= None,
    ).add_to(m)
x.add_child(
folium.features.GeoJsonTooltip(['District','Total_corona_cases_June']))
folium.LayerControl().add_to(m)
"""
choropleth = folium.Choropleth(
            geo_data=geodata,
            name="choropleth",
            data=covidcsv,
           columns=["District", "Total_corona_cases_June"],
           key_on="feature.properties.District",
           fill_color='YlOrRd',
            fill_opacity=0.7,
            line_opacity=0.1,
            legend_name="CovidCases",
            reset=True,
        ).add_to(m)
"""
#For legend
template = """
{% macro html(this, kwargs) %}

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>jQuery UI Draggable - Default functionality</title>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  
  <script>
  $( function() {
    $( "#maplegend" ).draggable({
                    start: function (event, ui) {
                        $(this).css({
                            right: "auto",
                            top: "auto",
                            bottom: "auto"
                        });
                    }
                });
});

  </script>
</head>
<body>

 
<div id='maplegend' class='maplegend' 
    style='position: absolute; z-index:9999; border:2px solid grey; background-color:rgba(255, 255, 255, 0.8);
     border-radius:6px; padding: 10px; font-size:14px; right: 20px; bottom: 20px;'>
     
<div class='legend-title'>Covid19 Cases June 2020 (draggable!)</div>
<div class='legend-scale'>
  <ul class='legend-labels'>
    <li><span style='background:#FFFF66;opacity:0.7;'></span>0-30</li>
    <li><span style='background:#FFCC00;opacity:0.7;'></span>30-112</li>
    <li><span style='background:#FF9900;opacity:0.7;'></span>112-209</li>
    <li><span style='background:#FF6600;opacity:0.7;'></span>209-444</li>
    <li><span style='background:#E80000;opacity:0.7;'></span>444-785</li>
    <li><span style='background:#F00000;opacity:0.7;'></span>785-3201</li>
    <li><span style='background:#F80000;opacity:0.7;'></span>3201-20290</li>
    <li><span style='background:#FF0000;opacity:0.7;'></span>greater than 20290</li>
  </ul>
</div>
</div>
 
</body>
</html>

<style type='text/css'>
  .maplegend .legend-title {
    text-align: left;
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 90%;
    }
  .maplegend .legend-scale ul {
    margin: 0;
    margin-bottom: 5px;
    padding: 0;
    float: left;
    list-style: none;
    }
  .maplegend .legend-scale ul li {
    font-size: 80%;
    list-style: none;
    margin-left: 0;
    line-height: 18px;
    margin-bottom: 2px;
    }
  .maplegend ul.legend-labels li span {
    display: block;
    float: left;
    height: 16px;
    width: 30px;
    margin-right: 5px;
    margin-left: 0;
    border: 1px solid #999;
    }
  .maplegend .legend-source {
    font-size: 80%;
    color: #777;
    clear: both;
    }
  .maplegend a {
    color: #777;
    }
</style>
{% endmacro %}"""

macro = MacroElement()
macro._template = Template(template)

m.get_root().add_child(macro)
#To add a tooltip to show something when the layer is clicked 
#choropleth.geojson.add_child(folium.features.GeoJsonTooltip(["District"]))
#folium.GeoJson(geodata).add_to(m)
#Saving the html file
outfp = r'D:\mustafa05\Choro.html'
m.save(outfp)
url = QtCore.QUrl.fromLocalFile(outfp)
web.load(url)
#Second Map
mapa = folium.Map(
            location=[33.72148, 73.04329], tiles="cartodbpositron", zoom_start=5
        )
#folium.Marker(location=[33.72148, 73.04329]).add_to(mapa)
y=folium.GeoJson(
    gdf,
    style_function=lambda feature: {
        'fillColor': my_color_function2(feature),
        'color' : 'black',
        'weight' : 2,
        'fill_opacity':5,
        'line_opacity':0.2,
        #'dashArray' : '5, 5'
        },
    highlight_function= None,
    ).add_to(mapa)
y.add_child(
folium.features.GeoJsonTooltip(['District','Total_corona_death_June']))
folium.LayerControl().add_to(mapa)

#The choropleth
"""
choropleth2 = folium.Choropleth(
            geo_data=geodata,
            name="choropleth2",
            data=covidcsv,
           columns=["District", "Total_corona_death_June"],
           key_on="feature.properties.District",
           fill_color='YlOrRd',
            fill_opacity=0.7,
            line_opacity=0.1,
            legend_name="Coviddeath",
            reset=True,
        ).add_to(mapa)
"""
#For legend
template1 ="""
{% macro html(this, kwargs) %}

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>jQuery UI Draggable - Default functionality</title>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  
  <script>
  $( function() {
    $( "#maplegend" ).draggable({
                    start: function (event, ui) {
                        $(this).css({
                            right: "auto",
                            top: "auto",
                            bottom: "auto"
                        });
                    }
                });
});

  </script>
</head>
<body>

 
<div id='maplegend' class='maplegend' 
    style='position: absolute; z-index:9999; border:2px solid grey; background-color:rgba(255, 255, 255, 0.8);
     border-radius:6px; padding: 10px; font-size:14px; right: 20px; bottom: 20px;'>
     
<div class='legend-title'>Covid19 Deaths June 2020 (draggable!)</div>
<div class='legend-scale'>
  <ul class='legend-labels'>
    <li><span style='background:#FFFF66;opacity:0.7;'></span>1-5</li>
    <li><span style='background:#FFCC00;opacity:0.7;'></span>5-9</li>
    <li><span style='background:#FF9900;opacity:0.7;'></span>9-12</li>
    <li><span style='background:#FF6600;opacity:0.7;'></span>12-15</li>
    <li><span style='background:#E80000;opacity:0.7;'></span>15-23</li>
    <li><span style='background:#F00000;opacity:0.7;'></span>23-35</li>
    <li><span style='background:#F80000;opacity:0.7;'></span>35-388</li>
    <li><span style='background:#FF0000;opacity:0.7;'></span>greater than 388</li>
  </ul>
</div>
</div>
 
</body>
</html>

<style type='text/css'>
  .maplegend .legend-title {
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 90%;
    }
  .maplegend .legend-scale ul {
    margin: 0;
    margin-bottom: 5px;
    padding: 0;
    float: left;
    list-style: none;
    }
  .maplegend .legend-scale ul li {
    font-size: 80%;
    list-style: none;
    margin-left: 0;
    line-height: 18px;
    margin-bottom: 2px;
    }
  .maplegend ul.legend-labels li span {
    display: block;
    float: left;
    height: 16px;
    width: 30px;
    margin-right: 5px;
    margin-left: 0;
    border: 1px solid #999;
    }
  .maplegend .legend-source {
    font-size: 80%;
    color: #777;
    clear: both;
    }
  .maplegend a {
    color: #777;
    }
</style>
{% endmacro %}"""
macro1 = MacroElement()
macro1._template = Template(template1)

mapa.get_root().add_child(macro1)
#To add a tooltip to show something when the layer is clicked 
#choropleth2.geojson.add_child(folium.features.GeoJsonTooltip(["District"]))
#folium.GeoJson(geodata).add_to(m)
#Saving the html file
outfpa = r'D:\mustafa05\Choro2.html'
mapa.save(outfpa)
url2 = QtCore.QUrl.fromLocalFile(outfpa)
web2.load(url2)
"""
tmp_file = QtCore.QTemporaryFile("choropleth.html", win)
if tmp_file.open():
    m.save(tmp_file.fileName())
    url = QtCore.QUrl.fromLocalFile(tmp_file.fileName())
    web.load(url)
"""
#lay = QtWidgets.QVBoxLayout(win)
#lay.addWidget(win.view)
"""#For small data
data = io.BytesIO()
m.save(data, close_file=False)
web.setHtml(data.getvalue().decode())
"""
#Third map which represents the recoveries
mapa1 = folium.Map(
            location=[33.72148, 73.04329], tiles="cartodbpositron", zoom_start=5
        )
#folium.Marker(location=[33.72148, 73.04329]).add_to(mapa1)
z=folium.GeoJson(
    gdf,
    style_function=lambda feature: {
        'fillColor': my_color_function3(feature),
        'color' : 'black',
        'weight' : 2,
        'fill_opacity':5,
        'line_opacity':0.2,
        #'dashArray' : '5, 5'
        },
    highlight_function= None,
    ).add_to(mapa1)
z.add_child(
folium.features.GeoJsonTooltip(['District','Total_corona_recoveries_June']))
folium.LayerControl().add_to(mapa1)

#The choropleth
"""
choropleth2 = folium.Choropleth(
            geo_data=geodata,
            name="choropleth2",
            data=covidcsv,
           columns=["District", "Total_corona_death_June"],
           key_on="feature.properties.District",
           fill_color='YlOrRd',
            fill_opacity=0.7,
            line_opacity=0.1,
            legend_name="Coviddeath",
            reset=True,
        ).add_to(mapa)
"""
#For legend
template2 ="""
{% macro html(this, kwargs) %}

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>jQuery UI Draggable - Default functionality</title>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  
  <script>
  $( function() {
    $( "#maplegend" ).draggable({
                    start: function (event, ui) {
                        $(this).css({
                            right: "auto",
                            top: "auto",
                            bottom: "auto"
                        });
                    }
                });
});

  </script>
</head>
<body>

 
<div id='maplegend' class='maplegend' 
    style='position: absolute; z-index:9999; border:2px solid grey; background-color:rgba(255, 255, 255, 0.8);
     border-radius:6px; padding: 10px; font-size:14px; right: 20px; bottom: 20px;'>
     
<div class='legend-title'>Covid19 Recoveries June2020 (draggable!)</div>
<div class='legend-scale'>
  <ul class='legend-labels'>
    <li><span style='background:#d9ffb3;opacity:0.7;'></span>10-37</li>
    <li><span style='background:#bfff80;opacity:0.7;'></span>37-80</li>
    <li><span style='background:#a6ff4d;opacity:0.7;'></span>80-166</li>
    <li><span style='background:#80ff00;opacity:0.7;'></span>166-352</li>
    <li><span style='background:#66cc00;opacity:0.7;'></span>352-1277</li>
    <li><span style='background:#59b300;opacity:0.7;'></span>1277-2635</li>
    <li><span style='background:#4d9900;opacity:0.7;'></span>2635-10476</li>
    <li><span style='background:#264d00;opacity:0.7;'></span>greater than 10476</li>
  </ul>
</div>
</div>

</body>
</html>

<style type='text/css'>
  .maplegend .legend-title {
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 90%;
    }
  .maplegend .legend-scale ul {
    margin: 0;
    margin-bottom: 5px;
    padding: 0;
    float: left;
    list-style: none;
    }
  .maplegend .legend-scale ul li {
    font-size: 80%;
    list-style: none;
    margin-left: 0;
    line-height: 18px;
    margin-bottom: 2px;
    }
  .maplegend ul.legend-labels li span {
    display: block;
    float: left;
    height: 16px;
    width: 30px;
    margin-right: 5px;
    margin-left: 0;
    border: 1px solid #999;
    }
  .maplegend .legend-source {
    font-size: 80%;
    color: #777;
    clear: both;
    }
  .maplegend a {
    color: #777;
    }
</style>
{% endmacro %}"""
macro2 = MacroElement()
macro2._template = Template(template2)

mapa1.get_root().add_child(macro2)
#To add a tooltip to show something when the layer is clicked 
#choropleth2.geojson.add_child(folium.features.GeoJsonTooltip(["District"]))
#folium.GeoJson(geodata).add_to(m)
#Saving the html file
outfpa1 = r'D:\mustafa05\Choro3.html'
mapa1.save(outfpa1)
url3 = QtCore.QUrl.fromLocalFile(outfpa1)
web3.load(url3)
"""
tmp_file = QtCore.QTemporaryFile("choropleth.html", win)
if tmp_file.open():
    m.save(tmp_file.fileName())
    url = QtCore.QUrl.fromLocalFile(tmp_file.fileName())
    web.load(url)
"""
#lay = QtWidgets.QVBoxLayout(win)
#lay.addWidget(win.view)
"""#For small data
data = io.BytesIO()
m.save(data, close_file=False)
web.setHtml(data.getvalue().decode())
"""
#Fourth map which represents the population density
#Third map which represents the recoveries
mapa2 = folium.Map(
            location=[33.72148, 73.04329], tiles="cartodbpositron", zoom_start=5
        )
#folium.Marker(location=[33.72148, 73.04329]).add_to(mapa1)
t=folium.GeoJson(
    gdf,
    style_function=lambda feature: {
        'fillColor': my_color_function4(feature),
        'color' : 'black',
        'weight' : 2,
        'fill_opacity':5,
        'line_opacity':0.2,
        #'dashArray' : '5, 5'
        },
    highlight_function= None,
    ).add_to(mapa2)
t.add_child(
folium.features.GeoJsonTooltip(['District','Populationdensity']))
folium.LayerControl().add_to(mapa2)

#The choropleth
"""
choropleth2 = folium.Choropleth(
            geo_data=geodata,
            name="choropleth2",
            data=covidcsv,
           columns=["District", "Total_corona_death_June"],
           key_on="feature.properties.District",
           fill_color='YlOrRd',
            fill_opacity=0.7,
            line_opacity=0.1,
            legend_name="Coviddeath",
            reset=True,
        ).add_to(mapa)
"""
#For legend
template3 ="""
{% macro html(this, kwargs) %}

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>jQuery UI Draggable - Default functionality</title>
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

  <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
  
  <script>
  $( function() {
    $( "#maplegend" ).draggable({
                    start: function (event, ui) {
                        $(this).css({
                            right: "auto",
                            top: "auto",
                            bottom: "auto"
                        });
                    }
                });
});

  </script>
</head>
<body>

 
<div id='maplegend' class='maplegend' 
    style='position: absolute; z-index:9999; border:2px solid grey; background-color:rgba(255, 255, 255, 0.8);
     border-radius:6px; padding: 10px; font-size:14px; right: 20px; bottom: 20px;'>
     
<div class='legend-title'>Population Density(people/sqkm)</div>
<div class='legend-scale'>
  <ul class='legend-labels'>
    <li><span style='background:#FFFF66;opacity:0.7;'></span>2-129</li>
    <li><span style='background:#FFCC00;opacity:0.7;'></span>129-300</li>
    <li><span style='background:#FF9900;opacity:0.7;'></span>300-585</li>
    <li><span style='background:#FF6600;opacity:0.7;'></span>585-988</li>
    <li><span style='background:#E80000;opacity:0.7;'></span>988-1633</li>
    <li><span style='background:#F00000;opacity:0.7;'></span>1633-3322</li>
    <li><span style='background:#F80000;opacity:0.7;'></span>3322-6402</li>
    <li><span style='background:#FF0000;opacity:0.7;'></span>greater than 6402</li>
  </ul>
</div>
</div>

</body>
</html>

<style type='text/css'>
  .maplegend .legend-title {
    margin-bottom: 5px;
    font-weight: bold;
    font-size: 90%;
    }
  .maplegend .legend-scale ul {
    margin: 0;
    margin-bottom: 5px;
    padding: 0;
    float: left;
    list-style: none;
    }
  .maplegend .legend-scale ul li {
    font-size: 80%;
    list-style: none;
    margin-left: 0;
    line-height: 18px;
    margin-bottom: 2px;
    }
  .maplegend ul.legend-labels li span {
    display: block;
    float: left;
    height: 16px;
    width: 30px;
    margin-right: 5px;
    margin-left: 0;
    border: 1px solid #999;
    }
  .maplegend .legend-source {
    font-size: 80%;
    color: #777;
    clear: both;
    }
  .maplegend a {
    color: #777;
    }
</style>
{% endmacro %}"""
macro3 = MacroElement()
macro3._template = Template(template3)

mapa2.get_root().add_child(macro3)
#To add a tooltip to show something when the layer is clicked 
#choropleth2.geojson.add_child(folium.features.GeoJsonTooltip(["District"]))
#folium.GeoJson(geodata).add_to(m)
#Saving the html file
outfpa2 = r'D:\mustafa05\Choro4.html'
mapa2.save(outfpa2)
url4 = QtCore.QUrl.fromLocalFile(outfpa2)
web4.load(url4)
"""
tmp_file = QtCore.QTemporaryFile("choropleth.html", win)
if tmp_file.open():
    m.save(tmp_file.fileName())
    url = QtCore.QUrl.fromLocalFile(tmp_file.fileName())
    web.load(url)
"""
#lay = QtWidgets.QVBoxLayout(win)
#lay.addWidget(win.view)
"""#For small data
data = io.BytesIO()
m.save(data, close_file=False)
web.setHtml(data.getvalue().decode())
"""
win.show()
sys.exit(app.exec_())


'''
import io
import sys
import folium
import geopandas
import pandas as pd
from PyQt5 import QtWidgets, QtWebEngineWidgets,QtGui,QtCore
from PyQt5.QtGui import *
from PyQt5.QtWebEngineWidgets import *
from PyQt5.QtWidgets import QApplication, QMainWindow
from folium import plugins
#For legend
from branca.element import Template, MacroElement
from branca.colormap import linear
import covsirphy as cs
import math
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import Ridge
from sklearn.model_selection import GridSearchCV
np.seterr(divide='ignore', invalid='ignore')
# Download and update datasets
data_loader = cs.DataLoader("input")
jhu_data = data_loader.jhu()
df=jhu_data.subset("Pakistan", province=None)
X_cml=np.array(df["Confirmed"])
print(X_cml)
recovered=np.array(df["Recovered"])
print(recovered)
d=np.array(df["Fatal"])
death=d+1
print(death)
#N=200
#df["Susceptible"]=df["Susceptible"].div(N)
#to save files
#filer = cs.Filer(directory="D:\mustafa05", prefix="SIR", suffix=None, numbering="01")
#Model name
model = cs.SIR
print(cs.SIR.NAME)
print(df.tail())
#ploting sir
# Line plot with the example data
cs.line_plot(df.set_index("Date"),filename="D:\mustafa05\SIR_Pakistan.png", title="Pakistan SIR Model",ylabel="Cases", math_scale=True, y_integer=True)
# Select country name and register the data
snl = cs.Scenario(country="Pakistan")
snl.register(jhu_data)
# Check records
snl.interactive = False
snl.records(filename="D:\mustafa05\Casesovertine.png")
#snl.records(variables=["Confirmed", "Infected", "Fatal", "Recovered","Susceptible"], color_dict={"Confirmed": "blue", "Infected": "orange", "Fatal": "red", "Recovered": "green","Susceptible":"purple"})
# S-R trend analysis
snl.trend(filename="D:\mustafa05\S-Rtrend.png")#.summary()
# Parameter estimation of SIR-F model
#print(snl.estimate(cs.SIR))
# History of reproduction number
#_ = snl.history(target="Rt",filename="D:\mustafa05\RT_simulation.png")
# History of parameters
#_ = snl.history_rate(filename="D:\mustafa05\parameterhistory.png")
#_ = snl.history(target="rho",filename="D:\mustafa05\rho_simulation.png")
# Simulation for 30 days
#snl.add(days=100)
#_ = snl.simulate(filename="D:\mustafa05\simulation.png")
def data_spilt(data, orders, start):
    x_train = np.empty((len(data) - start - orders, orders))
    y_train = data[start + orders:]

    for i in range(len(data) - start - orders):
        x_train[i] = data[i + start:start + orders + i]


    return x_train, y_train


def ridge(x, y):
    print('\nStart searching good parameters for the task...')
    parameters = {'alpha': np.arange(0, 0.100005, 0.000005).tolist(),
                  "tol": [1e-8],
                  'fit_intercept': [True, False],
                  'normalize': [True, False]}

    clf = GridSearchCV(Ridge(), parameters, n_jobs=-1, cv=5)
    clf.fit(x, y)

    print('\nResults for the parameters grid search:')
    print('Model:', clf.best_estimator_)
    print('Score:', clf.best_score_)

    return clf


########## data ##########
# data collected from https://voice.baidu.com/act/newpneumonia/newpneumonia
# X_cml = cumulative confirmed cases
#X_cml = np.array([41, 45, 62, 121, 199, 291, 440, 574, 835, 1279, 1985, 2761, 4535, 5997, 7736, 9720, 11821, 14411, 17238, 20471, 24363, 28060, 31211, 34598, 37251, 40235, 42708, 44730, 59882, 63932, 66576, 68584, 70635, 72528, 74279, 75101, 75993, 76392, 77041, 77262, 77779, 78190, 78630, 78959, 79389, 79968, 80174, 80302, 80422, 80565, 80710, 80813, 80859, 80904, 80924, 80955, 80980, 81003, 81201, 81048, 81077, 81116, 81151, 81235, 81300, 81416, 81498, 81600, 81747, 81846, 81960, 82078, 82213, 82341, 82447, 82545, 82631, 82724, 82802, 82875, 82930, 83005, 83071, 83157, 83249], dtype=np.float64)[:-27]
# recovered = cumulative recovered cases
#recovered = np.array([12, 12, 16, 21, 25, 25, 28, 28, 34, 38, 49, 51, 60, 103, 124, 171, 243, 328, 475, 632, 892, 1153, 1540, 2050, 2651, 3283, 3998, 4742, 5915, 6728, 8101, 9425, 10853, 12561, 14387, 16170, 18279, 20673, 22907, 24757, 27353, 29775, 32531, 36157, 39049, 41675, 44518, 47260, 49914, 52109, 53793, 55477, 57143, 58684, 59982, 61567, 62887, 64216, 65649, 67022, 67863, 68799, 69725, 70547, 71284, 71876, 72382, 72841, 73299, 73791, 74196, 74737, 75122, 75600, 75937, 76225, 76415, 76610, 76785, 76984, 77210, 77348, 77450, 77586, 77711], dtype=np.float64)[:-27]
# death = cumulative deaths
#death = np.array([2, 3, 3, 3, 4, 6, 9, 18, 25, 41, 56, 80, 106, 132, 170, 213, 259, 304, 361, 425, 491, 564, 637, 723, 812, 909, 1017, 1114, 1368, 1381, 1524, 1666, 1772, 1870, 2006, 2121, 2239, 2348, 2445, 2595, 2666, 2718, 2747, 2791, 2838, 2873, 2915, 2946, 2984, 3015, 3045, 3073, 3100, 3123, 3140, 3162, 3173, 3180, 3194, 3204, 3218, 3231, 3242, 3250, 3253, 3261, 3267, 3276, 3283, 3287, 3293, 3298, 3301, 3306, 3311, 3314, 3321, 3327, 3331, 3335, 3338, 3340, 3340, 3342, 3344], dtype=np.float64)[:-27]

population = 225199937
########## data preprocess ##########
X = X_cml - recovered - death
R = recovered + death

n = np.array([population] * len(X), dtype=np.float64)

S = n - X - R

X_diff = np.array([X[:-1], X[1:]], dtype=np.float64).T
R_diff = np.array([R[:-1], R[1:]], dtype=np.float64).T

gamma = (R[1:] - R[:-1]) / X[:-1]
#gamma=gammaa +1 
print(gamma)
beta = n[:-1] * (X[1:] - X[:-1] + R[1:] - R[:-1]) / (X[:-1] * (n[:-1] - X[:-1] - R[:-1]))
R0 = beta / gamma

########## Parameters for Ridge Regression ##########
##### Orders of the two FIR filters in (12), (13) in the paper. #####
orders_beta = 3
orders_gamma = 3

##### Select a starting day for the data training in the ridge regression. #####
start_beta = 10
start_gamma = 10

########## Print Info ##########
print("\nThe latest transmission rate beta of SIR model:", beta[-1])
print("The latest recovering rate gamma of SIR model:", gamma[-1])
print("The latest basic reproduction number R0:", R0[-1])

########## Ridge Regression ##########
##### Split the data to the training set and testing set #####
x_beta, y_beta = data_spilt(beta, orders_beta, start_beta)
x_gamma, y_gamma = data_spilt(gamma, orders_gamma, start_gamma)

##### Searching good parameters #####
#clf_beta = ridge(x_beta, y_beta)
#clf_gamma = ridge(x_gamma, y_gamma)

##### Training and Testing #####
clf_beta = Ridge(alpha=0.003765, copy_X=True, fit_intercept=False, max_iter=None, normalize=True, random_state=None, solver='auto', tol=1e-08).fit(x_beta, y_beta)
clf_gamma = Ridge(alpha=0.001675, copy_X=True, fit_intercept=False, max_iter=None,normalize=True, random_state=None, solver='auto', tol=1e-08).fit(x_gamma, y_gamma)

beta_hat = clf_beta.predict(x_beta)
gamma_hat = clf_gamma.predict(x_gamma)

##### Plot the training and testing results #####
plt.figure(1)
plt.plot(y_beta, label=r'$\beta (t)$')
plt.plot(beta_hat, label=r'$\hat{\beta}(t)$')
plt.legend()

plt.figure(2)
plt.plot(y_gamma, label=r'$\gamma (t)$')
plt.plot(gamma_hat, label=r'$\hat{\gamma}(t)$')
plt.legend()

########## Time-dependent SIR model ##########

##### Parameters for the Time-dependent SIR model #####
stop_X = 0 # stopping criteria
stop_day = 100 # maximum iteration days (W in the paper)

day_count = 0
turning_point = 0

S_predict = [S[-1]]
X_predict = [X[-1]]
R_predict = [R[-1]]

predict_beta = np.array(beta[-orders_beta:]).tolist()
predict_gamma = np.array(gamma[-orders_gamma:]).tolist()
while (X_predict[-1] >= stop_X) and (day_count <= stop_day):
    if predict_beta[-1] > predict_gamma[-1]:
        turning_point += 1

    next_beta = clf_beta.predict(np.asarray([predict_beta[-orders_beta:]]))[0]
    next_gamma = clf_gamma.predict(np.asarray([predict_gamma[-orders_gamma:]]))[0]

    if next_beta < 0:
        next_beta = 0
    if next_gamma < 0:
        next_gamma = 0

    predict_beta.append(next_beta)
    predict_gamma.append(next_gamma)

    next_S = ((-predict_beta[-1] * S_predict[-1] *
               X_predict[-1]) / n[-1]) + S_predict[-1]
    next_X = ((predict_beta[-1] * S_predict[-1] * X_predict[-1]) /
              n[-1]) - (predict_gamma[-1] * X_predict[-1]) + X_predict[-1]
    next_R = (predict_gamma[-1] * X_predict[-1]) + R_predict[-1]

    S_predict.append(next_S)
    X_predict.append(next_X)
    R_predict.append(next_R)

    day_count += 1

########## Print Info ##########
print('\nConfirmed cases tomorrow:', np.rint(X_predict[1] + R_predict[1]))
print('Infected persons tomorrow:', np.rint(X_predict[1]))
print('Recovered + Death persons tomorrow:', np.rint(R_predict[1]))

print('\nEnd day:', day_count)
print('Confirmed cases on the end day:', np.rint(X_predict[-2] + R_predict[-2]))

print('\nTuring point:', turning_point)

########## Plot the time evolution of the time-dependent SIR model ##########
plt.figure(3)
plt.plot(range(len(X) - 1, len(X) - 1 + len(X_predict)), X_predict, '*-', label=r'$\hat{X}(t)$', color='darkorange')
plt.plot(range(len(X) - 1, len(X) - 1 + len(X_predict)), R_predict, '*-', label=r'$\hat{R}(t)$', color='limegreen')
plt.plot(range(len(X)), X, 'o--', label=r'$X(t)$', color='chocolate')
plt.plot(range(len(X)), R, 'o--', label=r'$R(t)$', color='darkgreen')
plt.xlabel('Day')
plt.ylabel('Person')
plt.title('Time evolution of the time-dependent SIR model.')

plt.legend()

plt.show()

'''
