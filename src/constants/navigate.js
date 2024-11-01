import { icon } from '@fortawesome/fontawesome-svg-core';
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilSignOutAlt,
} from '@iconscout/react-unicons';

import { UilUsdSquare, UilMoneyWithdrawal } from '@iconscout/react-unicons';
//import { keyboard } from '@testing-library/user-event/dist/keyboard';

export const ASIDE_NAV = [
    {
        icon: UilEstate,
        title: 'Dashboard',
        path: '/admin',
    },
    {
        icon: UilClipboardAlt,
        title: 'Sản phẩm',
        path: '/admin/products',
    },
    {
        icon: UilClipboardAlt,
        title: 'Đơn hàng',
        path: '/admin/adminorder',
    },
    {
        icon: UilPackage,
        title: 'Kho hàng',
        path: '/admin/warehouse',
    },
    {
        icon: UilChart,
        title: 'Tài khoản',
        path: '/admin/adminaccount',
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
