# R08.007.Random-Sampling.Dowell


## Calling Random Allocation Function


import json
import requests

url = 'http://127.0.0.1:8000/api/random_allocation'

data={
  'selected_type':'fieldrp' ,   (Choose 'fieldrp' for Field Random Point Allocation or 'excelrp' for Excel Random Point Allocation)
  'columns':20,
  'rows':20,
  'selection':5,
  'N':5,
  
  
  }


headers = {'content-type': 'application/json'}
response = requests.post(url, json =data,headers=headers)
data=json.loads(response.text)
print(data)
