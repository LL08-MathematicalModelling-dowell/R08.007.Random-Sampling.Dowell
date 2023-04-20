import { useState, useRef, useEffect } from "react";
import * as d3 from "d3";

const Chart = () => {
	const [data, setData] = useState([
		[-1, -1],
		[1, 2],
		[1, -1],
		[3, 4],
		[5, 4],
		[6, 3],
	]);
	
	const [xScale, setXScale] = useState(null);
	const [yScale, setYScale] = useState(null);

	useEffect(() => {
		// Setting up container
		const w = 450;
		const h = 400;
		const svg = d3.select(svgRef.current)
			.attr("width", w)
			.attr("height", h)
			.style('overflow', 'visible')
			.style('margin-top', '20px');


		const xScale = d3.scaleLinear()
			.domain([-10, 10])
			.range([0, w]);
		setXScale(xScale);


		const yScale = d3.scaleLinear()
			.domain([-10, 10])
			.range([h, 0]);
		setYScale(yScale);

		// Setting up axis
		const xAxis = d3.axisBottom(xScale)
			.ticks(11)
			.tickPadding(10)
			.tickSizeOuter(0);

		const yAxis = d3.axisLeft(yScale)
			.ticks(11)
			.tickPadding(10)
			.tickSizeOuter(0);
		svg.append("g")
			.call(xAxis)
			.attr("transform", `translate(0, ${h / 2})`);
		svg.append("g")
			.call(yAxis)
			.attr("transform", `translate(${w / 2}, 0)`);

		// Setting up SVG Data
		const line = d3.line()
			.x(function (d) { return xScale(d[0]); })
			.y(function (d) { return yScale(d[1]); });

		// Create an arrowhead symbol
		const arrowhead = svg.append("defs")
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

		// Add a path element for the line
		svg.append("path")
			.datum(data)
			.attr("fill", "none")
			.attr("stroke", "steelblue")
			.attr("stroke-width", 2)
			.attr("d", line)
			.attr("marker-end", "url(#arrowhead)");

	}, [data]);

	const svgRef = useRef();

	return (
		<div className="mx-auto py-6">
			<svg ref={svgRef}></svg>
		</div>
	);
};

export default Chart;
