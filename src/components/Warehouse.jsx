import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { KEYS } from '~/constants/keys';
import { getAllProducts } from '~/services';
import { getAllKho } from '~/services/warehouse.service';

export default function Warehouse() {
    const { data, error, isLoading } = useQuery({
        queryKey: [KEYS.GET_ALL_KHO],
        queryFn: () => getAllKho(),
        staleTime: 1000 * 60 * 5,
    });

    return (
        <div
            style={{
                maxHeight: '80vh' /* Chiều cao tối đa của bảng */,
                overflowY: 'auto' /* Cuộn dọc khi dữ liệu quá nhiều */,
                width: '100%',
            }}
        >
            <Button>Thêm Kho</Button>
            <Table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                }}
            >
                <thead>
                    <tr>
                        <th
                            style={{
                                position: 'sticky',
                                top: 0,
                                backgroundColor:
                                    '#f0f0f0' /* Nền cố định cho tiêu đề */,
                                zIndex: 1,
                            }}
                        >
                            STT
                        </th>
                        <th
                            style={{
                                position: 'sticky',
                                top: 0,
                                backgroundColor: '#f0f0f0',
                                zIndex: 1,
                            }}
                        >
                            Mã kho
                        </th>
                        <th
                            style={{
                                position: 'sticky',
                                top: 0,
                                backgroundColor: '#f0f0f0',
                                zIndex: 1,
                            }}
                        >
                            Địa chỉ
                        </th>
                        <th
                            style={{
                                position: 'sticky',
                                top: 0,
                                backgroundColor: '#f0f0f0',
                                zIndex: 1,
                            }}
                        >
                            Diện tích
                        </th>
                        <th
                            style={{
                                position: 'sticky',
                                top: 0,
                                backgroundColor: '#f0f0f0',
                                zIndex: 1,
                            }}
                        >
                            Số lượng khu
                        </th>
                        <th
                            style={{
                                position: 'sticky',
                                top: 0,
                                backgroundColor: '#f0f0f0',
                                zIndex: 1,
                            }}
                        >
                            Số lượng sản phẩm
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* {!isLoading &&
                        data?.data?.map((prod, index) => {
                            const totalSoLuong =
                                prod.chiTietSanPhamResList.reduce(
                                    (total, item) => total + item.soLuong,
                                    0
                                );

                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{prod.ten}</td>
                                    <td>{prod.loai}</td>
                                    <td>{totalSoLuong}</td>
                                    <td>
                                        <Button
                                            className="rounded"
                                            variant="info"
                                            onClick={() => deleteClick(prod)}
                                        >
                                            Chi Tiết
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })} */}
                    {!isLoading &&
                        data?.data?.map((prod, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{prod.maKho}</td>
                                <td>{prod.diaChi}</td>
                                <td>{prod.dienTich} m2</td>
                                <td>{prod.soLuongKhu}</td>
                                <td>{prod.soLuong}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>
    );
}
