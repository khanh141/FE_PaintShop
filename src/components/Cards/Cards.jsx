import React from 'react';
import './Cards.css';
import Card from '../Card/Card';
import { cardsData } from '~/constants';
import { getStatement } from '~/services';
import { KEYS } from '~/constants/keys';
import { useQuery } from '@tanstack/react-query';

const Cards = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: [KEYS.GET_ALL_STATEMENT],
        queryFn: () => getStatement(),
    });

    // Kiểm tra trạng thái loading
    if (isLoading) {
        return <div>Loading...</div>; // Hiển thị thông báo loading
    }

    // Kiểm tra lỗi
    if (error) {
        return <div>Error loading data: {error.message}</div>; // Hiển thị thông báo lỗi
    }

    const dataByDate = data?.data?.reduce((acc, prod) => {
        const dateKey = new Date(prod.thoiGian).toISOString().split('T')[0]; // Lấy ngày trong định dạng yyyy-mm-dd

        // Nếu ngày chưa tồn tại trong acc, khởi tạo với tổng tiền ban đầu và thời gian đầu tiên
        if (!acc[dateKey]) {
            acc[dateKey] = {
                totalAmount: prod.tongTien,
                firstTime: prod.thoiGian,
            }; // Khởi tạo với tổng tiền và thời gian đầu tiên
        } else {
            acc[dateKey].totalAmount += prod.tongTien; // Cộng tổng tiền
        }

        return acc; // Trả về accumulator
    }, {});
    console.log(dataByDate);

    const dataArray = Object.entries(dataByDate).map(([dateKey, value]) => ({
        totalAmount: value.totalAmount,
        firstTime: value.firstTime,
    }));

    return (
        <div className="Cards">
            {cardsData.map((card, id) => {
                const updatedCard = {
                    ...card,
                    series: [
                        {
                            ...card.series[0],
                            data: dataArray.map((item) => item.totalAmount), // Sử dụng totalAmount
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
                            dataTime={dataArray.map((item) => item.firstTime)} // Sử dụng firstTime
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Cards;
