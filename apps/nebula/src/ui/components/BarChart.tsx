// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// );

// ChartJS.defaults.scale.grid.drawOnChartArea = false;

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' as const,
//       display: false,
//     },
//   },
// };

// export const mqlData = {
//   labels: [
//     'Facebook',
//     'Twitter',
//     'LinkedIn',
//     'Capterra',
//     'Blog',
//     'Affiliate',
//     'Events',
//     'Email',
//     'Products',
//   ],
//   datasets: [
//     {
//       data: [365, 159, 280, 220, 156, 45, 200, 420, 140],
//       backgroundColor: [
//         '#FE7C61',
//         '#FE7C61',
//         '#FE7C61',
//         '#FE7C61',
//         '#FE7C61',
//         '#FE7C61',
//         '#FE7C61',
//       ],
//     },
//   ],
// };

// export const revenueData = {
//   labels: [
//     'Facebook',
//     'Twitter',
//     'LinkedIn',
//     'Capterra',
//     'Blog',
//     'Affiliate',
//     'Events',
//     'Email',
//     'Products',
//   ],
//   datasets: [
//     {
//       data: [9452, 12982, 18912, 7542, 8912, 25612, 3910, 11021, 7231],
//       backgroundColor: [
//         '#0ea5e9',
//         '#0ea5e9',
//         '#0ea5e9',
//         '#0ea5e9',
//         '#0ea5e9',
//         '#0ea5e9',
//         '#0ea5e9',
//       ],
//     },
//   ],
// };

// export default function BarChart({ type }: { type: string }) {
//   return (
//     <Bar options={options} data={type === 'leads' ? mqlData : revenueData} />
//   );
// }

export default {};
