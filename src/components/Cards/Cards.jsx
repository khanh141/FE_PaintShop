import React from 'react';
import './Cards.css';
import Card from '../Card/Card';
import { cardsData } from '~/constants';
import { getStatement } from '~/services';
import { KEYS } from '~/constants/keys';
import { useQuery } from '@tanstack/react-query';

const Cards = () => {
    const { data, isLoading } = useQuery({
        queryKey: [KEYS.GET_ALL_STATEMENT],
        queryFn: () => getStatement(),
    });

    function sortDateTime(dataTime, order = 'asc') {
        return dataTime.sort((a, b) => {
            const dateA = new Date(a);
            const dateB = new Date(b);

            return order === 'asc' ? dateA - dateB : dateB - dateA;
        });
    }

    const dataStatement = data?.data?.map((prod) => prod.tongTien) || [];
    const dataTime = data?.data?.map((prod) => prod.thoiGian + 'Z') || [];
    // console.log('ahsjhaj', dataTime);

    return (
        <div className="Cards">
            {cardsData.map((card, id) => {
                const updatedCard = {
                    ...card,
                    series: [
                        {
                            ...card.series[0],
                            data: dataStatement,
                        },
                    ],
                };

                return (
                    <div className="parentContainer" key={id}>
                        <Card
                            id={id} // Truyền id vào Card
                            title={updatedCard.title}
                            color={updatedCard.color}
                            barValue={updatedCard.barValue}
                            value={updatedCard.value}
                            png={updatedCard.png}
                            series={updatedCard.series}
                            dataTime={sortDateTime(dataTime)} // Sử dụng dữ liệu đã được cập nhật
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Cards;
