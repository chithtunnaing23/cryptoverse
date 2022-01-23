import React, {useState} from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text, Title } = Typography;
const { Option } = Select;
const demoImageUrl = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({simplified}) => {
    const [searchData, setSearchData] = useState('cryptocurrency');
    const {data: cryptoNewsData} = useGetCryptoNewsQuery({newsCategory: searchData, count: simplified? 6 : 12});
    const {data: cryptoList} = useGetCryptosQuery(100);
    if(!cryptoNewsData?.value) return 'Loading...';
    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className='select-news'
                        placeholder='Select a crypto'
                        onChange={(value) => setSearchData(value)}
                    >
                    <Option value='cryptocurrency'>Cryptocurrency</Option>
                    {cryptoList?.data?.coins?.map((crypto) => (
                        <Option value={crypto.name}>{crypto.name}</Option>
                    ))}
                    </Select>
                </Col>
            )}
            {cryptoNewsData.value.map((news, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                    <Card hoverable className='news-card'>
                        <a href={news.url} target='_blank' rel='noreferrer'>
                            <div className='news-image-container'>
                                <Title className='news-title' level={4}>{news.name}</Title>
                                <img style={{maxHeight: '80px', maxWidth: '80px'}} src={news.image?.thumbnail?.contentUrl || demoImageUrl} alt='news'/>
                            </div>
                            <p>
                                {news.description.length > 200? `${news.description.substring(0, 200)} ...` : news.description}
                            </p>
                            <div className='provider-container'>
                                <div>
                                    <Avatar size='small' src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImageUrl} alt='news-provider' />
                                    <Text className='provider-name'>{news.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('seconds').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News
