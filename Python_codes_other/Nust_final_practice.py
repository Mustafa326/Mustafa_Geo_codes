#Lab 1 
import sys
import os
import math
#1.2
"""
radius=int(input("Please Enter the radius you want"))
print(("The radius you provided is %s")%(radius))
pie=math.pi
print("The value of pi is:",pie)
area=(pie)*(math.pow(radius,2))
print(("The circle of radius %s has the area %s")%(radius,area))
"""
#1.3
"""
import Nust_final_practice
"""
#1.4
"""
a=float(input("Please enter your first number:"))
b=float(input("Please enter your second number:"))
summation=a+b
subtraction=b-a
print(("The summation of numbers %s and %s is %.2f")%(a,b,summation))
print(("The subtraction of numbers %s and %s is %.2f")%(b,a,subtraction))
"""
#1.8
"""
name=input("Please enter your name")
number1=int(input("Please enter the starting point value"))
number2=int(input("Please enter the ending point value"))
#syed mustafa haider
ans=name[number1:number2]
ans2=name[:-2]#it would count till -6 and then it would exclude that character
ans3=name[-6:]#it would count backwards till -6 and then print that -6 character
print(ans2)
print(ans)
"""
#LAB 2--------------------------------------------------------------------------------------------------------------------------------------
import sys
import os
import math
#Try and catch or except method
"""
try:
    radius=float(input("Please Enter the radius you want"))
    print(("The radius you provided is %s")%(radius))
    type1=type(radius)
    area=(math.pi)*(math.pow(radius,2))
    print(("The circle of radius %s has the area %s")%(radius,area))
except ValueError:
         print("Oops!  That was no valid number.  Try again...")
"""
#Control flow statements if,else
"""
def functionmyname():
    mark=float(input("Please enter a mark"))
    if mark < 40:
        print ("fail")
    elif mark < 50:
        print ("pass")
    elif mark < 70:
        print ("credit")
    else:
        print ("distinction")
    ans=input("Do you want to try again")
    if ans=="y":
        functionmyname()
    else:
        print("Thank you")
functionmyname()
"""
#Concatination
"""
first_name=input("Please enter your first name")
middle_name=input("Please enter your middle name")
last_name=input("Please enter your last name")
print(("Your full name is %s %s %s")%(first_name,middle_name,last_name))
name=first_name+middle_name+last_name
print(name)
print("Your full name is:"," ",first_name+" "+middle_name+" "+last_name)
"""
#2.6 writing and printing addresses
"""
cityname=input("Please enter the name of the city")
streetname=input("Pleasae enter the name of the street")
houseno=input("Please enter the house number")
name=input("Please enter your name")
print(name+"\n"+cityname+"\n"+streetname+"\n"+houseno)
"""
#2.7 And operator
"""
name=input("Please enter your name here")
password=int(input("Please enter your password"))
if name=="Mustafa" and password==1459:
    print("Welcome")
else:
    print("You are not welcomed")
"""
#not operator with writing file 
"""
file=open("mustafa.txt",'w')
file.write("This is the result")
file.close()
f=open("mustafa23.txt",'a')
while 1:
    number=int(input("enter a number between 1 and 10: "))
    if not 1 <= number <= 10:
        print ("out of range, try again")
        break
    else:
        print (("you entered %d") % (number))
        f.write(str(number))
f.close()
"""
#address file
"""
cityname=input("Please enter the name of the city")
streetname=input("Pleasae enter the name of the street")
houseno=input("Please enter the house number")
name=input("Please enter your name")
file=open("mustafaadress.txt",'w')
file.write(name+"\n"+cityname+"\n"+streetname+"\n"+houseno)
file.close()
f=open("mustafaadress.txt",'a')
f.write("03361037005")
f.close()
"""
#LAB3------------------------------------------------------------------------------------------------------------------------------------------
#tupple
"""
wheels=int(input("How many wheels does a Rakshaw have?:"))
flag=input("What is the color of Pakistan's flag?:")
print ('to answer 2 and red you would enter (2,"red")')
ans=(wheels,flag)
print (ans)
attempt=tuple(ans)
print(attempt)
correct=(3,'green')
if attempt==correct:
    print ("all answers are right")
else:
    print ("one or more wrong answer")
name,city,adress=("syed mustafa haider","Islamabad","house9")
print(("Your name is %s"+"\n"+"Your city is %s"+"\n"+"Your house is %s")%(name,city,adress))
"""
#List operations
"""
List=[]
List2=[2,3,4]
number=4
for i in range(0,number):
    new=int(input())
    List.append(new)
print("Your List is:",List)
List.append(11)
Lista=List
print(Lista)
print("The new list is",List)
List1=[13,17,19]
List2=List+List1
print("The list after addition is:",List2)
print(len(List2))
print(len(List1))
List.append(List1)
print (List)
del List[5]
print(List)
print(len(List))
print(List[5])
print(List[-1])
a=List[2:4]
print (a[1])
"""
#Range function
"""
for i in range(10,0,-1):
    print (i)
"""
#table
"""
a=int(input("Whos table do you want:"))
number=int(input("Up to what range do you want to multiply:"))
for z in range(0,number):
    s=a*z
    print (("%s X %s"+" "+"="+"%s")%(a,z,s))
"""
#For factors
"""
number=int(input("Please enter your factor number:"))
c=1
for b in range(1,number+1):
    c*=b
    print (c)
"""
#For loops with list
"""
List=["the","dead","parrot","sketch"]
for i in List:
    print (i.title(),len(i))
cap=0
for k in range(0,len(List)):
    #print(List[k][0:cap])
    cap+=1
    print(List[k][0:cap].upper()+List[k][cap:])
"""
#Even and odd numbers
"""
for i in range(0,10):
    if i%2==0:
        print(i,"even")
"""
#Lab4-----------------------------------------------------------------------------------------------------------------------------------------
#Local and global variable
"""
def grunt():
    print ("growl")
def squark():
    print ("squeak")
    print ("honk")
    print ("howl")
squark()
print ("beep")
grunt()
squark()
"""
#function that calculates percentages
"""
def percent():
    N=int(input("Please enter the number of items"))
    total=int(input("Please enter the total number"))
    per=(N/total) * 100
    #return per
    val="%"
    print(round(per),val)
percent()
"""
#The same function but with global value
"""
N2=int(input("Please enter the number of items"))
total2=int(input("Please enter the total number"))
def percent2(a,b):
    per=(a/b) * 100
    #return per
    val="%"
    print(round(per),val)
percent2(N2,total2)
"""
#The sam percent function but with return
"""
val="%"
def percent3():
    N3=int(input("Please enter the number of items"))
    total3=int(input("Please enter the total number"))
    per=(N3/total3) * 100
    return round(per)
print(percent3(),val) # in case if their is no return then it would result in the value of none
"""
#function that calculates squareroot of a number 
"""
N=int(input("Please enter the number you want:"))
def squareroot(a):
    ans=math.sqrt(N)
    return ans
print(squareroot(N))
"""
#Function for calculating days in month:
"""
number_of_month=int(input("Please enter the number of month"))
year=int(input("Enter the year:"))
def is_leap():
    return (year%2==0) and (year%400==0) or (year%100!=0)
days1=31
days2=30
daysfeb=28
daysfeb2=29
month_31=["January","March","May","July","August","October","December"]
month_30=["April","June","September","November"]
def month_name():
    if number_of_month==1:
        return "January"
    elif number_of_month==2:
        return "Febuary"
    elif number_of_month==3:
        return "March"
    elif number_of_month==4:
        return "April"
    elif number_of_month==5:
        return "May"
    elif number_of_month==6:
        return "June"
    elif number_of_month==7:
        return "July"
    elif number_of_month==8:
        return "August"
    elif number_of_month==9:
        return "September"
    elif number_of_month==10:
        return "October"
    elif number_of_month==11:
        return "November"
    elif number_of_month==12:
        return "December"

def days_in_months():
    if number_of_month==1:
        print (month_name(),(("has %s days")%(days1)))
    elif number_of_month==2 and is_leap()==True:
        print (month_name(),(("has %s days")%(daysfeb2)))
    elif number_of_month==2 and is_leap()==False:
        print (month_name(),(("has %s days")%(daysfeb)))
    elif number_of_month==3:
        print (month_name(),(("has %s days")%(days1)))
    elif number_of_month==4:
        print (month_name(),(("has %s days")%(days2)))
    elif number_of_month==5:
        print (month_name(),(("has %s days")%(days1)))
    elif number_of_month==6:
        print (month_name(),(("has %s days")%(days2)))
    elif number_of_month==7:
        print (month_name(),(("has %s days")%(days1)))
    elif number_of_month==8:
        print (month_name(),(("has %s days")%(days1)))
    elif number_of_month==9:
        print (month_name(),(("has %s days")%(days2)))
    elif number_of_month==10:
        print (month_name(),(("has %s days")%(days1)))
    elif number_of_month==11:
        print (month_name(),(("has %s days")%(days2)))
    elif number_of_month==12:
        print (month_name(),(("has %s days")%(days1)))
days_in_months()
"""
#initdiv() function
"""
divedend=int(input("Please enter the divedend"))
devisor=int(input("Please enter the devisor"))
def initdiv(a,b):
    ans=divedend//devisor
    ans1=divedend%devisor
    s=(ans,ans1)
    return tuple(s)
print (initdiv(divedend,devisor))
"""
#Quiz questions----------------------------------------------------------------------------------------------- 
#quiz1
"""
file=open("name.txt",'w')
first_name="Syed"
Middle_name="Mustafa"
last_name="Haider"
file.write(first_name+" "+Middle_name+" "+last_name)
file.close()
f=open("name.txt",'r')
first=f.readline()
print(("Mr %s")%(first))
"""
#Quiz 2
#prime an even numbers
"""
number=int(input("Please enter your number:"))
if number > 1 and number%2==0:
    for i in range(2, number):
        if (number % i) == 0:
            print(number, "is not a prime number and is even")
            break
    else:
        print(number, "is a prime number and even")
elif number>1 and number%2!=0:
    for a in range(2,number):
        if number/a==0:
            print(number,"is not a prime number but it is odd")
            break
        else:
            print(number,"The number is prime and it is odd")
            break
"""
#Dictionary
dict={"samsung":"S9,","Apple":"Iphone8","Nokia":"Lumia"}
print("Your dictionary is:",dict)
print(dict["samsung"][2:3])#to print the value of a key
for i in dict:
    print(i,dict[i])#TO get the keys "i" and get values for each key dict[i]
print(dict.items())# to get tuppels for the key and the item for the key
