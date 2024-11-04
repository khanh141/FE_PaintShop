import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { KEYS } from '~/constants/keys';
import { getAllProducts } from '~/services';

export default function Warehouse() {
    const { data, error, isLoading } = useQuery({
        queryKey: [KEYS.GET_ALL_PRODUCTS],
        queryFn: () => getAllProducts(),
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
                            Tên sản phẩm
                        </th>
                        <th
                            style={{
                                position: 'sticky',
                                top: 0,
                                backgroundColor: '#f0f0f0',
                                zIndex: 1,
                            }}
                        >
                            Loại
                        </th>
                        <th
                            style={{
                                position: 'sticky',
                                top: 0,
                                backgroundColor: '#f0f0f0',
                                zIndex: 1,
                            }}
                        >
                            Số lượng
                        </th>
                        <th
                            style={{
                                position: 'sticky',
                                top: 0,
                                backgroundColor: '#f0f0f0',
                                zIndex: 1,
                            }}
                        ></th>
                    </tr>
                </thead>
                <tbody>
                    {!isLoading &&
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
                        })}
                </tbody>
            </Table>
        </div>
    );
}