import axios from 'axios'
import qs from 'qs'
import { MessageBox, Indicator } from "mint-ui";
axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'https://www.everlinkintl.com'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'; //配置请求头

//POST传参序列化(添加请求拦截器)
axios.interceptors.request.use((config) => {
    //在发送请求之前做某件事
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
    }
    return config;
}, (error) => {
    MessageBox.alert("错误的传参", "提示");
    return Promise.reject(error);
});

//返回状态判断(添加响应拦截器)
axios.interceptors.response.use((res) => {
    //对响应数据做些事
    if (!res.data.success) {
        return Promise.resolve(res);
    }
    return res;
}, (error) => {
    MessageBox.alert("网络异常", "提示");
    return Promise.reject(error);
});

//返回一个Promise(发送post请求)
export function fetchPost(url, params) {
    Indicator.open('加载中...');
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                Indicator.close();
                if (response.status == 200) {
                    resolve(response.data);
                }
            }, err => {
                Indicator.close();
                reject(err);
            })
            .catch((error) => {
                Indicator.close();
                reject(error)
            })
    })
}
////返回一个Promise(发送get请求)
export function fetchGet(url, param) {
    Indicator.open('加载中...');
    return new Promise((resolve, reject) => {
        axios.get(url, { params: param })
            .then(response => {
                Indicator.close();
                if (response.status == 200) {
                    resolve(response.data);
                }
            }, err => {
                Indicator.close();
                reject(err)
            })
            .catch((error) => {
                Indicator.close();
                reject(error)
            })
    })
}
export default {
    fetchPost,
    fetchGet
}