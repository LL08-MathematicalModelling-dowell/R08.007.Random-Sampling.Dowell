
import { Chart} from 'react-google-charts';


function findMinMax(dataArray,axis) {
  if (!dataArray || dataArray.length === 0) {
    return null;
  }

  let min = Number.MAX_VALUE;
  let max = Number.MIN_VALUE;

  // Iterate through the outer array
  for (const innerArray of dataArray) {
    // Check if the inner array is present and not empty
    if (innerArray && innerArray.length > 0) {
      // Iterate through the inner array using destructuring
      if(axis==='x') {
        // Update min and max values
        if (innerArray[0] < min) {
          min = innerArray[0] ;
        }

        if (innerArray[0] > max) {
          max = innerArray[0];
        }
      }
      if(axis==='y') {
        // Update min and max values
        if (innerArray[1] < min) {
          min = innerArray[1] ;
        }

        if (innerArray[1] > max) {
          max = innerArray[1];
        }
      } 
    }
  }

  return [min, max];
}

// eslint-disable-next-line react/prop-types
const RandomGraph=({data})=> {
  //const datas=[[-1,-3],[-4,-5],[-3,-6],[-2,-6],[-8,10]]
 const [minX,maxX]=findMinMax(data,'x');
 const [minY,maxY]=findMinMax(data,'y');

//  const minXAxis=parseInt(minX);
//  const maxXAxis=parseInt(maxX);
//const tickedvalue=[minXAxis,maxXAxis];
/*
const chartEvents = [
  {
    eventName: 'ready',
    callback: ({ chartWrapper }) => {
      new chartWrapper.getChart();
      const dataTable = chartWrapper.getDataTable();
        console.log("datas",dataTable);
      // Set a custom shape for the first point
   

  

     
    },
  },
];*/
  return (
    <>
    {/* <h3 className='text-1xl text-[#005734] font-semibold text-center mb-1'>Random Chart</h3> */}
    <Chart
      chartType="LineChart"
      data={[["X","Y"],...data]}
      width="96%"
     
      height="400px"
      options={{
       
        //curveType: 'function',
        series: {
          0: { pointShape: { type: 'polygon', sides: 5 } }},
        hAxis: {
          title: 'X-Axis',
        
          baseline: 0,
          gridlines: {
           //color:'transparent',
            //count: -1, // -1 to display default number of gridlines
          },
           viewWindow: {
            min: minX-20, // Adjust the min value based on  data
            max: maxX+20,  // Adjust the max value based on data
           },
         // ticks: tickedvalue,
        },
        vAxis: {
          baseline: 0,      
          title: 'Y-Axis',
          gridlines: {
            //color:'transparent',
            count: -1, // -1 to display default number of gridlines
          },
           viewWindow: {
             min: minY-20, // Adjust the min value based on the data
             max: maxY+20,  // Adjust the max value based on the data
           },
        },
        chartArea:{
           width:'70%',
           height:'70%'
        },
       
        legend: 'none',
        pointSize:8,
        pointShape: {  type: 'polygon',
        sides: 2.5,
        dent: 0.8,
        //rotation:-180
       
      },
      
        colors: ['green'],
        backgroundColor:'rgb(229 231 235)'
      }}    
     // chartEvents={chartEvents}
    />
    </>
  );
};

export default RandomGraph;
