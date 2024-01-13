from PyQt5 import QtWidgets
from PyQt5.QtWidgets import QApplication, QMainWindow, QPushButton, QLabel, QVBoxLayout, QWidget

import sys
app = QApplication(sys.argv)
win = QMainWindow()
#win.setGeometry(400,400,500,300)
win.setWindowTitle("Project")
height=800
width=1300
win.setFixedWidth(width)
win.setFixedHeight(height)
win.setStyleSheet("background : lightgrey;")
button = QtWidgets.QPushButton(win)
button.setText("Another Window")
win2=QMainWindow()
win2.setWindowTitle("Second window")
def showwindow():
    win2.show()
    win.show()
button.clicked.connect(showwindow)
#win2=QWidget()
#label=QLabel(win2)
#label.setText("Another Window")
#layout = QVBoxLayout(win2)
#layout.addWidget(label)
#button = QPushButton(win)
#button.setText("A Button")

"""
class AnotherWindow(QWidget):
    
    #This "window" is a QWidget. If it has no parent, it
    #will appear as a free-floating window as we want.
    
    def __init__(self):
        super().__init__()
        layout = QVBoxLayout()
        self.label = QLabel("Another Window")
        layout.addWidget(self.label)
        self.setLayout(layout)


class MainWindow(QMainWindow):

    def __init__(self):
        super().__init__()
        self.button = QPushButton("Push for Window")
        self.button.clicked.connect(self.show_new_window)
        self.setCentralWidget(self.button)

    def show_new_window(self, checked):
        self.w = AnotherWindow()
        self.w.show()


app = QApplication(sys.argv)
w = MainWindow()
w.show()
app.exec()
"""
win.show()
sys.exit(app.exec_())