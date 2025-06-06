// import React from 'react';
// import { useQuery, gql } from '@apollo/client';
// import { Card, Spinner, Alert } from 'react-bootstrap';
// import { Line } from 'react-chartjs-2';
// import { GET_STOCKS } from '../constants';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );


// const AppStockChart = () => {
//   const { data, loading, error } = useQuery(GET_STOCKS);

//   if (loading) return <Spinner animation="border" variant="primary" />;
//   if (error) return <Alert variant="danger">Error loading stock data</Alert>;

//   const stocks = data.getUserStocks;

//   // Format x-axis labels as "Month Year" (e.g., "Jan 2024")
//   const labels = stocks.map((item) => `${item.month} ${item.year}`);

//   const chartData = {
//     labels,
//     datasets: [
//       {
//         label: 'Stock In',
//         data: stocks.map((item) => item.stockIn),
//         borderColor: 'rgba(75,192,192,1)',
//         backgroundColor: 'rgba(75,192,192,0.2)',
//         tension: 0.3,
//         fill: true,
//       },
//       {
//         label: 'Stock Out',
//         data: stocks.map((item) => item.stockOut),
//         borderColor: 'rgba(255,99,132,1)',
//         backgroundColor: 'rgba(255,99,132,0.2)',
//         tension: 0.3,
//         fill: true,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Monthly Stock In vs Out',
//       },
//     },
//   };

//   return (
//     <Card style={{width: '70%', height: '70%', marginTop: 100, marginLeft: 50, display: 'block', borderRadius: 10 }}>
//       <Card.Body>
//         <Card.Title>Stock Overview</Card.Title>
//         <Line data={chartData} options={chartOptions} />
//       </Card.Body>
//     </Card>
//   );
// };

// export default AppStockChart;

import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { Card, Alert } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { GET_STOCKS } from '../constants';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AppStockChart = () => {
  const { data, loading, error } = useQuery(GET_STOCKS, {
    fetchPolicy: 'cache-first',
  });

  const stocks = data?.getUserStocks ?? [];

  const labels = useMemo(() => {
    return stocks.map((item) => `${item.month} ${item.year}`);
  }, [stocks]);

  const chartData = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: 'Stock In',
          data: stocks.map((item) => item.stockIn),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
        {
          label: 'Stock Out',
          data: stocks.map((item) => item.stockOut),
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
  }, [stocks, labels]);

  const chartOptions = useMemo(() => {
    return {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: (context) => `${context.dataset.label}: ${context.parsed.y}`,
          },
        },
        title: {
          display: true,
          text: 'Stock Movement by Month',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Stock Quantity' },
        },
        x: {
          title: { display: true, text: 'Month' },
        },
      },
    };
  }, []);

  if (error) {
    return <div style={{
        width: '60%',
        height: 400,
        marginTop: 0,
        marginLeft: 240,
        display: 'block',
        borderRadius: 10,
      }}><Alert variant="danger">Error loading stock data</Alert></div>
  }

  return (
    <Card
      style={{
        width: '60%',
        height: 400,
        marginTop: 0,
        marginLeft: 240,
        display: 'block',
        borderRadius: 10,
      }}
      className="shadow-sm"
    >
      <Card.Body>
        <Card.Title>Stock Overview</Card.Title>
        {loading ? (
          <div>
            <Skeleton height={30} width={150} className="mb-3" />
            <Skeleton height={300} />
          </div>
        ) : (
          <Bar data={chartData} options={chartOptions} />
        )}
      </Card.Body>
    </Card>
  );
};

export default AppStockChart;


