import { UilClipboardAlt } from '@iconscout/react-unicons';
import { MdDashboard, MdAccountCircle } from 'react-icons/md';
import { GiPaintBucket } from 'react-icons/gi';
import { FaClipboardList, FaWarehouse } from 'react-icons/fa';
import { UilUsdSquare, UilMoneyWithdrawal } from '@iconscout/react-unicons';
import { MdFormatIndentIncrease, MdFormatIndentDecrease } from 'react-icons/md';

//import { keyboard } from '@testing-library/user-event/dist/keyboard';

export const ASIDE_NAV = [
    {
        icon: MdDashboard,
        title: 'Dashboard',
        path: '/admin',
    },
    {
        icon: GiPaintBucket,
        title: 'Sản phẩm',
        path: '/admin/products',
    },
    {
        icon: FaClipboardList,
        title: 'Đơn hàng',
        path: '/admin/adminorder',
    },
    {
        icon: FaWarehouse,
        title: 'Kho hàng',
        path: '/admin/warehouse',
    },
    {
        icon: MdAccountCircle,
        title: 'Tài khoản',
        path: '/admin/adminaccount',
    },
    {
        icon: MdFormatIndentIncrease,
        title: 'Phiếu nhập',
        path: '/admin/importForm',
    },
    {
        icon: MdFormatIndentDecrease,
        title: 'Phiếu xuất',
        path: '/admin/exportForm',
    },
];

// Analytics Cards Data
export const cardsData = [
    {
        title: 'Bán Hàng',
        color: {
            backGround: 'linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)',
            boxShadow: '0px 10px 20px 0px #e0c6f5',
        },
        barValue: 100,
        value: '1.000.000',
        png: UilUsdSquare,
        series: [
            {
                name: 'Tổng tiền',
            },
        ],
    },
    {
        title: 'Doanh Thu',
        color: {
            backGround: 'linear-gradient(180deg, #FF919D 0%, #FC929D 100%)',
            boxShadow: '0px 10px 20px 0px #FDC0C7',
        },
        barValue: 100,
        value: '1.000.000',
        png: UilMoneyWithdrawal,
        series: [
            {
                name: 'Doanh thu',
            },
        ],
    },
    {
        title: 'Chi Phí',
        color: {
            backGround:
                'linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)',
            boxShadow: '0px 10px 20px 0px #F9D59B',
        },
        barValue: 100,
        value: '1.000.000',
        png: UilClipboardAlt,
        series: [
            {
                name: 'Chi phí',
            },
        ],
    },
];
