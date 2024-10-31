import { Table, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function OrderTables() {
  const [selectAll, setSelectAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [orders, setOrders] = useState([]);
  const [statusorder, setStatusOrder] = useState({});


  // Giả lập tải dữ liệu từ cơ sở dữ liệu
  useEffect(() => {
    // Dữ liệu ví dụ, thay thế bằng dữ liệu từ API hoặc cơ sở dữ liệu
    const fetchedOrders = [
      { id: 1, orderId: "M1025", customer: "Nguyễn Trần Gia Kiệt", payment: "Chưa Thanh Toán", date: "01/09/2024", status: "Đã Duyệt" },
      { id: 2, orderId: "M1026", customer: "Trần Thị Thu", payment: "Đã Thanh Toán", date: "02/09/2024", status: "Chờ Duyệt" },
      { id: 3, orderId: "M1027", customer: "Ngô Minh Tuấn", payment: "Chưa Thanh Toán", date: "03/09/2024", status: "Chờ Duyệt" },
      { id: 4, orderId: "M1025", customer: "Nguyễn Trần Gia Kiệt", payment: "Chưa Thanh Toán", date: "01/09/2024", status: "Đã Duyệt" },
      { id: 5, orderId: "M1026", customer: "Trần Thị Thu", payment: "Đã Thanh Toán", date: "02/09/2024", status: "Chờ Duyệt" },
      { id: 6, orderId: "M1027", customer: "Ngô Minh Tuấn", payment: "Chưa Thanh Toán", date: "03/09/2024", status: "Chờ Duyệt" },
      { id: 7, orderId: "M1025", customer: "Nguyễn Trần Gia Kiệt", payment: "Chưa Thanh Toán", date: "01/09/2024", status: "Đã Duyệt" },
      { id: 8, orderId: "M1026", customer: "Trần Thị Thu", payment: "Đã Thanh Toán", date: "02/09/2024", status: "Chờ Duyệt" },
      { id: 9, orderId: "M1027", customer: "Ngô Minh Tuấn", payment: "Chưa Thanh Toán", date: "03/09/2024", status: "Chờ Duyệt" },
      { id: 10, orderId: "M1025", customer: "Nguyễn Trần Gia Kiệt", payment: "Chưa Thanh Toán", date: "01/09/2024", status: "Đã Duyệt" },
      { id: 11, orderId: "M1026", customer: "Trần Thị Thu", payment: "Đã Thanh Toán", date: "02/09/2024", status: "Chờ Duyệt" },
      { id: 12, orderId: "M1027", customer: "Ngô Minh Tuấn", payment: "Chưa Thanh Toán", date: "03/09/2024", status: "Chờ Duyệt" },
      { id: 13, orderId: "M1025", customer: "Nguyễn Trần Gia Kiệt", payment: "Chưa Thanh Toán", date: "01/09/2024", status: "Đã Duyệt" },
      { id: 14, orderId: "M1026", customer: "Trần Thị Thu", payment: "Đã Thanh Toán", date: "02/09/2024", status: "Chờ Duyệt" },
      { id: 15, orderId: "M1027", customer: "Ngô Minh Tuấn", payment: "Chưa Thanh Toán", date: "03/09/2024", status: "Chờ Duyệt" },
      { id: 16, orderId: "M1025", customer: "Nguyễn Trần Gia Kiệt", payment: "Chưa Thanh Toán", date: "01/09/2024", status: "Đã Duyệt" },
      { id: 17, orderId: "M1026", customer: "Trần Thị Thu", payment: "Đã Thanh Toán", date: "02/09/2024", status: "Chờ Duyệt" },
      { id: 18, orderId: "M1027", customer: "Ngô Minh Tuấn", payment: "Chưa Thanh Toán", date: "03/09/2024", status: "Chờ Duyệt" }
    ];

    setOrders(fetchedOrders);

    const initialCheckedItems = {};
    fetchedOrders.forEach(order => {
      initialCheckedItems[order.id] = false;
    });
    setCheckedItems(initialCheckedItems);
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);

    const updatedCheckedItems = {};
    orders.forEach((order) => {
      updatedCheckedItems[order.id] = !selectAll;
    });
    setCheckedItems(updatedCheckedItems);
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems({
      ...checkedItems,
      [id]: !checkedItems[id],
    });
  };

  //     const handleStatusChange = (id) => {
  //     setOrders((prevOrders) =>
  //       prevOrders.map((order) =>
  //         order.id === id
  //           ? {
  //               ...order,
  //               status:
  //                 order.status === "Chờ Duyệt"
  //                   ? "Đã Duyệt"
  //                   : order.status === "Đã Duyệt "
  //                   ? "Chờ Duyệt"
  //                   : order.status,
  //             }
  //           : order
  //       )
  //     );
  //   };

  const handleStatusChange = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id
          ? {
            ...order,
            status:
              order.status === "Chờ Duyệt"
                ? "Đã Duyệt"
                : order.status === "Đã Duyệt"
                  ? "Đã Hủy"
                  : order.status, // Giữ nguyên nếu là "Đã Hủy"
          }
          : order
      )
    );
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
          </th>
          <th>Mã Đơn Hàng</th>
          <th>Tên Khách Hàng</th>
          <th>Thanh Toán</th>
          <th>Ngày Đặt Hàng</th>
          <th>Trạng Thái</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>
              <input
                type="checkbox"
                checked={checkedItems[order.id] || false}
                onChange={() => handleCheckboxChange(order.id)}
              />
            </td>
            <td>{order.orderId}</td>
            <td>{order.customer}</td>
            <td>{order.payment}</td>
            <td>{order.date}</td>
            <td>{order.status}</td>
            <td>
              {/* <Button
                onClick={() => handleStatusChange(order.id)}
                variant={
                  order.status === "Đã Duyệt" ? "danger" : "success"
                }
              >
                {order.status === "Đã Duyệt" ? "Hủy đơn hàng" : "Duyệt đơn hàng"}
              </Button> */}

              <Button
                onClick={() => handleStatusChange(order.id)}
                variant={
                  order.status === "Đã Duyệt"
                    ? "danger"
                    : order.status === "Đã Hủy"
                      ? "secondary"
                      : "success"
                }
                disabled={order.status === "Đã Hủy"}
                className="w-75"
              >

                {order.status === "Đã Duyệt"
                  ? "Hủy đơn hàng"
                  : order.status === "Đã Hủy"
                    ? "Đã Hủy"
                    : "Duyệt đơn hàng"}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}