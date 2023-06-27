import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import * as d3 from "d3";
import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function generatePoints(listOfPoints, numOfPoints) {
  var generatedPoints = [];

  // Add the input points to the generated points list
  generatedPoints.push(...listOfPoints);

  // Generate additional points to reach the desired number
  var remainingPoints = numOfPoints - listOfPoints.length;
  var lastPoint = listOfPoints[listOfPoints.length - 1];

  for (var i = 0; i < remainingPoints; i++) {
    var newPoint = [lastPoint[0] + i, lastPoint[1] + i]; // Adjust how the new points are generated according to your requirements
    generatedPoints.push(newPoint);
  }

  return generatedPoints;
}

// Usage example
var listOfPoints = [[1, 5], [1, 0]];
var numOfPoints = 10000;

const generatedPoints =[[1, 11], [2, 12], [3, -13], [-4, 14]]
//  [5, 15], [6, 16], [7, 17], [8, 18], [9, 19], [10, 20], [12, 22], [22, 55], [55, 64], [64, 77], [77, 88], [88, 99], [99, 110], [110, 121], [121, 132], [132, 143], [143, 154], [154, 165], [165, 176], [176, 187], [187, 198], [198, 209], [209, 220], [220, 231], [231, 242], [242, 253], [253, 264], [264, 275], [275, 286], [286, 297], [297, 308], [308, 319], [319, 330], [330, 341], [341, 352], [352, 363], [363, 374], [374, 385], [385, 396], [396, 407], [407, 418], [418, 429], [429, 440], [440, 451], [451, 462], [462, 473], [473, 484], [484, 495], [495, 506], [506, 517], [517, 528], [528, 539], [539, 550], [550, 561], [561, 572], [572, 583], [583, 594], [594, 605], [605, 616], [616, 627], [627, 638], [638, 649], [649, 660], [660, 671], [671, 682], [682, 693], [693, 704], [704, 715], [715, 726], [726, 737], [737, 748], [748, 759], [759, 770], [770, 781], [781, 792], [792, 803], [803, 814], [814, 825], [825, 836], [836, 847], [847, 858], [858, 869], [869, 880], [880, 891], [891, 902], [902, 913], [913, 924], [924, 935], [935, 946], [946, 957], [957, 968], [968, 979], [979, 990],[1, 11], [2, 12], [3, 13], [4, 14], [5, 15], [6, 16], [7, 17], [8, 18], [9, 19], [10, 20], [12, 22], [22, 55], [55, 64], [64, 77], [77, 88], [88, 99], [99, 110], [110, 121], [121, 132], [132, 143], [143, 154], [154, 165], [165, 176], [176, 187], [187, 198], [198, 209], [209, 220], [220, 231], [231, 242], [242, 253], [253, 264], [264, 275], [275, 286], [286, 297], [297, 308], [308, 319], [319, 330], [330, 341], [341, 352], [352, 363], [363, 374], [374, 385], [385, 396], [396, 407], [407, 418], [418, 429], [429, 440], [440, 451], [451, 462], [462, 473], [473, 484], [484, 495], [495, 506], [506, 517], [517, 528], [528, 539], [539, 550], [550, 561], [561, 572], [572, 583], [583, 594], [594, 605], [605, 616], [616, 627], [627, 638], [638, 649], [649, 660], [660, 671], [671, 682], [682, 693], [693, 704], [704, 715], [715, 726], [726, 737], [737, 748], [748, 759], [759, 770], [770, 781], [781, 792], [792, 803], [803, 814], [814, 825], [825, 836], [836, 847], [847, 858], [858, 869], [869, 880], [880, 891], [891, 902], [902, 913], [913, 924], [924, 935], [935, 946], [946, 957], [957, 968], [968, 979], [979, 990],[1, 11], [2, 12], [3, 13], [4, 14], [5, 15], [6, 16], [7, 17], [8, 18], [9, 19], [10, 20], [12, 22], [22, 55], [55, 64], [64, 77], [77, 88], [88, 99], [99, 110], [110, 121], [121, 132], [132, 143], [143, 154], [154, 165], [165, 176], [176, 187], [187, 198], [198, 209], [209, 220], [220, 231], [231, 242], [242, 253], [253, 264], [264, 275], [275, 286], [286, 297], [297, 308], [308, 319], [319, 330], [330, 341], [341, 352], [352, 363], [363, 374], [374, 385], [385, 396], [396, 407], [407, 418], [418, 429], [429, 440], [440, 451], [451, 462], [462, 473], [473, 484], [484, 495], [495, 506], [506, 517], [517, 528], [528, 539], [539, 550], [550, 561], [561, 572], [572, 583], [583, 594], [594, 605], [605, 616], [616, 627], [627, 638], [638, 649], [649, 660], [660, 671], [671, 682], [682, 693], [693, 704], [704, 715], [715, 726], [726, 737], [737, 748], [748, 759], [759, 770], [770, 781], [781, 792], [792, 803], [803, 814], [814, 825], [825, 836], [836, 847], [847, 858], [858, 869], [869, 880], [880, 891], [891, 902], [902, 913], [913, 924], [924, 935], [935, 946], [946, 957], [957, 968], [968, 979], [979, 990]]
//  generatePoints(listOfPoints, numOfPoints);

const Chart = () => {
  const [data, setData] = useState(generatedPoints);
  const [limit, setLimit] = useState(20);

  const [xScale, setXScale] = useState(null);
  const [yScale, setYScale] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [toggle,setToggle] = useState(false)
  const viewBoxOut = `0 0 ${400 * zoomLevel} ${400 * zoomLevel}`;

  const handleMouseOver = useCallback((event, d) => {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0.9);
    tooltip
      .html(`(${d[0]}, ${d[1]})`)
      .style("left", event.pageX + "px")
      .style("top", event.pageY - 28 + "px");
  }, []);

  const handleMouseOut = useCallback(() => {
    tooltip.transition().duration(200).style("opacity", 0);
  }, []);

  useEffect(() => {
    // setTimeout(() => {
      const w = 450;
      const h = 400;
      const svg = d3
        .select(svgRef.current)
        .attr("width", w)
        .attr("height", h)
        .style("overflow", "visible")
        .style("margin-top", "20px");

      const xScale = d3.scaleLinear().domain([-limit, limit]).range([0, w]);
      setXScale(xScale);

      const yScale = d3.scaleLinear().domain([-limit, limit]).range([h, 0]);
      setYScale(yScale);

      const xAxis = d3.axisBottom(xScale).ticks(11).tickPadding(10).tickSizeOuter(0);

      const yAxis = d3.axisLeft(yScale).ticks(11).tickPadding(10).tickSizeOuter(0);
      svg
        .append("g")
        .call(xAxis)
        .attr("transform", `translate(0, ${h / 2})`);
      svg
        .append("g")
        .call(yAxis)
        .attr("transform", `translate(${w / 2}, 0)`);

      const line = d3
        .line()
        .x(function (d) {
          return xScale(d[0]);
        })
        .y(function (d) {
          return yScale(d[1]);
        });

      const arrowhead = svg
        .append("defs")
        .append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "0 0 10 10")
        .attr("refX", 8)
        .attr("refY", 5)
        .attr("markerWidth", 5)
        .attr("markerHeight", 5)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M 0 0 L 10 5 L 0 10 z")
        .style("fill", "black");

      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line)
        .attr("marker-end", "url(#arrowhead)");

      svg
        .selectAll("line-marker")
        .data(data.slice(0, -1))
        .enter()
        .append("line")
        .attr("class", "line-marker")
        .attr("x1", (d) => xScale(d[0]))
        .attr("y1", (d) => yScale(d[1]))
        .attr("x2", (d, i) => xScale(data[i + 1][0]))
        .attr("y2", (d, i) => yScale(data[i + 1][1]))
        .attr("marker-end", "url(#arrowhead)")
        .style("stroke", "none");

      const tooltip = d3
        .select(svgRef.current.parentNode)
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
//  if (toggle) {
  // window.location.reload('/')
  console.log(toggle)
  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d[0]))
    .attr("cy", (d) => yScale(d[1]))
    .attr("r", 4)
    if(!toggle)
    svg.selectAll("circle")
    .style("fill", "none").style("stroke","none")
    else
    svg.selectAll("circle").style("fill",'none').style("stroke","steelblue")
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);
    
  }, 
  [data, limit, handleMouseOver, handleMouseOut,toggle]
  );

  

  const svgRef = useRef();

  useEffect(() => {
    if (xScale && yScale) {
      const svg = d3.select(svgRef.current);
      svg
        .selectAll("circle")
        .attr("cx", (d) => xScale(d[0]))
        .attr("cy", (d) => yScale(d[1]));
    }
  }, [xScale, yScale, zoomLevel]);
const handleToggle=()=>
{
  setToggle(!toggle)
}
  return (
    <div className="mx-auto py-6">
      <TransformWrapper initialScale={1} initialPositionX={200} initialPositionY={100}>
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            <div style={{ display: "flex", gap: "2pc", justifyContent: "center" }}>
              <button onClick={() => zoomIn()}>+</button>
              <button onClick={() => zoomOut()}>-</button>
              <button onClick={() => resetTransform()}>x</button>
            </div>
            <TransformComponent>
              <svg ref={svgRef} style={{ width: "30pc", marginRight: "35pc", marginBottom: "10pc" }} viewBox={zoomIn && !zoomOut ? `0 0 ${viewBoxSize} ${viewBoxSize}` : `${viewBoxOut}`}></svg>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
      <button onClick={e=>handleToggle()}>  {toggle ? "Give Simple Graph" : "Draw Circles around points"}</button>
    </div>
  );
};

export default Chart;



// import React, { useRef, useEffect, useState } from "react";
// import { useControls, TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import * as d3 from "d3";

// const Chart = () => {
//   const canvasRef = useRef(null);
//   const [hoveredCoord, setHoveredCoord] = useState(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");

//     const w = canvas.width;
//     const h = canvas.height;

//     const coordinates =[[1, 11], [2, 12], [3, 13], [4, 14], [5, 15], [6, 16], [7, 17], [8, 18], [9, 19], [10, 20], [12, 22], [22, 55], [55, 64], [64, 77], [77, 88], [88, 99], [99, 110], [110, 121], [121, 132], [132, 143], [143, 154], [154, 165], [165, 176], [176, 187], [187, 198], [198, 209], [209, 220], [220, 231], [231, 242], [242, 253], [253, 264], [264, 275], [275, 286], [286, 297], [297, 308], [308, 319], [319, 330], [330, 341], [341, 352], [352, 363], [363, 374], [374, 385], [385, 396], [396, 407], [407, 418], [418, 429], [429, 440], [440, 451], [451, 462], [462, 473], [473, 484], [484, 495], [495, 506], [506, 517], [517, 528], [528, 539], [539, 550], [550, 561], [561, 572], [572, 583], [583, 594], [594, 605], [605, 616], [616, 627], [627, 638], [638, 649], [649, 660], [660, 671], [671, 682], [682, 693], [693, 704], [704, 715], [715, 726], [726, 737], [737, 748], [748, 759], [759, 770], [770, 781], [781, 792], [792, 803], [803, 814], [814, 825], [825, 836], [836, 847], [847, 858], [858, 869], [869, 880], [880, 891], [891, 902], [902, 913], [913, 924], [924, 935], [935, 946], [946, 957], [957, 968], [968, 979], [979, 990],[1, 11], [2, 12], [3, 13], [4, 14], [5, 15], [6, 16], [7, 17], [8, 18], [9, 19], [10, 20], [12, 22], [22, 55], [55, 64], [64, 77], [77, 88], [88, 99], [99, 110], [110, 121], [121, 132], [132, 143], [143, 154], [154, 165], [165, 176], [176, 187], [187, 198], [198, 209], [209, 220], [220, 231], [231, 242], [242, 253], [253, 264], [264, 275], [275, 286], [286, 297], [297, 308], [308, 319], [319, 330], [330, 341], [341, 352], [352, 363], [363, 374], [374, 385], [385, 396], [396, 407], [407, 418], [418, 429], [429, 440], [440, 451], [451, 462], [462, 473], [473, 484], [484, 495], [495, 506], [506, 517], [517, 528], [528, 539], [539, 550], [550, 561], [561, 572], [572, 583], [583, 594], [594, 605], [605, 616], [616, 627], [627, 638], [638, 649], [649, 660], [660, 671], [671, 682], [682, 693], [693, 704], [704, 715], [715, 726], [726, 737], [737, 748], [748, 759], [759, 770], [770, 781], [781, 792], [792, 803], [803, 814], [814, 825], [825, 836], [836, 847], [847, 858], [858, 869], [869, 880], [880, 891], [891, 902], [902, 913], [913, 924], [924, 935], [935, 946], [946, 957], [957, 968], [968, 979], [979, 990],[1, 11], [2, 12], [3, 13], [4, 14], [5, 15], [6, 16], [7, 17], [8, 18], [9, 19], [10, 20], [12, 22], [22, 55], [55, 64], [64, 77], [77, 88], [88, 99], [99, 110], [110, 121], [121, 132], [132, 143], [143, 154], [154, 165], [165, 176], [176, 187], [187, 198], [198, 209], [209, 220], [220, 231], [231, 242], [242, 253], [253, 264], [264, 275], [275, 286], [286, 297], [297, 308], [308, 319], [319, 330], [330, 341], [341, 352], [352, 363], [363, 374], [374, 385], [385, 396], [396, 407], [407, 418], [418, 429], [429, 440], [440, 451], [451, 462], [462, 473], [473, 484], [484, 495], [495, 506], [506, 517], [517, 528], [528, 539], [539, 550], [550, 561], [561, 572], [572, 583], [583, 594], [594, 605], [605, 616], [616, 627], [627, 638], [638, 649], [649, 660], [660, 671], [671, 682], [682, 693], [693, 704], [704, 715], [715, 726], [726, 737], [737, 748], [748, 759], [759, 770], [770, 781], [781, 792], [792, 803], [803, 814], [814, 825], [825, 836], [836, 847], [847, 858], [858, 869], [869, 880], [880, 891], [891, 902], [902, 913], [913, 924], [924, 935], [935, 946], [946, 957], [957, 968], [968, 979], [979, 990]]
//     //  generateRandomCoordinates(100);
//     const minX = Math.min(...coordinates.map(coord => coord[0]));
//     const maxX = Math.max(...coordinates.map(coord => coord[0]));
//     const minY = Math.min(...coordinates.map(coord => coord[1]));
//     const maxY = Math.max(...coordinates.map(coord => coord[1]));

//     const xInterval = (maxX - minX) / 5;
//     const yInterval = (maxY - minY) / 5;

//     const xScale = d3.scaleLinear().domain([minX - xInterval, maxX + xInterval]).range([50, w - 50]);
//     const yScale = d3.scaleLinear().domain([minY - yInterval, maxY + yInterval]).range([h - 50, 50]);

//     ctx.clearRect(0, 0, w, h);

//     ctx.strokeStyle = "#ccc";
//     ctx.lineWidth = 1;

   
//     ctx.beginPath();
//     ctx.moveTo(50, h / 2);
//     ctx.lineTo(w - 50, h / 2);
//     ctx.stroke();


//     ctx.beginPath();
//     ctx.moveTo(w / 2, 50);
//     ctx.lineTo(w / 2, h - 50);
//     ctx.stroke();

//     ctx.fillStyle = "steelblue";
//     ctx.strokeStyle = "black";

  
//     for (let i = minX; i <= maxX; i += xInterval) {
//       const x = xScale(i);
//       ctx.beginPath();
//       ctx.moveTo(x, h / 2 - 5);
//       ctx.lineTo(x, h / 2 + 5);
//       ctx.stroke();
//       ctx.fillText(i.toString(), x - 10, h / 2 + 20);
//     }

//     for (let i = minY; i <= maxY; i += yInterval) {
//       const y = yScale(i);
//       ctx.beginPath();
//       ctx.moveTo(w / 2 - 5, y);
//       ctx.lineTo(w / 2 + 5, y);
//       ctx.stroke();
//       ctx.fillText(i.toString(), w / 2 + 10, y + 5);
//     }

//     coordinates.forEach((coord, index) => {
//       const x = xScale(coord[0]);
//       const y = yScale(coord[1]);

//       ctx.beginPath();
//       ctx.arc(x, y, 3, 0, 2 * Math.PI);
//       ctx.fill();
//       ctx.stroke();

//       if (index < coordinates.length - 1) {
//         const nextCoord = coordinates[index + 1];
//         const nextX = xScale(nextCoord[0]);
//         const nextY = yScale(nextCoord[1]);

//         ctx.beginPath();
//         ctx.moveTo(x, y);
//         ctx.lineTo(nextX, nextY);
//         ctx.stroke();


//         const angle = Math.atan2(nextY - y, nextX - x);
//         ctx.save();
//         ctx.translate(nextX, nextY);
//         ctx.rotate(angle);
//         ctx.beginPath();
//         ctx.moveTo(-8, -5);
//         ctx.lineTo(0, 0);
//         ctx.lineTo(-8, 5);
//         ctx.closePath();
//         ctx.fill();
//         ctx.restore();
//       }
//     });

//     const handleMouseMove = event => {
//       const rect = canvas.getBoundingClientRect();
//       const x = event.clientX - rect.left;
//       const y = event.clientY - rect.top;

//       const invX = xScale.invert(x);
//       const invY = yScale.invert(y);

//       setHoveredCoord([invX, invY]);
//     };

//     const handleMouseLeave = () => {
//       setHoveredCoord(null);
//     };

//     canvas.addEventListener("mousemove", handleMouseMove);
//     canvas.addEventListener("mouseleave", handleMouseLeave);

//     return () => {
//       canvas.removeEventListener("mousemove", handleMouseMove);
//       canvas.removeEventListener("mouseleave", handleMouseLeave);
//     };
//   }, []);

//   const generateRandomCoordinates = num => {
//     const coordinates = [];
//     for (let i = 0; i < num; i++) {
//       const x = Math.floor(Math.random() * 30);
//       const y = Math.floor(Math.random() * 30);
//       coordinates.push([x, y]);
//     }
//     return coordinates;
//   };

//   const Controls = () => {
//     const { zoomIn, zoomOut, resetTransform } = useControls();
//     return (
//       <>
//         <button onClick={() => zoomIn()}>+</button>
//         <button onClick={() => zoomOut()}>-</button>
//         <button onClick={() => resetTransform()}>x</button>
//       </>
//     );
//   };

//   return (
//     <div>
//       <TransformWrapper>
//         <Controls />
//         <TransformComponent>
//           <canvas ref={canvasRef} width={400} height={400} style={{marginLeft:"16pc" }}></canvas>         
//         </TransformComponent>
//       </TransformWrapper>
//        {hoveredCoord && <div>Coordinate: [{hoveredCoord[0]}, {hoveredCoord[1]}]</div>}
//     </div>
//   );
// };

// export default Chart;
