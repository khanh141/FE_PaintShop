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

export const deleteDinhMucLyThuyet = async (dinhMuc) => {
    return instance.delete(`/dinhMucLyThuyet/${dinhMuc}`);
};
export const deleteBaobi = async (loaiBaoBi) => {
    return instance.delete(`/baoBi/${loaiBaoBi}`);
};
export const deleteMau = async (mau) => {
    return instance.delete(`/mau/${mau}`);
};
