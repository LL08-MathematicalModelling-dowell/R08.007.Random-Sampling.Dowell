from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
import requests

def index(request):
    return render(request,'home.html')

@csrf_exempt
def function_type(request):
    if request.method == 'POST':
        selected_type=request.POST['type']
        request.session['selected_type'] = selected_type
        if selected_type=='fieldrp':
            return render(request,'field.html')
        if selected_type=='excelrp':
            return render(request,'excel.html') 

@csrf_exempt
def random_point_allocation_input(request):
    if request.method == 'POST':
        selected_type=request.session['selected_type']
        input_data={}   
        input_data['selected_type']=selected_type
        name=''
        if selected_type=='fieldrp':
            name='Field Random Points'
            input_data['columns']=int(request.POST['columns'])
            input_data['rows']=int(request.POST['rows'])
            input_data['selection']=int(request.POST['selection'])
            input_data['N']=int(request.POST['N'])
        if selected_type=='excelrp':  
            name='Excel Random Points'  
            input_data['columns']=int(request.POST['columns'])
            input_data['rows']=int(request.POST['rows'])
            input_data['selection']=int(request.POST['selection'])

        #Calling Random Allocation API
        url = 'http://100022.pythonanywhere.com/api/random_allocation'
        headers = {'content-type': 'application/json'}
        response = requests.post(url, json =input_data, headers=headers)
        data=json.loads(response.text)
        data['name']=name         
        return render(request, "img.html", data)
