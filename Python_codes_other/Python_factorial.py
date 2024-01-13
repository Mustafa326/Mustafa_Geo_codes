import os
def mustafa():
    num=int(input("Enter any number between 1 to 999\t"))
    str1=str(num)
    if type(num)!=int:
        print ("invalid number")
    if len(str1)>3:
        print ("dail again")
    else:
        unit_num=num%10
        U=round(unit_num)
        #print unit_num
        rem_num=num/10
        ten_num=rem_num%10
    # print ten_num
        T=round(ten_num)
        hun_num=rem_num/10
    # print hun_num
        H=round(hun_num)
        switch={0:'',1:"one",2:"two",3:"three",4:"Four",5:"five",6:"Six",7:"Seven",8:"Eight",9:"Nine"}
        switch_1={0:'',1:"Ten",2:"twenty",3:"thirty",4:"Forty",5:"fifty",6:"Sixty",7:"Seventy",8:"Eighty",9:"Ninty"}
        switch_2={0:'',1:"One Hundred",2:"two Hundred",3:"three Hundred",4:"Four Hundred",5:"five Hundred",6:"Six Hundred",7:"Seven Hundred",8:"Eight Hundred",9:"Nine Hundred"}
        print(switch_2[H], "and", switch_1[T],switch[U])
mustafa()
F=input("Do you want to try again")
if F=="yes":
    mustafa()
else:
    print("Thank you")