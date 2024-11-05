import { instance } from './instanceAxios';

export const addBaobi = async (data) => {
    return instance.post('/baoBi', data);
};

export const addMau = async (data) => {
    return instance.post('/mau', data);
};

export const addDinhMucLyThuyet = async (data) => {
    return instance.post('/dinhMucLyThuyet', data);
};
