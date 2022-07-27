# R08.007.Random-Sampling.Dowell


## Calling Random Allocation API

import json

import requests

url = 'http://100022.pythonanywhere.com/api/'

data={

  'selected_type' : 'fieldrp' ,      # Choose 'fieldrp' for Field Random Point Allocation or 'excelrp' for Excel Random Point Allocation
  
  'columns' : 20 ,
  
  'rows' : 20 , 
  
  'selection' : 5 ,
 
  'N' : 5 ,                          # For 'fieldrp' set a value of 'N' to be any integer, For 'excelrp' set 'N':5 (N is not used in 'excelrp')
 
 }

headers = {'content-type': 'application/json'}

response = requests.post(url, json =data,headers=headers)

output_data=json.loads(response.text)

print(output_data)
