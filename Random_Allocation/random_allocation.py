import numpy as np
import math
from math import sqrt, sin, cos, pi, floor, ceil
import pandas as pd
import matplotlib.pyplot as plt
import random

def random_point_allocation(data):
  selected_type=data['selected_type']
  rows=data['rows']
  columns=data['columns']
  selection=data['selection']
  
  def FieldRP(columns, rows, selection, data):
      N=data['N']

      length= columns
      width= rows
      area=length*width                                 #calculate area of rectangle
      area_of_circle=area/N                             #calculate area of circle
      radius=sqrt(area_of_circle/pi)            #calculate the radius of circle
      diameter=2*radius
      coor=[[0,0],[-10,10],[-10,0],[-10,-10],[0,-10],[10,-10],[10,0],[10,10],[0,10]]
      data_coor = np.array([coor])
      x_coor, y_coor = data_coor.T
      n_coor=list(range(1,10))
      fig_coor, ax_coor = plt.subplots()
      ax_coor.scatter(x_coor, y_coor)
      for i, txt in enumerate(n_coor):
          ax_coor.annotate(txt, (x_coor[i], y_coor[i]),fontsize=15)
      #1st co-ordinate
      if(selection==1):
          list1=[[0,0]]

      if(selection==2):
          list1=[[-length/2,width/2]]

      if(selection==3):
          list1=[[-length/2,0]]

      if(selection==4):
          list1=[[-length/2,-width/2]]

      if(selection==5):
          list1=[[0,-width/2]]

      if(selection==6):
          list1=[[length/2,-width/2]]

      if(selection==7):
          list1=[[length/2,0]]

      if(selection==8):
          list1=[[length/2,width/2]]

      if(selection==9):
          list1=[[0,width/2]]

      L=[] #List for collecting 12 points on circumference
      i=0.0
      while i<=2*pi:
          [a,b]=[diameter*cos(i),diameter*sin(i)]
          select1= [round(num) for num in [a,b]]
          L.append(select1)
          i+=pi/6
      #Removing duplicate points
      X = [] 
      for i in L: 
          if i not in X: 
              X.append(i)

      select=list1[0]
      #Getting remaining N-1 co-ordinates
      while len(list1)<N: #Loop will stop when it has N random unique co-ordinates
          X1=[]
          for i in range(len(X)):
              X1.append([x + y for x, y in zip(X[i], select)])
              X2=[] #Applying range & removing outliers
              for [a,b] in X1:
                  if a >=-length/2 and b >=-width/2 and a<=length/2 and b<=width/2:
                      X2.append([a,b])
              X1 = X2
          select=random.choice(X1) #Choosing N random points, one loop at a time
          list1.append(select)
          Z = [] #Removing duplicates
          for i in list1: 
              if i not in Z: 
                  Z.append(i)
                  list1 = Z
      print("After",N,"th run, the list of points is:",list1)
      #Plotting points
      plt.figure(figsize=(6,6))
      data = np.array([list1])
      x, y = data.T
      plt.scatter(x,y) #Co-ordinates
      plt.plot(x,y) #Joins Co-ordinates using a line
      plt.show()
      #Annotation
      n=list(range(1,N+1))
      fig, ax = plt.subplots()
      ax.scatter(x, y)
      for i, txt in enumerate(n):
          ax.annotate(txt, (x[i], y[i]))        
      

  def ExcelRP(columns, rows, selection):

    length= columns
    width= rows
    # selection= selection
    N=length
    area=length*width                                 #calculate area of rectangle
    area_of_circle=area/N                             #calculate area of circle
    radius=sqrt(area_of_circle/pi)            #calculate the radius of circle
    diameter=2*radius


    # Getting co-ordinates of points on the larger circle
    list1=[]
    X = [] 
    if(selection==0):
      i=1
    else:
      i=selection
    for j in np.arange(1,(width)+1):
      X.append([i,j])
    select=random.choice(X)
    select= [round(num) for num in select] #Choosing 1st co=ordinate randomly
    list1.append(select)    #1st Co-ordinate
  
    i=0.0
    L=[] #List for collecting 360 points on circle
    while i<=2*pi:
      [a,b]=[diameter*cos(i),diameter*sin(i)]
      select1=[round(a),ceil(b)]
      select2=[round(a),floor(b)]
      L.append(select1)
      L.append(select2)
      i+=pi/180
  
    #Removing duplicate points
    X = [] 
    for i in L:
      if i not in X: 
        X.append(i)
  
    #Getting remaining N-1 co-ordinates
  
    if(selection==0): #For ordered selection
      for k in range(N-1): #For N random unique co-ordinates
        X1=[]
        c1=[]
        for i in range(len(X)):
          X1.append([x + y for x, y in zip(X[i], select)])
          a1=X1[i][0]
          if(a1==k+2):
            c1.append(X1[i])
          X2=[] #Applying range & removing outliers
          for [a,b] in c1:
            if a >=1 and b >=1 and a<=length and b<=width:
              X2.append([a,b])
        select=random.choice(X2) #Choosing N random points, one loop at a time
        list1.append(select)
      print(list1)
  
    else: #For random selection
      column_nos=[selection]
      columns=[item for item in range(1, N+1)]
      select_init=select
      while (column_nos!=columns):
        X1=[]
        for i in range(len(X)):
          X1.append([x+y for x,y in zip(X[i],select_init)])
          X2=[] #Applying range & removing outliers
          for [a,b] in X1:
            if a >=1 and b >=1 and a<=length and b<=width:
              X2.append([a,b])
          X1=X2
        select_init=random.choice(X1)
        if select_init[0] not in column_nos:
          column_nos.append(select_init[0])
          select=select_init
          list1.append(select)
        column_nos.sort()
      print(list1)


    #Plotting points
    plt.figure(figsize=(6,6))
    data = np.array([list1])
    x, y = data.T
    plt.scatter(x,y) #Co-ordinates
    plt.plot(x,y) #Joins Co-ordinates using a line
    plt.show()
    #Annotation
    n=list(range(1,N+1))
    fig, ax = plt.subplots()
    ax.scatter(x, y)
    for i, txt in enumerate(n):
      ax.annotate(txt, (x[i], y[i]))

    

  if (selected_type=='fieldrp'):
    FieldRP(columns, rows, selection,data)
  if (selected_type=='excelrp'):
    ExcelRP(columns, rows, selection)
    
