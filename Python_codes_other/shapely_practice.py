#importing the libraries
from shapely.geometry import Point, LineString, Polygon

#workig with shapely
point1=Point(2.2,3.14)
point2=Point(4.56,6.54)
point3=Point(3.45,6.78)
print("Your point is:",point1.coords)
#geting the xy points
xy=point2.coords.xy#creates an array of coordinates
print(xy)
xcor=point2.x
ycor=point2.y
print(("The x coordinate is %s and the y coordinate is %s")%(xcor,ycor))
#Calculating the distance between the points
distance=point2.distance(point1)
print(("The distance is: %.2f")%(distance)) #in decimal degree

#Creating a LineString which is a list of points
line=LineString([point1,point2])
print("Your line is:",line)

#Printing the length and centroid of the line
length=line.length
centre=line.centroid
print(("The length of your line is %s and the centeroid is %s")%(length,centre))

#Creating a polygon 
poly=Polygon([(2.2,3.14),(4.56,6.54),(3.45,6.78)])
print("your polygon is:",poly)