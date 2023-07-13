from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.http import JsonResponse
import json
import numpy as np
import sys
sys.path.insert(0, '/home/100022/R08.007.Random-Sampling.Dowell/Random_Allocation_API/build')
import Random_Allocation

def get_coordinates(coordinates):
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


@csrf_exempt
def createGraph(request):
    if (request.method=="POST"):
        import matplotlib.pyplot as plt
        plt.switch_backend('agg')
        import base64
        import io
        data=json.loads(request.body)
        coordinates = data["listOfPoints"]

        side = data['side']
        fig_size = max(6, np.sqrt(side) / 100)

        plt.figure(figsize=(fig_size, fig_size))

        # plt.figure(figsize=(6,6))
        plotCoordinates = np.array([coordinates])
        x, y = plotCoordinates.T

        ax = plt.gca()

        x_bound = data['side']/2
        y_bound = data['side']/2
        ax.set_xlim(-(x_bound+1),(x_bound+1))
        ax.set_ylim(-(y_bound+1),(y_bound+1))

        major_ticks = np.arange(-(x_bound),(x_bound+1), data['side']/10)
        major_ticks = np.arange(-(y_bound),(y_bound+1), data['side']/10)

        ax.set_xticks(major_ticks)
        ax.set_yticks(major_ticks)

        ax.ticklabel_format(useOffset=False, style='plain')

        ax.spines['top'].set_visible(False)
        ax.spines['left'].set_position('zero')
        ax.spines['right'].set_visible(False)
        ax.spines['bottom'].set_position('zero')

        plt.scatter(x, y)
        plt.plot(x, y)
        plt.quiver(x[:-1], y[:-1], x[1:] - x[:-1], y[1:] - y[:-1], scale_units='xy', angles='xy', scale=1)

        pic_IObytes = io.BytesIO()
        plt.savefig(pic_IObytes, format='svg')
        pic_IObytes.seek(0)
        svgImageBytes = pic_IObytes.getvalue()

        svgImageBase64 = base64.b64encode(svgImageBytes).decode('utf-8')

        plt.close()

        output_data={
            'success':True,
            'graph':svgImageBase64,
          }
        return JsonResponse (output_data)
    else:
        return HttpResponse("Method Not Allowed")