#string and general operations
'''
B="Mustafa Haider"
D=B.split()# it splits a string into a list
print("The element on the second index is:",B[2])#fetching elements 
print("Your split is:",D)
C=B.replace("stafa","jtaba")#it is used to replace a string with another
print("Your new string is:",C)
E=B.isdigit()#used to check wether the string is only composed of digits
print(E)
F=B.upper()
print("Your string in upper characters is:",F)
C=B.capitalize()
print("Your capatalized string is:",C)
X=B.center(123,'d')# it is used to padd the strings
print("Your padded string is:",X)
#string to integer conversion
G=B.isspace()#Check for whitespaced characters
print(G)
N=B.rfind("a")
N1=B.rfind('H')
N2=B.rfind('f')
print("The index of the character you found is:",N)
print("The index of the character you found is:",N1)
print("The index of the character you found is:",N2)
x=123
print("Your type is:",type(x))
y=str(x)
print(y,"The type of y is:",type(y))
'''
#Control flow statements
#for odd numbers
'''
x=0
for x in range(0,10,2):
    x+=1
    print("Your odd number is",x)
print("The last number is:",x)
#for break example
'''
'''
g=0
for g in range(5):
    if g==3:
     break
    print(g)
'''
#To print the Elements
'''
s="MustafaHaiderBokhari"
for i in s:
    print(i)
'''
#To print the entire string with respect to the number of elements within the string
'''
s="MustafaHaiderBokhari"
for i in s:
    print("lala",s)
'''
#To print the indices
'''
for i in range(len(s)):
    print(i)
'''
#For testing the continew statement
'''
j=0
for i in range(5):
    if j==2:
        continue
    print("Hello world")
'''
#while loop
'''
d=12
while d<20:
    if d==14:
        print("You are correct")
        break
    else:
        print("wrong")
    d+=1
'''
#printing elements till 10
'''
n=0
while n<11:
    print(n)
    n+=1
'''
#for loops
x=0
for x in range(10):
    if x%3==0:
        print(x)
    else:
        pass
