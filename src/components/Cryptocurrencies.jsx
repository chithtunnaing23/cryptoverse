import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input} from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified? 10 : 100;
    const { data: cryptoData, isFetching } = useGetCryptosQuery(count);
    const [ cryptos, setCryptos ] = useState(cryptoData?.data?.coins);
    const [ searchData, setSearchData ] = useState('');

    useEffect(() => {
        const filteredData = cryptoData?.data?.coins.filter((coin) => (coin.name.toLowerCase().includes(searchData.toLowerCase())));
        setCryptos(filteredData);
    }, [cryptoData, searchData])
    
    if(isFetching) return 'Loading ...';
    return (
        <>
            {!simplified && <div className="search-crypto">
                <Input placeholder="Search cryptocurrency" onChange={(e) => setSearchData(e.target.value)}/>
            </div>}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((currency) => {
                    return(
                        <Col xs={24} sm={12} lg={8} className='crypto-card' key={currency.uuid}>
                            <Link to={`/crypto/${currency.uuid}`}>
                                <Card
                                    title={`${currency.rank}. ${currency.name}`}
                                    extra={<img className="crypto-image" src={currency.iconUrl} alt='coin icon'/>}
                                    hoverable
                                >
                                    <p>Price: {millify(currency.price)}</p>
                                    <p>Market Cap: {millify(currency.marketCap)}</p>
                                    <p>Daily Change: {millify(currency.change)}</p>
                                </Card>  
                            </Link>
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}

export default Cryptocurrencies
