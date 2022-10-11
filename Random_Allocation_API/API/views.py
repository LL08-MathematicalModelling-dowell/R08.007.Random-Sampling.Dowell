from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.http import JsonResponse
import json
import requests
import matplotlib.pyplot as plt
plt.switch_backend('agg')
import numpy as np
import base64
import io
import sys
sys.path.insert(0, '/home/testingapps/R08.007.Random-Sampling.Dowell/Random_Allocation_API/build')
import Random_Allocation

def get_event_id():
  from datetime import datetime
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

def dowell_connection(field):
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
  requests.post( url, headers=headers, json=payload)


def random_allocation_function(data):
  selected_type=data['selected_type']
  if (selected_type=='fieldrp'):
    points = Random_Allocation.FieldRP(data['side'], data['selection'], data['choice'], data['value'])
  if (selected_type=='excelrp'):
    points = Random_Allocation.ExcelRP(data['side'], data['selection'])

  coordinates = []
  for point in points:
      coordinates.append([point.x, point.y])

  plt.figure(figsize=(6,6))
  plotCoordinates = np.array([coordinates])
  x, y = plotCoordinates.T

  ax = plt.gca()
  ax.spines['top'].set_visible(False)
  ax.spines['left'].set_position('zero')
  ax.spines['right'].set_visible(False)
  ax.spines['bottom'].set_position('zero')
  plt.scatter(x,y)
  plt.plot(x,y)
  plt.quiver(x[:-1], y[:-1], x[1:]-x[:-1], y[1:]-y[:-1], scale_units='xy', angles='xy', scale=1)

  pic_IObytes = io.BytesIO()
  plt.savefig(pic_IObytes,  format='png')
  pic_IObytes.seek(0)
  pngImageB64String = "data:image/png;base64,"
  pngImageB64String += base64.b64encode(pic_IObytes.getvalue()).decode('utf8')

  random_allocation_data={
    'eventId':get_event_id(),
    'user_selection':data,
    'listOfPoints':coordinates,
    'image':pngImageB64String,
  }

  dowell_connection(random_allocation_data)
  return random_allocation_data

@csrf_exempt
def random_allocation(request):
    if (request.method=="POST"):
        data=json.loads(request.body)
        random_allocation_data=random_allocation_function(data)
        return JsonResponse (random_allocation_data)
    else:
        return HttpResponse("Method Not Allowed")

def index(request):
    return render(request,'home.html')

@csrf_exempt
def function_type(request):
    if request.method == 'POST':
        selected_type=request.POST['type']
        request.session['selected_type'] = selected_type
        template_url=''
        if selected_type=='fieldrp':
            template_url='field.html'
        if selected_type=='excelrp':
            template_url='excel.html'
        return render(request,template_url)
    else:
        return HttpResponse("Method Not Allowed")

@csrf_exempt
def random_point_allocation_input(request):
    if request.method == 'POST':
        selected_type=request.session['selected_type']
        input_data={}
        input_data['selected_type']=selected_type
        name=''
        if selected_type=='fieldrp':
            name='Field Random Points'
            input_data['side']=int(request.POST['side'])
            input_data['selection']=int(request.POST['selection'])
            input_data['choice']=int(request.POST['choice'])
            input_data['value']=int(request.POST['value'])
        if selected_type=='excelrp':
            name='Excel Random Points'
            input_data['side']=int(request.POST['side'])
            input_data['selection']=int(request.POST['selection'])

        data=random_allocation_function(input_data)
        data['name']=name
        return render(request, "img.html", data)
    else:
        return HttpResponse("Method Not Allowed")
