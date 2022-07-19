# R08.007.Random-Sampling.Dowell


## Calling Random Allocation API

import json

import requests

url = 'http://100022.pythonanywhere.com/api/random_allocation'

data={

  'selected_type' : 'fieldrp' ,      #Choose 'fieldrp' for Field Random Point Allocation or 'excelrp' for Excel Random Point Allocation
  
  'columns' : 20 ,
  
  'rows' : 20 , 
  
  'selection' : 5 ,
 
  'N' : 5 ,
 
 }

headers = {'content-type': 'application/json'}

response = requests.post(url, json =data,headers=headers)

output_data=json.loads(response.text)

print(output_data)
