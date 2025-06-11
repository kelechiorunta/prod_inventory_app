// import React, { useEffect, useMemo, useState } from 'react';
// import { Card, Button } from 'react-bootstrap';
// import { useQuery, useMutation, gql } from '@apollo/client';
// import Skeleton from 'react-loading-skeleton';
// import { Chart as ChartJS, Tooltip, Legend } from 'chart.js';
// import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
// import { Chart } from 'react-chartjs-2';
// import { GET_WEEKLY_SALES, RECORD_SALE } from '../constants.js';

// ChartJS.register(MatrixController, MatrixElement, Tooltip, Legend);


// const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
// const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

// const AppWeeklySalesReport = () => {
//   const [weekRange] = useState('Aug 19-25');
//   const { data, loading, refetch } = useQuery(GET_WEEKLY_SALES, {
//     variables: { weekRange },
//     pollInterval: 10000,
//   });

//   const [recordSale] = useMutation(RECORD_SALE);

//   const handleDummySale = async () => {
//     const day = days[Math.floor(Math.random() * days.length)];
//     const hour = hours[Math.floor(Math.random() * hours.length)];
//     const amount = Math.floor(Math.random() * 2000) + 100;
//     await recordSale({ variables: { weekRange, day, hour, amount } });
//     refetch();
//   };

//   const matrixData = useMemo(() => {
//     if (!data?.getWeeklySalesReport?.slots) return [];
  
//     return data.getWeeklySalesReport.slots.map((slot) => {
//       const x = days.indexOf(slot.day);
//       const y = hours.indexOf(slot.hour);
//       if (x === -1 || y === -1) return null; // skip invalid
//       return { x, y, v: slot.value };
//     }).filter(Boolean);
//   }, [data]);

//   const chartData = {
//     datasets: [
//       {
//         label: 'Weekly Sales',
//         data: matrixData,
//         backgroundColor(context) {
//             const point = context.dataset?.data?.[context.dataIndex];
//             const value = point?.v ?? 0; // default to 0 if undefined
          
//             if (value > 1000) return '#03588C';
//             if (value > 500) return '#1DA8D4';
//             return '#A8E9FF';
//           },
          
//         borderWidth: 1,
//         width: () => 40,
//         height: () => 35,
//       },
//     ],
//   };

//   const options = {
//     maintainAspectRatio: false,
//     plugins: {
//       tooltip: {
//         callbacks: {
//           label: (ctx) => `Sales: ${ctx?.raw?.v}`,
//         },
//       },
//     },
//     scales: {
//       x: {
//         type: 'category',
//         labels: days,
//         offset: true,
//         grid: { display: false },
//         title: { display: true, text: 'Day' },
//       },
//       y: {
//         type: 'category',
//         labels: hours,
//         offset: true,
//         reverse: true,
//         grid: { display: false },
//         title: { display: true, text: 'Hour' },
//       },
//     },
//   };

//   return (
//     <Card className="shadow-sm" style={{ width: '80%', margin: '40px auto', padding: '20px' }}>
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h5><strong>Weekly Sales</strong></h5>
//         <Button onClick={handleDummySale}>+ Random Sale</Button>
//       </div>
//       {loading ? (
//         <Skeleton height={400} />
//       ) : (
//         <div style={{ height: 400 }}>
//           <Chart type="matrix" data={chartData} options={options} />
//         </div>
//       )}
//       <div className="mt-3 text-center text-muted small">
//         <span className="me-3"><span style={{ background: '#A8E9FF', padding: '0 10px' }}></span> 0–500</span>
//         <span className="me-3"><span style={{ background: '#1DA8D4', padding: '0 10px' }}></span> 501–1,000</span>
//         <span><span style={{ background: '#03588C', padding: '0 10px' }}></span> 1,001–5,000</span>
//       </div>
//     </Card>
//   );
// };

// export default AppWeeklySalesReport;

import React, { useEffect, useMemo, useState } from 'react';
import {
  Card,
  Button,
  Modal,
  Form,
} from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import Skeleton from 'react-loading-skeleton';
import { Chart as ChartJS, Tooltip, Legend } from 'chart.js';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import { Chart } from 'react-chartjs-2';
import { GET_WEEKLY_SALES, RECORD_SALE } from '../constants.js';

ChartJS.register(MatrixController, MatrixElement, Tooltip, Legend);

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

const AppWeeklySalesReport = () => {
  const [weekRange] = useState('Aug 19-25');
  const [year] = useState(2025); // Update as needed
  const { data, loading, refetch } = useQuery(GET_WEEKLY_SALES, {
    variables: { weekRange },
    pollInterval: 10000,
  });

  const [recordSale] = useMutation(RECORD_SALE);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    day: days[0],
    hour: hours[0],
    amount: 1000,
  });

  const handleDummySale = async () => {
    const day = days[Math.floor(Math.random() * days.length)];
    const hour = hours[Math.floor(Math.random() * hours.length)];
    const amount = Math.floor(Math.random() * 2000) + 100;

    try {
      await recordSale({ variables: { weekRange, year, day, hour, amount } });
      refetch();
    } catch (error) {
      console.error("Failed to record dummy sale:", error.message);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await recordSale({
        variables: {
          ...formData,
          weekRange,
          year,
        },
      });
      refetch();
      handleCloseModal();
    } catch (error) {
      console.error("Failed to submit sale:", error.message);
    }
  };

  const matrixData = useMemo(() => {
    if (!data?.getWeeklySalesReport?.slots) return [];
  
    return data.getWeeklySalesReport.slots.map((slot) => ({
      x: slot.day,
      y: slot.hour,
      v: slot.value,
    }));
  }, [data]);  

  const chartData = {
    datasets: [
      {
        label: 'Weekly Sales',
        data: matrixData,
        backgroundColor(context) {
          const point = context.dataset?.data?.[context.dataIndex];
          const value = point?.v ?? 0;

          if (value > 1000) return '#03588C';
          if (value > 500) return '#1DA8D4';
          return '#A8E9FF';
        },
        borderWidth: 1,
        width: () => 45,
        height: () => 40,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx) => `Sales: ${ctx?.raw?.v}`,
        },
      },
      legend: { display: false },
    },
    scales: {
        x: {
          type: 'category',
          labels: days,
          offset: true,
          grid: { display: false },
          title: { display: true, text: 'Day' },
        },
        y: {
          type: 'category',
          labels: hours,
          offset: true,
          reverse: true,
          grid: { display: false },
          title: { display: true, text: 'Hour' },
        },
      }      
  };

  return (
    <>
      <Card
        className="shadow-sm"
        style={{ width: '80%', margin: '40px auto', padding: '20px' }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5><strong>Weekly Sales</strong></h5>
          <div>
            <Button variant="outline-primary" className="me-2" onClick={handleDummySale}>
              + Random Sale
            </Button>
            <Button variant="primary" onClick={handleShowModal}>
              + New Sale
            </Button>
          </div>
        </div>

        {loading ? (
          <Skeleton height={400} />
        ) : (
          <div style={{ height: 400 }}>
            <Chart type="matrix" data={chartData} options={options} />
          </div>
        )}

        <div className="mt-3 text-center text-muted small">
          <span className="me-3">
            <span style={{ background: '#A8E9FF', padding: '0 10px' }}></span> 0–500
          </span>
          <span className="me-3">
            <span style={{ background: '#1DA8D4', padding: '0 10px' }}></span> 501–1,000
          </span>
          <span>
            <span style={{ background: '#03588C', padding: '0 10px' }}></span> 1,001+
          </span>
        </div>
      </Card>

      {/* Modal for manual sale entry */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Record New Sale</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="day">
              <Form.Label>Day</Form.Label>
              <Form.Select name="day" value={formData.day} onChange={handleChange}>
                {days.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="hour">
              <Form.Label>Hour</Form.Label>
              <Form.Select name="hour" value={formData.hour} onChange={handleChange}>
                {hours.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                min="1"
                required
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AppWeeklySalesReport;

