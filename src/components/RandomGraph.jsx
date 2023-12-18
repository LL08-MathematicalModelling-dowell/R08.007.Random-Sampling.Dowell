
import { Chart} from 'react-google-charts';

/*
## tested data for the graph##
const data= [
    [
      0,
      -50
    ],
    [
      -35.673002392284054,
      -49.17753720129195
    ],
    [
      15.786318905249376,
      -17.999505001376477
    ],
    [
      32.90476906232237,
      -36.19725687805518
    ],
    [
      -30.40997593018656,
      -31.332570914541105
    ],
    [
      5.974991327546126,
      -14.821327151654636
    ],
    [
      29.99040382499477,
      -30.665698276149154
    ],
    [
      13.43904552010463,
      -16.945021551304585
    ],
    [
      25.96788429923947,
      -25.527392256719452
    ],
    [
      21.876765721316072,
      -21.81052206390099
    ]
  ]

*/

// eslint-disable-next-line react/prop-types
const RandomGraph=({data })=> {
  return (
    <Chart
      chartType="LineChart"
      data={[["X","Y"],...data]}
      width="100%"
      height="400px"
      options={{
        title: 'Random Chart',
        curveType: 'function',
        
        hAxis: {
          title: 'X-Axis',
          color:'transparent',
          baseline: 0,
          gridlines: {
           // color:'transparent',
            count: -1, // -1 to display default number of gridlines
          },
          viewWindow: {
            min: -65, // Adjust the min value based on your data
            max: 65,  // Adjust the max value based on your data
          },
        },
        vAxis: {
          baseline: 0,
         
          title: 'Y-Axis',
          gridlines: {
            //color:'transparent',
            count: -1, // -1 to display default number of gridlines
          },
          viewWindow: {
            min: -65, // Adjust the min value based on your data
            max: 65,  // Adjust the max value based on your data
          },
        },
        legend: 'none',
      }}    

    />
  );
};

export default RandomGraph;
