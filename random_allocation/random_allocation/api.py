from ninja import NinjaAPI
import json
import requests

api = NinjaAPI()

@api.post("/random_allocation")
def post_operation(request):
  import numpy as np
  import math
  from math import sqrt, sin, cos, pi, floor, ceil
  import matplotlib.pyplot as plt
  import random
  import base64
  import io 

  # Calling eventId API
  def get_event_id(): 
    from datetime import datetime
    import requests
    dd=datetime.now()
    time=dd.strftime("%d:%m:%Y,%H:%M:%S")
    url="https://100003.pythonanywhere.com/event_creation"
    data={
            "platformcode":"FB" ,
            "citycode":"101",
            "daycode":"0",
            "dbcode":"pfm" ,
            "ip_address":"192.168.0.41",
            "login_id":"lav",
            "session_id":"new",
            "processcode":"1",
            "regional_time":time,
            "dowell_time":time,
            "location":"22446576",
            "objectcode":"1",
            "instancecode":"100051",
            "context":"afdafa ",
            "document_id":"3004",
            "rules":"some rules",
            "status":"work",
            "data_type": "learn",
            "purpose_of_usage": "add",
            "colour":"color value",
            "hashtags":"hash tag alue",
            "mentions":"mentions value",
            "emojis":"emojis",
        }
    r=requests.post(url,json=data)
    return r.text

  # Calling Dowell Connection 
  def dowell_connection(field):
    import json
    import requests
    url = "http://100002.pythonanywhere.com/" 
    payload = {
        "cluster": "license",
        "database": "license",
        "collection": "licenses",
        "document": "licenses",
        "team_member_ID": "689044433",
        "function_ID": "ABCDE",
        "command":"insert",
        "field":field,
        "update_field": {
            "order_nos": 21
        },
        "platform": "bangalore"
        }
    headers = {
        'Content-Type': 'application/json'
        }
    response = requests.post( url, headers=headers, json=payload)

  #Random Allocation Function
  data=json.loads(request.body)
  selected_type=data['selected_type']
  rows=data['rows']
  columns=data['columns']
  selection=data['selection']

  # Field Random Points Function
  def FieldRP(columns, rows, selection, data):
      N=data['N']
      length= columns
      width= rows
      area=length*width                         #calculate area of rectangle
      area_of_circle=area/N                     #calculate area of circle
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

      #Plotting points
      plt.figure(figsize=(6,6))
      data = np.array([list1])
      x, y = data.T
      plt.scatter(x,y) #Co-ordinates
      plt.plot(x,y) #Joins Co-ordinates using a line
      
      #Converting Plot into Base64 String
      pic_IObytes = io.BytesIO()
      plt.savefig(pic_IObytes,  format='png')
      pic_IObytes.seek(0)
      pngImageB64String = "data:image/png;base64,"
      pngImageB64String += base64.b64encode(pic_IObytes.getvalue()).decode('utf8')
      
      #Annotation
      n=list(range(1,N+1))
      fig, ax = plt.subplots()
      ax.scatter(x, y)
      for i, txt in enumerate(n):
          ax.annotate(txt, (x[i], y[i]))    
      
      output={
        'list1':list1,
        'image':pngImageB64String
      }        
      return(output)

  # Field Random Points Function
  def ExcelRP(columns, rows, selection):
    length= columns
    width= rows
    # selection= selection
    N=length
    area=length*width                         #calculate area of rectangle
    area_of_circle=area/N                     #calculate area of circle
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

    #Plotting points
    plt.figure(figsize=(6,6))
    data = np.array([list1])
    x, y = data.T
    plt.scatter(x,y) #Co-ordinates
    plt.plot(x,y) #Joins Co-ordinates using a line

    #Converting Plot into Base64 String
    pic_IObytes = io.BytesIO()
    plt.savefig(pic_IObytes,  format='png')
    pic_IObytes.seek(0)
    pngImageB64String = "data:image/png;base64,"
    pngImageB64String += base64.b64encode(pic_IObytes.getvalue()).decode('utf8')
    
    #Annotation
    n=list(range(1,N+1))
    fig, ax = plt.subplots()
    ax.scatter(x, y)
    for i, txt in enumerate(n):
      ax.annotate(txt, (x[i], y[i]))

    output={
      'list1':list1,
      'image':pngImageB64String
      }        
    return(output)
    
  if (selected_type=='fieldrp'):
    output=FieldRP(columns, rows, selection,data)
  if (selected_type=='excelrp'):
    output=ExcelRP(columns, rows, selection)
  random_allocation_data={
    'eventId':get_event_id(),
    'user_selection':data,
    'listOfPoints':output['list1'],
    'image':output['image']
  }  
  dowell_connection(random_allocation_data)
  return (random_allocation_data)
