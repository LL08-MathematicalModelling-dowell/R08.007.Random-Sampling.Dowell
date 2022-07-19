from flask import *
import json
import requests

app = Flask(__name__) 
app.secret_key = 'super secret key'
app.config['SESSION_TYPE'] = 'filesystem'
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.debug = True

@app.route('/')    
def home():  
    return render_template('home.html')

@app.route('/function_type',methods = ['POST'])  
def function_type():
    selected_type=request.form['type']
    session['selected_type']=selected_type
    if selected_type=='fieldrp':
        return render_template('field.html')
    if selected_type=='excelrp':
        return render_template('excel.html')        


@app.route('/random_point_allocation_input',methods=['POST'])
def random_point_allocation_input():
    selected_type=session.get('selected_type',None) 
    data={}   
    data['selected_type']=selected_type
    name=''
    if selected_type=='fieldrp':
        name='Field Random Points'
        data['columns']=int(request.form['columns'])
        data['rows']=int(request.form['rows'])
        data['selection']=int(request.form['selection'])
        data['N']=int(request.form['N'])
    if selected_type=='excelrp':  
        name='Excel Random Points'  
        data['columns']=int(request.form['columns'])
        data['rows']=int(request.form['rows'])
        data['selection']=int(request.form['selection'])
    
    #Calling Random Allocation API
    url = 'http://127.0.0.1:8000/api/random_allocation'
    headers = {'content-type': 'application/json'}
    response = requests.post(url, json =data,headers=headers)
    data=json.loads(response.text)
    print(data)
    image=data['image']
    list1=data['listOfPoints']
    return render_template('img.html',image=image,name=name,list1=list1)

if __name__ == "__main__":
    app.run()
