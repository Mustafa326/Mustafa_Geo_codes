List = []
X = int(input("Enter the Number of elements : "))
if type(X) != int:
    print("Please enter in the valid type")
else:
    for i in range(0, X):
        New = int(input())
        List.append(New)
print(List)
S=[]
F=[]
for x in List:
 if x%2==0:
  S.append(x)

else:
 for d in List:
   if d%2!=0:
    F.append(d)

print("Odd list :",F)
print("Even List :", S)
