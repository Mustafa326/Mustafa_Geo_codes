from tkinter import *
def click():
    value=textentry.get()#it would get any value that you have entred in textbox
window=Tk()#creates a tkinter object
window.geometry("500x500")# for the size of the window
window.configure(bg='black')#for the background color for the Gui
window.title("My First GUI")#for title
#widgets  with grid method 

label1=Label(window,text="NetCDF_Plot",fg="white",bg="black",font=("arial",18,"bold"))
label1.grid(row=0,column=2)
label2=Label(window,text="Enter the name of the area you want to extract:",fg="white",bg="black",font=("arial",12,"bold"))
label2.grid(row=1,column=0,padx=10, pady=10)
textentry=Entry(window,width=20,bg="white")
textentry.grid(row=1,column=1,padx=10, pady=10)
label3=Label(window,text="Enter the variable you want to view:",fg="white",bg="black",font=("arial",12,"bold"))
label3.grid(row=2,column=0,padx=10, pady=10)
textentry2=Entry(window,width=20,bg="white")
textentry2.grid(row=2,column=1,padx=10, pady=10)
button=Button(window,text="submit",width=20,command=click).grid(row=3,column=0,sticky=E)
photo=PhotoImage(file="image1.png")
label4=Label(window,image=photo).grid(row=5,column=2,padx=10, pady=10)


#widgets  with Pack method 
'''
label1=Label(window,text="NetCDF_Plot",fg="black",bg="white",relief="solid",font=("arial",18,"bold")).pack(fill=BOTH,pady=2,padx=2)
#photo=PhotoImage(file="image1.png")
#label2=Label(window,image=photo).place()
'''
#widgets  with place method
'''
label1=Label(window,text="NetCDF_Plot",fg="black",bg="white",relief="solid",font=("arial",18,"bold")).place(x=200,y=0)
'''



window.mainloop()#the last line which closes the Gui