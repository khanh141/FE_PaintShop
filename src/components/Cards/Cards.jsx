import React from 'react';
import './Cards.css';
import Card from '../Card/Card';
import { cardsData } from '~/constants';
import {
    getStatement,
    getThongKePhieuNhap,
    getThongKePhieuXuat,
} from '~/services';
import { KEYS } from '~/constants/keys';
import { useQuery } from '@tanstack/react-query';

const Cards = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: [KEYS.GET_ALL_STATEMENT],
        queryFn: () => getStatement(),
    });

    const { data: phieuNhapData } = useQuery({
        queryKey: [KEYS.GET_ALL_PHIEU_NHAP],
        queryFn: getThongKePhieuNhap,
    });

    const { data: phieuXuatData } = useQuery({
        queryKey: [KEYS.GET_ALL_PHIEU_XUAT],
        queryFn: getThongKePhieuXuat,
    });

    const dataByDatePhieuNhap = phieuNhapData?.data?.length
        ? phieuNhapData.data.reduce((acc, prod) => {
              const dateKey = new Date(prod.thoiDiem)
                  .toISOString()
                  .split('T')[0];
              if (!acc[dateKey]) {
                  acc[dateKey] = {
                      totalAmount: prod.soLuongNhapThem,
                      firstTime: prod.thoiDiem,
                  }; // Khởi tạo với tổng tiền và thời gian đầu tiên
              } else {
                  acc[dateKey].totalAmount += prod.soLuongNhapThem; // Cộng tổng tiền
              }
              return acc;
          }, {})
        : {};

    // Chuyển đối tượng thành mảng và sắp xếp theo thoiDiem (firstTime)
    const dataArray1 = Object.entries(dataByDatePhieuNhap)
        .map(([dateKey, value]) => ({
            totalAmount: value.totalAmount,
            firstTime: value.firstTime,
        }))
        .sort((a, b) => new Date(a.firstTime) - new Date(b.firstTime)); // Sắp xếp theo thời gian tăng dần

    //  console.log(dataArray1);

    const dataByDatePhieuXuat = phieuXuatData?.data?.length
        ? phieuXuatData.data.reduce((acc, prod) => {
              const dateKey = new Date(prod.thoiDiem)
                  .toISOString()
                  .split('T')[0];
              if (!acc[dateKey]) {
                  acc[dateKey] = {
                      totalAmount: 1,
                      firstTime: prod.thoiDiem,
                  }; // Khởi tạo với tổng tiền và thời gian đầu tiên
              } else {
                  acc[dateKey].totalAmount += 1; // Cộng tổng tiền
              }
              return acc;
          }, {})
        : {};
    //console.log(dataByDatePhieuXuat);

    // Chuyển đối tượng thành mảng và sắp xếp theo thoiDiem (firstTime)
    const dataArray2 = Object.entries(dataByDatePhieuXuat)
        .map(([dateKey, value]) => ({
            totalAmount: value.totalAmount,
            firstTime: value.firstTime,
        }))
        .sort((a, b) => new Date(a.firstTime) - new Date(b.firstTime));

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

    const dataArray = Object.entries(dataByDate)
        .map(([dateKey, value]) => ({
            totalAmount: value.totalAmount,
            firstTime: value.firstTime,
        }))
        .sort((a, b) => new Date(a.firstTime) - new Date(b.firstTime)); // Sắp xếp theo thời gian

    // console.log(dataArray);

    return (
        <div className="Cards">
            {cardsData.map((card, id) => {
                // Nếu tiêu đề là 'Nhập Hàng', sử dụng dataArray1 thay cho dataArray
                const updatedDataArray =
                    card.title === 'Nhập Hàng'
                        ? dataArray1
                        : card.title === 'Xuất Hàng'
                        ? dataArray2
                        : dataArray;

                const updatedCard = {
                    ...card,
                    value: updatedDataArray
                        .reduce((sum, item) => sum + item.totalAmount, 0)
                        .toLocaleString(),
                    series: [
                        {
                            ...card.series[0],
                            data: updatedDataArray.map(
                                (item) => item.totalAmount
                            ), // Sử dụng totalAmount
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
                            dataTime={updatedDataArray.map(
                                (item) => item.firstTime
                            )} // Sử dụng firstTime
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Cards;
