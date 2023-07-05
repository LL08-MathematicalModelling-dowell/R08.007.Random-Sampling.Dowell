from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.http import JsonResponse
import json
import sys
sys.path.insert(0, '/home/100022/R08.007.Random-Sampling.Dowell/Random_Allocation_API/build')
import Random_Allocation

def get_coordinates(coordinates):
    import numpy as np
    class Point:
        def __init__(self, x, y):
            self.x = x
            self.y = y

    result = np.array([[point.x, point.y] for point in coordinates], dtype=np.float64)
    return result

@csrf_exempt
def FieldRP(request):
    if (request.method=="POST"):
        data=json.loads(request.body)
        points = Random_Allocation.FieldRP(data['side'], data['selection'], data['choice'], data['value'])

        random_allocation_data={
            'input_data':data,
            'listOfPoints':get_coordinates(points).tolist(),
            'success':True,
          }

        return JsonResponse (random_allocation_data)
    else:
        return HttpResponse("Method Not Allowed")

@csrf_exempt
def ExcelRP(request):
    if (request.method=="POST"):
        data=json.loads(request.body)
        points = Random_Allocation.ExcelRP(data['side'], data['selection'])
        random_allocation_data={
            'input_data':data,
            'listOfPoints':get_coordinates(points).tolist(),
            'success':True,
          }
        return JsonResponse (random_allocation_data)
    else:
        return HttpResponse("Method Not Allowed")