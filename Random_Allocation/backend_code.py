from flask import *
from random_allocation import random_point_allocation
app = Flask(__name__) 

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
    list1=random_point_allocation(data) 
    return render_template('img.html',url='static/images/new_plot.png',list1=list1,name=name)

if __name__ == "__main__":
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'
    app.debug = True
    app.run()
