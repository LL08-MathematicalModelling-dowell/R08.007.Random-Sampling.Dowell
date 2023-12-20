
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
 const [minX,maxX]=findMinMax(data,'x');
 const [minY,maxY]=findMinMax(data,'y');

 const minXAxis=parseInt(minX)-20;
 const maxXAxis=parseInt(maxX)+10;
const tickedvalue=[minXAxis,maxXAxis];
console.log("ticked",tickedvalue);
  return (
    <>
    <h3 className='text-1xl text-[#005734] font-semibold text-center mb-1'>Random Chart</h3>
    <Chart
      chartType="LineChart"
      data={[["X","Y"],...data]}
      width="100%"
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
            min: minX>0?-50:minX-50, // Adjust the min value based on your data
            max: maxX < 0 ?50:maxX+50,  // Adjust the max value based on your data
          },
          ticks: tickedvalue,
        },
        vAxis: {
          baseline: 0,
         
          title: 'Y-Axis',
          gridlines: {
            //color:'transparent',
            count: -1, // -1 to display default number of gridlines
          },
          viewWindow: {
            min: minY>0?-40:minY-40, // Adjust the min value based on your data
            max: maxY < 0 ?40:maxY+40,  // Adjust the max value based on your data
          },
        },
        legend: 'none',
        colors: ['green'],
        backgroundColor:'rgb(229 231 235)'
      }}    

    />
    </>
  );
};

export default RandomGraph;
