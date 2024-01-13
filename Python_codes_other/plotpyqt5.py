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

        # this is the Navigation widget
        # it takes the Canvas widget and a parent
#for the second window
app = QApplication(sys.argv)
win2=QMainWindow()
#Setting width, height and title for the second window
win2.setWindowTitle("Time prediction")
height=400
width=900
win2.setFixedWidth(width)
win2.setFixedHeight(height)
win2.setStyleSheet("background : lightgrey;")
#creating labels
label = QtWidgets.QLabel(win2)
label.setText(print('Infected persons tomorrow:', np.rint(X_predict[1])))
label2 = QtWidgets.QLabel(win2)
label2.setText(print('\nConfirmed cases tomorrow:', np.rint(X_predict[1] + R_predict[1])))


#pic=QtWidgets.QLabel(win2)
#pic.setGeometry(10, 10, 800, 800)
#pic.setPixmap(QtGui.QPixmap("D:\mustafa05\SIR_Pakistan.png"))
# Connect button to image updating 
central_widget2 = QtWidgets.QWidget()
win2.setCentralWidget(central_widget2)
lay2 = QtWidgets.QHBoxLayout(central_widget2)
button_container2 = QtWidgets.QWidget()
vlay2 = QtWidgets.QVBoxLayout(button_container2)
vlay2.setSpacing(20)
vlay2.addStretch()
vlay2.addWidget(label)
vlay2.addWidget(label2)
#vlay2.addWidget(canvas)
vlay2.addStretch()
lay2.addWidget(button_container2)
lay2.addWidget(canvas,stretch=1)
win2.show()
sys.exit(app.exec_())






