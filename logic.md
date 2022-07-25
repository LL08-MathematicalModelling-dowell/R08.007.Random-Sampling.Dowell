# **LOGIC FOR RANDOM ALLOCATION FUNCTION** 

start

	call dowellrandomgraph()
	
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
			
			
			
			CenterOfCircle = list1[0]
			for i in range 0 to N
				draw 'circle1' (of Radius = radius) taking center = CenterOfCircle
				Now, taking a random point on the circumference of the 'circle1' as the center draw another 'circle2' of Radius= 2 * radius
				Let center of circle2 be [x,y]
				CenterOfCircle = [x,y]
				list1.append[CenterOfCircle]
						
			Plot the co-ordinates stored in list1 using Matplotlib and store it in a variable 'plot'
			Join the Points Plotted
			return (list1, plot)		
				
		if selected_type= "excelrp"                      Note- "excelrp"=Excel Random Point
		
			define columns, rows, selection
			length=columns
			width=rows
			N=length
			area=length*width                         #calculate area of rectangle
			area_of_circle=area/N                     #calculate area of circle
			radius=sqrt(area_of_circle/pi)            #calculate the radius of circle
			diameter=2*radius                         #calculate the diameter of circle
								  
			if selection is 0:			  
				sequential/ordered selection      
				i=1				  
			if selection other than 0:		  
				random selection		  
				i=selection			  
								  
			Define an array X			  #Array for storing co-ordinates
			for j in range 1 to width+1:	
				X.append([i,j]) 									
			Select a random co-ordinate from the coordinates stored in X	call it 'first_co-ordinate'
			CenterOfCircle = 'first_co-ordinate'
			Taking center of circle as 'CenterOfCircle' and radius as radius draw a circle 'circle1'
			Store all the point on the circumference of the 'circle1' in an array called L and remove duplicate co-ordinates
			
			define an array list1
			
			if selection is 0:
				Take a random point [x1,y1] from L 
				center = [x1,y1] 
				for k in range N-1
					Draw a circle 'circle2' of Radius= radius and 'center' as the center
					Take a random point on the circumference of the circle 'circle2' as the center and draw another circle 'circle3' of 
					Radius = 2 * radius
					Let a random point on the circumference of 'circle3' be [x,y]
					center = [x,y]
					list1.append(center)
			if selection other than 0:
				Take a random point [x1,y1] from L 
				center = [x1,y1] 
				for k in range N+1
					Draw a circle 'circle2' of Radius= radius and 'center' as the center
					Take a random point on the circumference of the circle 'circle2' as the center and draw another circle 'circle3' of 
					Radius = 2 * radius
					Let a random point on the circumference of 'circle3' be [x,y]
					center = [x,y]
					list1.append(center)

			Plot the co-ordinates stored in list1 using Matplotlib and store it in a variable 'plot'
			Join the Points Plotted
			return (list1, plot)
			
	

			
			
