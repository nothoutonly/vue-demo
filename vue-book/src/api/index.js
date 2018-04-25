import axios from 'axios';

// 增加默认的请求路径
axios.defaults.baseURL = 'http://localhost:300';
// 拦截响应response，直接返回响应数据，而不是promise实例
axios.interceptors.response.use(res=>{
  return res.data;
});

// 获取轮播图数据, 返回的是一个promise对象
export let getSliders = () => {
  return axios.get('/sliders');
};
// 获取热门图书接口
export let getHotBook = () => {
  return axios.get('/hot');
};
export let getAll = () => {
  return axios.all([getSliders(), getHotBook()]);
};
// 获取所有图书接口
export let getBooks = () => {
  return axios.get('/book');
};
// 删除某个图书
export let removeBook = (id) => {
  return axios.delete(`/book?id=${id}`);
};
// 获取某一本数
export let findBook = (id) => {
  return axios.get(`/book?id=${id}`);
};
// 修改图书
/**
 * @param id 编号
 * @param data 数据，请求体发送
 * @returns {AxiosPromise<T>}
 */
export let updateBook = (id, data) => {
  return axios.put(`/book?id=${id}`, data);
};
export let addBook = (data) => {
  return axios.post("/book", data);
};

export let getPage = (offset) => {
  return axios.get(`/page?offset=${offset}`);
};
