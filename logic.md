# **LOGIC FOR RANDOM ALLOCATION FUNCTION** 

start

	call dowellrandomgraph()
	
	#Step 1 Input Variables
	
	define selected_type
		if selected_type= "fieldrp"		         Note- "fieldrp"=Field Random Point
			define columns, rows, selection, N
			
			length=columns
			width=rows
			area=length*width                       #calculate area of rectangle
			area_of_circle=area/N                   #calculate area of circle
			radius=sqrt(area_of_circle/pi)          #calculate the radius of circle
			diameter=2*radius                       #calculate the diameter of circle
			
			Create a Canvas of Dimensions length x width
			
			define list1    	                #For Storing Co-ordinates
			
			Choices for Starting Point/ First Co-ordinate :

			if(selection==1):			Start from Center
			  list1=[[0,0]]

			if(selection==2):			Start from top left 
			  list1=[[-length/2,width/2]]

			if(selection==3):			Start from extreme left 
			  list1=[[-length/2,0]]

			if(selection==4):			Start from bottom left 
			  list1=[[-length/2,-width/2]]

			if(selection==5):			Start from the bottom 
			  list1=[[0,-width/2]]

			if(selection==6):			Start from bottom right 
			  list1=[[length/2,-width/2]]

			if(selection==7):			Start from extreme right
			  list1=[[length/2,0]]

			if(selection==8):			Start from top right
			  list1=[[length/2,width/2]]

			if(selection==9):			Start from the top
			  list1=[[0,width/2]]
			
			
			

		
		if selected_type= "excelrp"                      Note- "excelrp"=Excel Random Point
		
			define columns, rows, selection
			length=columns
			width=rows
			N=length
			area=length*width                         #calculate area of rectangle
			area_of_circle=area/N                     #calculate area of circle
			radius=sqrt(area_of_circle/pi)            #calculate the radius of circle
			diameter=2*radius                         #calculate the diameter of circle
	
