import { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import React, { Component } from "react";
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
var listOfPoints = [[1, 2], [2, 0]];
var numOfPoints = 2000;


const Chart = () => {
var generatedPoints = generatePoints(listOfPoints, numOfPoints);

  const [data, setData] = useState(generatedPoints);
  const [limit,setLimit]=useState(numOfPoints);

  const [xScale, setXScale] = useState(null);
  const [yScale, setYScale] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  
   

  const viewBoxOut = `0 0 ${400 * zoomLevel} ${400 * zoomLevel}`; 


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

    ;

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


    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d[0]))
      .attr("cy", d => yScale(d[1]))
      .attr("r", 4)
      .style("fill", "steelblue")
      .on("mouseover", (event, d) => {
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 0.9);
        tooltip
          .html(`(${d[0]}, ${d[1]})`)
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(200).style("opacity", 0);
      });
  }, [data, xScale, yScale]);

  const svgRef = useRef();

  useEffect(() => {
    if (xScale && yScale) {
      const svg = d3.select(svgRef.current);
      svg
        .selectAll("circle")
        .attr("cx", d => xScale(d[0]))
        .attr("cy", d => yScale(d[1]));
    }
  }, [xScale, yScale, zoomLevel]);

  return (
    <div className="mx-auto py-6">
      <TransformWrapper
      initialScale={1}
      initialPositionX={200}
      initialPositionY={100}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          <div style={{display:"flex",gap:"2pc",justifyContent:"center"}}>
            <button onClick={() => zoomIn()}>+</button>
            <button onClick={() => zoomOut()}>-</button>
            <button onClick={() => resetTransform()}>x</button>
          </div>
          <TransformComponent>
          <svg ref={svgRef} style={{width:"30pc",marginRight:"35pc",marginBottom:"10pc"}} viewBox={zoomIn && !zoomOut ? `0 0 ${viewBoxSize} ${viewBoxSize}`:`${viewBoxOut}`} ></svg>
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
    
    </div>
    
  );
};

export default Chart;
