import React, { useState } from 'react';
import { Select, Col, Row, Typography, Collapse, Avatar } from 'antd';
import { useGetCryptosQuery, useGetCryptoExchangeQuery } from '../services/cryptoApi';
import millify from 'millify';

const { Option } = Select;
const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    const {data: cryptoList} = useGetCryptosQuery(100);
    const [searchData, setSearchData] = useState('Bitcoin, Qwsogvtv82FCd');
    const [coinName, coinId] = searchData.split(', ')
    const {data: exchangeList, isFetching} = useGetCryptoExchangeQuery(coinId);

    const formatPrice = (price) => {
        const floatPrice = parseFloat(price);
        let decimalPlace;
        if(floatPrice >= 1){
            decimalPlace = 2;
        } else if(floatPrice > 0.0001){
            decimalPlace = 4;
        } else {
            decimalPlace = 6;
        }
        return floatPrice.toFixed(decimalPlace);
    }

    return (
        <>
            <Row>
                <Col xs={24} md={8}>
                    <Select
                        showSearch
                        className='select-news'
                        placeholder='Select a crypto'
                        onChange={(value) => {setSearchData(value)}}
                    >
                    {cryptoList?.data?.coins?.map((crypto) => (
                        <Option value={`${crypto.name}, ${crypto.uuid}`}>{crypto.name}</Option>
                    ))}
                    </Select>
                </Col>
                <Col xs={12} md={8} className='exchange-header'>
                    Total 24-Hour Volume: {millify(exchangeList?.data?.stats['24hVolume'])}
                </Col>
                <Col xs={12} md={8} className='exchange-header'>
                    Total Exchanges: {exchangeList?.data?.stats.total}
                </Col>
            </Row>
            <Row style={{marginTop: 10}}>
                <Col span={6}>Exchanges</Col>
                <Col span={6}>24h Trade Volume</Col>
                <Col span={6}>Markets</Col>
                <Col span={6}>{coinName} Price in USD</Col>
            </Row>
            {isFetching && <p style={{marginTop: 10}}>Loading ...</p>}
            <Row>
            {!isFetching && exchangeList?.data?.exchanges?.map((exchange) => {
                return (
                <Col span={24} key={exchange.uuid}>
                    <Collapse>
                        <Panel
                            header={
                                <>
                                    <Col span={6}>
                                        <span>{exchange.rank}</span>
                                        <Avatar src={exchange.iconUrl} size='small' className='exchange-image'/>
                                        <Text>{exchange.name}</Text>
                                    </Col>
                                    <Col span={6}>{millify(exchange['24hVolume'])}</Col>
                                    <Col span={6}>{exchange.numberOfMarkets}</Col>
                                    <Col span={6}>$ {formatPrice(exchange.price)}</Col>
                                </>
                            }
                            key={exchange.uuid}
                            showArrow={false}
                        >
                            <a href={exchange.coinrankingUrl} target='_blank' rel='noreferrer'>
                                Learn more in Coin Ranking
                            </a>
                        </Panel>
                    </Collapse>
                </Col>)})}
            </Row>
        </>
    )
}

export default Exchanges
