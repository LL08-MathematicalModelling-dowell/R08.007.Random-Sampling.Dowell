# **LOGIC FOR RANDOM ALLOCATION FUNCTION**

start

	call dowellrandomgraph()
	
	#Step 1 Input Variables
	
	define selected_type
		if selected_type= "fieldrp"		         Note- "fieldrp"=Field Random Point
			define columns, rows, selection, N
			
		
		
		if selected_type= "excelrp"              Note- "excelrp"=Excel Random Point
			define columns, rows, selection
	
