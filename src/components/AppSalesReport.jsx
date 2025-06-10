import React, { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { Card, Alert } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { GET_SALES_REPORT } from '../constants';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title
);

const AppSalesReport = () => {
  const { data, loading, error } = useQuery(GET_SALES_REPORT, {
    fetchPolicy: 'cache-first',
  });

  const salesData = data?.getSalesReport ?? [];

  const labels = useMemo(() => [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ], []);

  const chartData = useMemo(() => ({
    labels,
    datasets: [
      {
        label: 'Direct Sales',
        data: salesData.map((s) => s.directSales),
        borderColor: '#00BFFF',
        backgroundColor: '#00BFFF',
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
      },
      {
        label: 'Retail',
        data: salesData.map((s) => s.retail),
        borderColor: '#8A2BE2',
        backgroundColor: '#8A2BE2',
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
      },
      {
        label: 'Wholesale',
        data: salesData.map((s) => s.wholesale),
        borderColor: '#FF1493',
        backgroundColor: '#FF1493',
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
      },
    ],
  }), [salesData]);

  const options = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { usePointStyle: true },
      },
      title: {
        display: true,
        text: 'Sales Report',
        font: {
          size: 18,
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Sales Volume',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
  }), []);

  if (error) {
    return (
      <Card style={{ width: '100%', marginLeft: 0, height: 400 }} className="shadow-sm mt-4">
        <Card.Body>
          <Alert variant="danger">Error loading sales report.</Alert>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card style={{ width: '100%', marginLeft: 0, height: 400, fontFamily: 'Cinzel' }} className="shadow-sm mt-4">
      <Card.Body>
        <Card.Title className="mb-4">Sales Report</Card.Title>
        {loading ? (
          <div>
            <Skeleton height={30} width={150} className="mb-3" />
            <Skeleton height={300} />
          </div>
        ) : (
          <Line data={chartData} options={options} height={'auto'} />
        )}
      </Card.Body>
    </Card>
  );
};

export default AppSalesReport;
