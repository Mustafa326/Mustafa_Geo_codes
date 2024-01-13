#Importing the libraries
import os
import sys
import psycopg2
#Estabising a connection with the postgresql database
conn=psycopg2.connect(
    host="localhost",
    database="Testdatabase",
    user="postgres",
    password="1459",
    port="5433"
)

#Creating a cursor inorder to perform actions within the database from this script
cur=conn.cursor()
#to calculate area of polygon
cur.execute("SELECT ST_Area(geom) As sqft from polygon")
value=cur.fetchall()
print("The value is"+"\n",value)
#closing the cursor
cur.close()
#creating another cursor

cur2=conn.cursor()
cur2.execute("SELECT gid,objectid,legend,geom FROM polygon")
row=cur2.fetchall()
#printing specific columns
for i in row:
    print (i[0],i[1],i[2])
cur2.close()
#Closing the connection

# to count total number of feature
cur3=conn.cursor()
cur3.execute("SELECT COUNT(*) FROM polygon")
count=cur3.fetchall()
#printing specific columns
print(count)
cur3.close()
conn.close()