"use strict";

import Vue from 'vue';
import axios from "axios";
import {Notify} from "vant";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
    baseURL: 'http://localhost:8090'
    // baseURL: process.env.baseURL || process.env.apiUrl || ""
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response;
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

Plugin.install = function (Vue, options) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        },
    });
};

const request = (url, method, params, callback) => {
    const config = {
        url: url,
        method: method,
    }
    if (method === 'get') {
        config.params = params
    } else {
        const formData = new FormData()
        for (let key in params) {
            // 判断是否是数组
            if (params[key] instanceof Array) {
                for (let i = 0; i < params[key].length; i++) {
                    formData.append(key, params[key][i])
                }
            } else {
                formData.append(key, params[key])
            }
        }
        config.data = formData
    }
    _axios
        .request(config)
        .then((response) => {
            if (response.data.code === 200) {
                callback(response.data)
            } else {
                Notify({
                    type:'danger',
                    message: response.data.message,
                })
            }
        })
        .catch((error) => {
            Notify({
                type:'danger',
                message: error,
            })
        })
}

Vue.prototype.axios = _axios
Vue.prototype.request = request

Vue.prototype.get = (url, params, callback) => {
    request(url, 'get', params, (response) => {
        // Notify({
        //     type:'success',
        //     message: response.message,
        // })
        callback(response.obj)
    })
}

Vue.prototype.post = (url, params, callback) => {
    request(url, 'post', params, (response) => {
        Notify({
            type:'success',
            message: response.message,
        })
        callback(response.obj)
    })
}

Vue.use(Plugin)

export default Plugin;
