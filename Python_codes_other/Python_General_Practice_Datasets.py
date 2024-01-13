#List_Data type codes
'''
#Creating a user defined list from input function
List2=[input()]

#Creating a User list through loops

List = []
print("Your list is:",List2)
X =int(input("Enter the length of your list:"))
for i in range(0, X):
    New = int(input())
    List.append(New)
print("First-List",List)

#List operation
List=[1,2,3,4]
print(List)
List2=[1,2,3]
print(List2)
List2a=[1,2,3,5]
print(List2a)
List3=["mustafa",1,"salar"]
print(List3)
List4=[[1,2,3],[4,5,6],[7,8,9]]
print(List4)

#fetching elements from within a list
print(List[3])
print(List2a[0:3:2])
print(List3[1])
print(List4[1][2])
#Editing the list through append and extend
L1=[1, 2, 3, 4, [2, 3, 4, 5, 6]]
print("Your list is:",L1)
print(L1[4][1:4])
L1.append([1,2,3])
print(L1)
#for the case of extend
L2=[1, 2, 3, 4, [2, 3, 4, 5, 6,7]]
print("Your list is:",L2)
print(L2[4][1:5])
#print(L2.extend(1,2,3)) # this is wrong as it only takes one argument
print(L2.extend([4,5,6]))
#List concatination
Lista=[x*x for x in range(11)]#This is going to be a List containing square of numbers till 10
print("Your list is as follows:",Lista)
Listd=[5,6,7,8]
print("Your list is:",Listd)
Listb=[1,2,3,4]
print("Your list is:",Listb)
Listc=[Listd[i]+Listb[i] for i in range(len(Listd))]
print("The sum of list elemements is:",Listc)
#List compression for if statements
Liste=[x for x in range(10) if x%3==0]
print("Your List is:",Liste)
'''
#Tupple_Data type
'''
tupp=(1,2,3,4)
tuppl=(5,6,7,8)
print("Your tupple is:",tupp)
tupp1=(1,2,3,4,5,6,7,8,9,(1,2,3,4,5))
print("Your tupple is as follows:",tupp1)
tupp2=("mustafa",1,2,3,"abdal",5,6,7,"ffd")
print("Your hetrogenous tuple is:",tupp2)
#Fetching elements from a tupple
print("The elements fetched from tupp1 are:",tupp1[2:5])
print("The elements fetched from tupp1 are:",tupp1[2:5:2])
print("The elements fetched from tupp1 are:",tupp1[9][1:4:1])
#Operators on the tupples
print(tupp>tuppl)
print(tuppl>tupp)
'''
#Dictionary_Data type codes
'''
dictionary={"musta":1,"lala":2}
print("your dictionary is:",dictionary)
dictionary2={1:"Lab,Mama,Gonna",2:"Lab,dada,Gonna",3:"Lab,nana,Gonna"}
print("your dictionary is:",dictionary2)

#Fetching elements from the dictionaries with respect to their keys
print(dictionary2[1][0])
print(dictionary2[1][0:3])
#Edditing in a dictionary
dictionary2[1]="Dada"
print("Your new dictionary is:",dictionary2)
#Adding into the dictionary
dictionary2['4']=['myname is adam']
'''
#Try catch method
'''
d=int(input("Enter the number you want"))
f=0
try:
    d/f
except ZeroDivisionError:
    print("This number cannot be divided by zero")
'''
#Python functions
'''
#function to calculate the sum
def sumation(*args):
    d=0
    z=[]
    for i in args:
        d+=i
        z.append(d)
    print(d)
    print(z)
    #return(d) #this would not give "None" in out put
print("The summ is",sumation(1,2,3,4))
#function to calculate cat_n_times
X=input("Enter the word")
C=int(input("The number of times you want to concatinate it"))
def cat_c_times(X,C):
    return(X*C)
print(cat_c_times(X,C))
#Function that checks wether the word you entered is a palindrom
F=input("Enter the word you want to Enter")
def Palindrome(F):
    if F[::-1]==F[::]:
        return("Your word is a palindrome")
    else:
        print("your word is not a palindrome")
print(Palindrome(F))
#Function to calculate factorial with for loop
M=int(input("Enter the number whos factorial you want to calcuate"))
def factorial(M):
    k=1
    for i in range(1,M+1):
        k*=i
    return(k)
print(factorial(3))
'''
#Assignment questions
'''
L=[]
B=[]
M=[]
O=[]
E=[]
X=int(input("Enter the length of the list"))
F=int(input("Enter the length of the second list"))
for i in range(X):
    new=int(input())
    L.append(new)
print("The first list is:",L)
for j in range(F):
    new2=int(input())
    B.append(new2)
print("The first list is:",B)
if X!=F:
    print("For list multiplication the length of the list should be same")
for k in B:
    for n in L:
        M.append(k*n)
print("Your new list is:",M)
for ele in M:
    if ele%2==0:
        E.append(ele)
    else:
        O.append(ele)
print("The Even list is:",E)
print("The Odd list is:",O)
S=[L[o]+B[o] for o in range(len(L)) if X==F]
print("The summation list is:",S)
'''
mat=[[10,22,0],[35,45,0],[3,0,0]]
print("your matrix is:",mat)
#if len (mat[0])==3 and len(mat)==3:
for i in range (len(mat)):
    for j in range(len(mat[0])):
        mat[i][j]=mat[j][i]
print("The trnsverse is:",mat)






