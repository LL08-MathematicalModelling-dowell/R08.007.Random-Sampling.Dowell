# **LOGIC FOR RANDOM ALLOCATION FUNCTION** 

start

	call dowellrandomgraph()
	
	#Step 1 Input Variables
	
	define selected_type
		if selected_type= "fieldrp"		         Note- "fieldrp"=Field Random Point
			define columns, rows, selection, N
			
			length=columns
			width=rows
			area=length*width                         #calculate area of rectangle
			area_of_circle=area/N                     #calculate area of circle
			radius=sqrt(area_of_circle/pi)            #calculate the radius of circle
			diameter=2*radius                         #calculate the diameter of circle
			
			

		
		if selected_type= "excelrp"                      Note- "excelrp"=Excel Random Point
		
			define columns, rows, selection
			length=columns
			width=rows
			N=length
			area=length*width                         #calculate area of rectangle
			area_of_circle=area/N                     #calculate area of circle
			radius=sqrt(area_of_circle/pi)            #calculate the radius of circle
			diameter=2*radius                         #calculate the diameter of circle
	
