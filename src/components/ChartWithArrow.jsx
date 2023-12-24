import { useEffect } from 'react';
import { Line } from 'react-chartjs-2';

const LineChartWithArrow = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [50, 55, 70, 80, 60],
        borderColor: 'blue',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      annotation: {
        annotations: {
          arrow: {
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-axis-0',
            value: 'May',
            borderColor: 'red',
            borderWidth: 2,
            label: {
              content: 'Arrow',
              enabled: true,
              position: 'bottom',
            },
          },
        },
      },
    },
  };

  useEffect(() => {
    // Custom arrow drawing logic using the afterDraw hook
    const ctx = document.getElementById('arrow-chart').getContext('2d');
    const xAxis = ctx.canvas.scales['x-axis-0'];

    const xEnd = xAxis.getPixelForValue('May');
    const yEnd = ctx.canvas.height;

    ctx.beginPath();
    ctx.moveTo(xEnd - 10, yEnd - 10);
    ctx.lineTo(xEnd, yEnd);
    ctx.lineTo(xEnd + 10, yEnd - 10);
    ctx.stroke();
  }, []);

  return <Line id="arrow-chart" data={data} options={options} />;
};

export default LineChartWithArrow;
