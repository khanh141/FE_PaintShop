import { icon } from '@fortawesome/fontawesome-svg-core';
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilSignOutAlt,
} from '@iconscout/react-unicons';
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
