
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
const RandomGraph=()=> {
  const datas=[[-1,-3],[-4,-5],[-3,-6],[-2,-6],[-8,10]]
 const [minX,maxX]=findMinMax(datas,'x');
 const [minY]=findMinMax(datas,'y');

 const minXAxis=parseInt(minX);
 const maxXAxis=parseInt(maxX);
const tickedvalue=[minXAxis,maxXAxis];
console.log("ticked",tickedvalue);

const chartEvents = [
  {
    eventName: 'select',
    callback: ({ chartWrapper }) => {
      console.log('Selected:', chartWrapper.getChart().getSelection());
    },
  },
];

  return (
    <>
    {/* <h3 className='text-1xl text-[#005734] font-semibold text-center mb-1'>Random Chart</h3> */}
    <Chart
      chartType="LineChart"
      data={[["X","Y"],...datas]}
      chartEvents={chartEvents}
      width="96%"
     
      height="400px"
      options={{
       
        curveType: 'function',
        
        hAxis: {
          title: 'X-Axis',
        
          baseline: 0,
          gridlines: {
           // color:'transparent',
            count: -1, // -1 to display default number of gridlines
          },
           viewWindow: {
            min: minX, // Adjust the min value based on  data
          //   max: maxX,  // Adjust the max value based on data
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
             min: minY, // Adjust the min value based on the data
          //   max: maxY,  // Adjust the max value based on the data
           },
        },
        chartArea:{
           width:'70%',
           height:'70%'
        },
       
        legend: 'none',
        pointSize:20,
        pointShape: {  type: 'star',
        sides: 3,
        dent: 0.2,

        rotation: 90,
       
      },
      
        colors: ['green'],
        backgroundColor:'rgb(229 231 235)'
      }}    
      
    />
    </>
  );
};

export default RandomGraph;
