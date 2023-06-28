import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import * as d3 from "d3";
import React from "react";
import axios from "axios"
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

// const generatedPoints =[[1, 11], [2, 12], [3, -13], [-4, 14],  [5, 15], [6, 16], [7, 17], [8, 18], [9, 19], [10, 20], [12, 22], [22, 55], [55, 64], [64, 77], [77, 88], [88, 99], [99, 110], [110, 121], [121, 132], [132, 143], [143, 154], [154, 165], [165, 176], [176, 187], [187, 198], [198, 209], [209, 220], [220, 231], [231, 242], [242, 253], [253, 264], [264, 275], [275, 286], [286, 297], [297, 308], [308, 319], [319, 330], [330, 341], [341, 352], [352, 363], [363, 374], [374, 385], [385, 396], [396, 407], [407, 418], [418, 429], [429, 440], [440, 451], [451, 462], [462, 473], [473, 484], [484, 495], [495, 506], [506, 517], [517, 528], [528, 539], [539, 550], [550, 561], [561, 572], [572, 583], [583, 594], [594, 605], [605, 616], [616, 627], [627, 638], [638, 649], [649, 660], [660, 671], [671, 682], [682, 693], [693, 704], [704, 715], [715, 726], [726, 737], [737, 748], [748, 759], [759, 770], [770, 781], [781, 792], [792, 803], [803, 814], [814, 825], [825, 836], [836, 847], [847, 858], [858, 869], [869, 880], [880, 891], [891, 902], [902, 913], [913, 924], [924, 935], [935, 946], [946, 957], [957, 968], [968, 979], [979, 990],[1, 11], [2, 12], [3, 13], [4, 14], [5, 15], [6, 16], [7, 17], [8, 18], [9, 19], [10, 20], [12, 22], [22, 55], [55, 64], [64, 77], [77, 88], [88, 99], [99, 110], [110, 121], [121, 132], [132, 143], [143, 154], [154, 165], [165, 176], [176, 187], [187, 198], [198, 209], [209, 220], [220, 231], [231, 242], [242, 253], [253, 264], [264, 275], [275, 286], [286, 297], [297, 308], [308, 319], [319, 330], [330, 341], [341, 352], [352, 363], [363, 374], [374, 385], [385, 396], [396, 407], [407, 418], [418, 429], [429, 440], [440, 451], [451, 462], [462, 473], [473, 484], [484, 495], [495, 506], [506, 517], [517, 528], [528, 539], [539, 550], [550, 561], [561, 572], [572, 583], [583, 594], [594, 605], [605, 616], [616, 627], [627, 638], [638, 649], [649, 660], [660, 671], [671, 682], [682, 693], [693, 704], [704, 715], [715, 726], [726, 737], [737, 748], [748, 759], [759, 770], [770, 781], [781, 792], [792, 803], [803, 814], [814, 825], [825, 836], [836, 847], [847, 858], [858, 869], [869, 880], [880, 891], [891, 902], [902, 913], [913, 924], [924, 935], [935, 946], [946, 957], [957, 968], [968, 979], [979, 990],[1, 11], [2, 12], [3, 13], [4, 14], [5, 15], [6, 16], [7, 17], [8, 18], [9, 19], [10, 20], [12, 22], [22, 55], [55, 64], [64, 77], [77, 88], [88, 99], [99, 110], [110, 121], [121, 132], [132, 143], [143, 154], [154, 165], [165, 176], [176, 187], [187, 198], [198, 209], [209, 220], [220, 231], [231, 242], [242, 253], [253, 264], [264, 275], [275, 286], [286, 297], [297, 308], [308, 319], [319, 330], [330, 341], [341, 352], [352, 363], [363, 374], [374, 385], [385, 396], [396, 407], [407, 418], [418, 429], [429, 440], [440, 451], [451, 462], [462, 473], [473, 484], [484, 495], [495, 506], [506, 517], [517, 528], [528, 539], [539, 550], [550, 561], [561, 572], [572, 583], [583, 594], [594, 605], [605, 616], [616, 627], [627, 638], [638, 649], [649, 660], [660, 671], [671, 682], [682, 693], [693, 704], [704, 715], [715, 726], [726, 737], [737, 748], [748, 759], [759, 770], [770, 781], [781, 792], [792, 803], [803, 814], [814, 825], [825, 836], [836, 847], [847, 858], [858, 869], [869, 880], [880, 891], [891, 902], [902, 913], [913, 924], [924, 935], [935, 946], [946, 957], [957, 968], [968, 979], [979, 990]]
//  generatePoints(listOfPoints, numOfPoints);

const Chart = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [responseData,setResponseData]=useState();
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

  useEffect(()=>{
    const useAPI=async()=>
    {
      fetch("http://testingapps.pythonanywhere.com/fieldrp/", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    side: 20,
    selection: 5,
    choice: 0,
    value: 10,
  }),
})
  .then((response) => response.json())
  .then((data) => {
    // Handle the response data here
    console.log(data);
    setData(data.listOfPoints);
  })
  .catch((error) => {
    // Handle any errors that occurred during the request
    console.error(error);
  });
    
    }
    useAPI();
  },[responseData])
  useEffect(() => {
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


