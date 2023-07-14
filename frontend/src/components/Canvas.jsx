import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import * as d3 from "d3";
import React from "react";
import axios from "axios"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import LoaderComp from "./Loader";
import ClipLoader from "react-spinners/ClipLoader";
import { saveAs } from 'file-saver';
import { Button } from "../pages/FieldRandomPoints";
 


const  findHighestNumber = (array) => {
    let maxNumber = Number.NEGATIVE_INFINITY;

    for (const subArray of array) {
      for (const number of subArray) {
        if (number > maxNumber) {
          maxNumber = number;
        }
      }
    }
        return maxNumber;
  };


// Usage example
var listOfPoints = [[1, 5], [1, 0]];
var numOfPoints = 10000;

// const generatedPoints =[[1, 11], [2, 12], [3, -13], [-4, 14],  [5, 15], [6, 16], [7, 17], [8, 18], [9, 19], [10, 20], [12, 22], [22, 55], [55, 64], [64, 77], [77, 88], [88, 99], [99, 110], [110, 121], [121, 132], [132, 143], [143, 154], [154, 165], [165, 176], [176, 187], [187, 198], [198, 209], [209, 220], [220, 231], [231, 242], [242, 253], [253, 264], [264, 275], [275, 286], [286, 297], [297, 308], [308, 319], [319, 330], [330, 341], [341, 352], [352, 363], [363, 374], [374, 385], [385, 396], [396, 407], [407, 418], [418, 429], [429, 440], [440, 451], [451, 462], [462, 473], [473, 484], [484, 495], [495, 506], [506, 517], [517, 528], [528, 539], [539, 550], [550, 561], [561, 572], [572, 583], [583, 594], [594, 605], [605, 616], [616, 627], [627, 638], [638, 649], [649, 660], [660, 671], [671, 682], [682, 693], [693, 704], [704, 715], [715, 726], [726, 737], [737, 748], [748, 759], [759, 770], [770, 781], [781, 792], [792, 803], [803, 814], [814, 825], [825, 836], [836, 847], [847, 858], [858, 869], [869, 880], [880, 891], [891, 902], [902, 913], [913, 924], [924, 935], [935, 946], [946, 957], [957, 968], [968, 979], [979, 990],[1, 11], [2, 12], [3, 13], [4, 14], [5, 15], [6, 16], [7, 17], [8, 18], [9, 19], [10, 20], [12, 22], [22, 55], [55, 64], [64, 77], [77, 88], [88, 99], [99, 110], [110, 121], [121, 132], [132, 143], [143, 154], [154, 165], [165, 176], [176, 187], [187, 198], [198, 209], [209, 220], [220, 231], [231, 242], [242, 253], [253, 264], [264, 275], [275, 286], [286, 297], [297, 308], [308, 319], [319, 330], [330, 341], [341, 352], [352, 363], [363, 374], [374, 385], [385, 396], [396, 407], [407, 418], [418, 429], [429, 440], [440, 451], [451, 462], [462, 473], [473, 484], [484, 495], [495, 506], [506, 517], [517, 528], [528, 539], [539, 550], [550, 561], [561, 572], [572, 583], [583, 594], [594, 605], [605, 616], [616, 627], [627, 638], [638, 649], [649, 660], [660, 671], [671, 682], [682, 693], [693, 704], [704, 715], [715, 726], [726, 737], [737, 748], [748, 759], [759, 770], [770, 781], [781, 792], [792, 803], [803, 814], [814, 825], [825, 836], [836, 847], [847, 858], [858, 869], [869, 880], [880, 891], [891, 902], [902, 913], [913, 924], [924, 935], [935, 946], [946, 957], [957, 968], [968, 979], [979, 990],[1, 11], [2, 12], [3, 13], [4, 14], [5, 15], [6, 16], [7, 17], [8, 18], [9, 19], [10, 20], [12, 22], [22, 55], [55, 64], [64, 77], [77, 88], [88, 99], [99, 110], [110, 121], [121, 132], [132, 143], [143, 154], [154, 165], [165, 176], [176, 187], [187, 198], [198, 209], [209, 220], [220, 231], [231, 242], [242, 253], [253, 264], [264, 275], [275, 286], [286, 297], [297, 308], [308, 319], [319, 330], [330, 341], [341, 352], [352, 363], [363, 374], [374, 385], [385, 396], [396, 407], [407, 418], [418, 429], [429, 440], [440, 451], [451, 462], [462, 473], [473, 484], [484, 495], [495, 506], [506, 517], [517, 528], [528, 539], [539, 550], [550, 561], [561, 572], [572, 583], [583, 594], [594, 605], [605, 616], [616, 627], [627, 638], [638, 649], [649, 660], [660, 671], [671, 682], [682, 693], [693, 704], [704, 715], [715, 726], [726, 737], [737, 748], [748, 759], [759, 770], [770, 781], [781, 792], [792, 803], [803, 814], [814, 825], [825, 836], [836, 847], [847, 858], [858, 869], [869, 880], [880, 891], [891, 902], [902, 913], [913, 924], [924, 935], [935, 946], [946, 957], [957, 968], [968, 979], [979, 990]]
//  generatePoints(listOfPoints, numOfPoints);

const Chart = (props) => {
  console.log(props.side)
  const imag=useRef();
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(0)
  const [responseData,setResponseData]=useState();
  const [xScale, setXScale] = useState(null)
  const[yScale, setYScale] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [toggle,setToggle] = useState(false)
  const viewBoxOut = `0 0 ${400 * zoomLevel} ${400 * zoomLevel}`;
const handleDownload = () => {
  // const svgElement = svgRef.current;

  // // Get the SVG content as a string
  // const svgString = new XMLSerializer().serializeToString(svgElement);

  // // Create a blob from the SVG content
  // const blob = new Blob([svgString], { type: 'image/svg+xml' });

  // // Save the SVG file
  // saveAs(blob, 'image.svg');
};


  useEffect(()=>{
    const num=30;
    const usAPI=async()=>
    {
    
// console.log(sidee)
if(props.type === 'field'){
    fetch("https://100022.pythonanywhere.com//fieldrp/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    side: parseInt(props.side),
    selection: parseInt(props.selection),
    choice: parseInt(props.choice),
    value: parseInt(props.value),
  }),
})

  .then((response) => response.json())
  .then((data) => {
    // Handle the response data here
    // console.log(data.listOfPoints);
    setData(data.listOfPoints);
    setLimit(findHighestNumber(data.listOfPoints))
    // setLimit(Math.max(data.listOfPoints));
    // alert(Math.max(data.listOfPoints))
  })
  .catch((error) => {
    // Handle any errors that occurred during the request
    console.error(error);
  });
 
}
else if(props.type === 'excel')
{
    fetch("https://100022.pythonanywhere.com/excelrp/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    side: parseInt(props.side),
    selection: parseInt(props.selection),
  }),
})

  .then((response) => response.json())
  .then((data) => {
    // Handle the response data here
    // console.log(data.listOfPoints);
    setData(data.listOfPoints);
    setLimit(findHighestNumber(data.listOfPoints))
  })
  .catch((error) => {
    // Handle any errors that occurred during the request
    console.error(error);
  });
 
}   
    }
    usAPI();
  },[])
const handleToggle=()=>
{
  setToggle(!toggle)
}
 const saveGraph = ()=>{
    let url = imageSrc;
    saveAs(url, "graph");
   }

const giveGraph=()=>{
  setToggle(!toggle)
//  console.log("Clicked")
  fetch("http://100022.pythonanywhere.com/graph/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    side: parseInt(props.side),
    listOfPoints: data,
  }),
})

  .then((response) => response.json())
  .then((data) => {
    // Handle the response data here
    // console.log(data.graph);
    setImageSrc(data.graph);
    setResponseData(data.graph);
  })
  .catch((error) => {
    // Handle any errors that occurred during the request
    console.error(error);
  });

}

  return (
    <div className="mx-auto py-6">
   <TransformWrapper initialScale={1} initialPositionX={200} initialPositionY={100}>
         {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            {
              imageSrc  &&
            
            <div style={{ display: "flex", gap: "2pc", justifyContent: "center" }}>
              <button onClick={() => zoomIn()}>+</button>
              <button onClick={() => zoomOut()}>-</button>
              <button onClick={() => resetTransform()}>x</button>
              {/* <p>{data[0]}</p> */}
            </div>
}
              { 
              !imageSrc  && toggle && <>
     <div style={{display:"grid",marginLeft:"8rem"}}>
      <h3>Wait While We Plot the Graph For You </h3>
      <br/>
      <div style={{alignContent:"center"}}> 
      <ClipLoader
        color="green"
        loading={true}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      </div>
      </div> 
      </> }
        <TransformComponent>
         {imageSrc && 
         <img src={imageSrc} ref={imag} alt="Converted" />

         }
         </TransformComponent>
          {imageSrc && <Button onClick={saveGraph}>Download Graph</Button>   }
         </React.Fragment>
         )}
    </TransformWrapper>       
      {!toggle &&  <>
      <h3>{data.length} combinations of Coordinates generated,</h3>
      <p>Click below to draw graph</p>
      <Button onClick={giveGraph}>Give Graph</Button>  
      </>}

    </div>
  );
};

export default Chart;


// <TransformWrapper initialScale={1} initialPositionX={200} initialPositionY={100}>
//         {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
//           <React.Fragment>
//             {
//               data.length !== 0 &&
            
//             <div style={{ display: "flex", gap: "2pc", justifyContent: "center" }}>
//               <button onClick={() => zoomIn()}>+</button>
//               <button onClick={() => zoomOut()}>-</button>
//               <button onClick={() => resetTransform()}>x</button>
//               {/* <p>{data[0]}</p> */}
//             </div>
// }
//               { 
//               data.length === 0 && <>
//      <div style={{display:"grid",marginLeft:"8rem"}}>
//       <h3>Wait While We Plot the Graph For You </h3>
//       <br/>
//       <div style={{alignContent:"center"}}> 
//       <ClipLoader
//         color="green"
//         loading={true}
//         size={50}
//         aria-label="Loading Spinner"
//         data-testid="loader"
//       />
//       </div>
//       </div> 
//       </> }
//             {/* <TransformComponent>
//               <svg ref={svgRef} style={{ width: "30pc", marginRight: "35pc", marginBottom: "10pc",display: data.length === 0 && "none"}} viewBox={zoomIn && !zoomOut ? `0 0 0 0 ` : `${viewBoxOut}`}></svg>
//             </TransformComponent> */}
//           </React.Fragment>
//         )}
//       </TransformWrapper>
//       {
//         data.length !== 0 && <div style={{display:"grid",marginLeft:"20rem",gap:"1rem",width:"17rem"}}>
//         <Button onClick={e=>handleToggle()}>  {toggle ? "Give Simple Graph" : "Draw Circles around points"}</Button>
//         <Button onClick={handleDownload}>Download Graph</Button>
//          </div>
//          }
