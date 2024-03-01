/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */


import React from 'react';

const RandomGraph = ({ data }) => {
  const side = data?.input_data.side;
  const listOfPoints = data.listOfPoints;
  const pixelsPerCm = 38; // Approximation of 1cm in pixels
  const padding = 40; // Padding around the SVG content, in pixels
  const halfSide = side / 2;
  const svgSize = side * pixelsPerCm + padding * 2; // Dynamic SVG size based on side

  // Initial viewBox state
 // Initial viewBox state
 const [viewBox, setViewBox] = React.useState({ minX: 0, minY: 0, width: svgSize, height: svgSize });
 const [isPanning, setIsPanning] = React.useState(false);
 const [startPan, setStartPan] = React.useState({ x: null, y: null });
  // Convert data points to SVG coordinates
  const points = listOfPoints.map(([x, y]) => ({
    x: (x + halfSide) * pixelsPerCm + padding,
    y: svgSize - ((y + halfSide) * pixelsPerCm + padding),
  }));

  // SVG path for the line
  const pathData = points.map((point, i) => `${i === 0 ? 'M' : 'L'} ${point.x},${point.y}`).join(' ');

  // Generate axis numbers
  const axisNumbers = Array.from({ length: side + 1 }, (_, i) => i - halfSide).filter(n => n !== 0);

  // Function to update the viewBox for zooming
  const zoom = (inOrOut) => {
    const factor = inOrOut === 'in' ? 0.8 : 1.2; // Zoom in or out
    const newWidth = viewBox.width * factor;
    const newHeight = viewBox.height * factor;
    const newMinX = viewBox.minX + (viewBox.width - newWidth) / 2;
    const newMinY = viewBox.minY + (viewBox.height - newHeight) / 2;
    setViewBox({
      minX: newMinX,
      minY: newMinY,
      width: newWidth,
      height: newHeight
    });
  };

   // Start panning
   const startPanning = (event) => {
    setIsPanning(true);
    setStartPan({ x: event.clientX, y: event.clientY });
  };

  // End panning
  const endPanning = () => {
    setIsPanning(false);
    setStartPan({ x: null, y: null });
  };

  // Perform panning
  const pan = (event) => {
    if (isPanning) {
      const dx = (event.clientX - startPan.x) * (viewBox.width / svgSize);
      const dy = (event.clientY - startPan.y) * (viewBox.height / svgSize);
      setViewBox({
        minX: viewBox.minX - dx,
        minY: viewBox.minY - dy,
        width: viewBox.width,
        height: viewBox.height,
      });
      setStartPan({ x: event.clientX, y: event.clientY });
    }
  };


  return (
    <div className="w-full">
      <button onClick={() => zoom('in')}>+</button>
      <button onClick={() => zoom('out')}>- </button>
      {/* <svg width={svgSize} height={svgSize} viewBox={viewBox}> */}
      <svg
        width="100%"
        height="100%"
        viewBox={`${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height}`}
        onMouseDown={startPanning}
        onMouseMove={pan}
        onMouseUp={endPanning}
        onMouseLeave={endPanning}
        style={{ border: '1px solid black', cursor: isPanning ? 'grabbing' : 'grab' }}
      >
        {/* Grid lines */}
        {axisNumbers.map((num) => (
          <React.Fragment key={num}>
            <line x1={padding} y1={(num + halfSide) * pixelsPerCm + padding} x2={svgSize - padding} y2={(num + halfSide) * pixelsPerCm + padding} stroke="#e0e0e0" />
            <line x1={(num + halfSide) * pixelsPerCm + padding} y1={padding} x2={(num + halfSide) * pixelsPerCm + padding} y2={svgSize - padding} stroke="#e0e0e0" />
          </React.Fragment>
        ))}
        {/* Horizontal and Vertical lines */}
        <line x1={padding} y1={svgSize / 2} x2={svgSize - padding} y2={svgSize / 2} stroke="black" />
        <line x1={svgSize / 2} y1={padding} x2={svgSize / 2} y2={svgSize - padding} stroke="black" />
        {/* Data path */}
        <path d={pathData} fill="none" stroke="blue" />
        {/* Axis numbers */}
        {axisNumbers.filter(n => n !== 0).map((num) => (
          <React.Fragment key={num}>
            <text x={(num + halfSide) * pixelsPerCm + padding} y={svgSize / 2 + 15} fontSize="12" textAnchor="middle">
              {num}
            </text>
            <text x={svgSize / 2 + 5} y={svgSize - (num + halfSide) * pixelsPerCm - padding + 5} fontSize="12" textAnchor="middle">
              {num}
            </text>
          </React.Fragment>
        ))}
        {/* Points with hover titles */}
        {points.map((point, index) => (
          <circle key={index} cx={point.x} cy={point.y} r={3} fill="red">
            <title>{`X: ${listOfPoints[index][0]}, Y: ${listOfPoints[index][1]}`}</title>
          </circle>
        ))}
      </svg>
    </div>
  );
};

export default RandomGraph;