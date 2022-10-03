# R08.007.Random-Sampling.Dowell


## Calling Random Allocation API

import json

import requests

url = 'http://100022.pythonanywhere.com/api/'

data={

  'selected_type' : 'fieldrp' ,      # Choose 'fieldrp' to use Field Random Point Allocation or 'excelrp' to use Excel Random Point Allocation.
  
  'side' : 20 ,                      # Side of the Canvas.
  
  'selection' : 5 ,                  # Value of selection can be from 1 to 9 in 'fieldrp' and 0 to 'side' in 'excelrp'. 
  
  'choice' : 0 ,                     # Choose '0' to use Number of Points or '1' to use Radius of Circle. (only used in 'fieldrp')
   
  'value': 10,                       # Enter Radius of Circle or Number of Points according to 'choice'. (only used in 'fieldrp') 
  
 }

headers = {'content-type': 'application/json'}

response = requests.post(url, json =data,headers=headers)

output_data=json.loads(response.text)

print(output_data)
