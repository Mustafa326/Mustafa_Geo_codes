    print "invalid number"
elif len(str(num))!=3:
    print "dail again"
else:
    unit_num=num%10
    #print unit_num
    rem_num=num/10
    ten_num=rem_num%10
   # print ten_num
    hun_num=rem_num/10
   # print hun_num
    switch={1:"one",2:"two",3:"three",4:"Four",5:"five",6:"Six",7:"Seven",8:"Eight",9:"Nine"}
    switch_1={0:'',1:"Ten",2:"twenty",3:"thirty",4:"Forty",5:"fifty",6:"Sixty",7:"Seventy",8:"Eighty",9:"Ninty"}
    switch_2={1:"One Hundred",2:"two Hundred",3:"three Hundred",4:"Four Hundred",5:"five Hundred",6:"Six Hundred",7:"Seven Hundred",8:"Eight Hundred",9:"Nine Hundred"}
    print switch_2[hun_num], "and", switch_1[ten_num],switch[unit_num]

