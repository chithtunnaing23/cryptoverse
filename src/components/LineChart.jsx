import React from 'react';
import { Typography, Row} from 'antd';
import millify from 'millify';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const {Title, Text} = Typography;

const LineChart = ({currencyName, currencyHistory, currentPrice}) => {

  if(!currencyHistory?.data) return 'Loading ...';
  const timeStamps = [];
  const cryptoPrices = [];

  for (let i = currencyHistory.data?.history?.length - 1; i >= 0 && i !== undefined; i--){
    timeStamps.push(new Date(currencyHistory.data.history[i].timestamp * 1000).toLocaleDateString());
    cryptoPrices.push(currencyHistory.data.history[i].price);
  }
  const data = {
    labels: timeStamps,
    datasets: [{
      label: 'Price in USD',
      backgroundColor: '#0071bd',
      borderColor: '#0071bd',
      data: cryptoPrices,
      fill: false
    }]
  };

  const options = {
    scales: {
      y: {beginAtZero: false}
    },
  };

  return (
      <Row className='chart-header'>
        <Title level={3} className='chart-title'>
          {currencyName} Price Chart
        </Title>
        <Text className='price-container price-change'>
          {currencyHistory.data.change}% <span style={{marginLeft: 5}}>Current {currencyName} Price: $ {millify(currentPrice)}</span>
        </Text>
        <Line data={data} options={options}/>
      </Row>
  )
};

export default LineChart;
