# axios 的封装

**在src下新建request文件夹，下面新建一个http.ts文件**

```typescript
import axios from 'axios'
import qs from 'qs'

import { message } from 'ant-design-vue'

const errorHandler = ({ status, data }) => {
    switch (status) {
        case 401:
            message.error('未授权，请重新登录')
            break;
        case 404:
            message.error('未找到资源')
            break;
        case 500:
            message.error(data.msg)
            break;
        default:
            message.error('错误')
    }
}

const requestSuccess = (res) => {
    if (res.data.code === -1) message.error(res.data.msg)
    return Promise.resolve(res)
}
const baseURL = import.meta.env.VITE_API_DOMAIN as string
const instance = axios.create({ timeout: 0, baseURL })


instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let cancel, requestList = {}
const CancelToken = axios.CancelToken

instance.interceptors.request.use(
    config => {
        const index = config.url.indexOf('?')
        if (index === -1) {
            config.url += '?sign=F002364'
        } else {
            config.url += '&sign=F002364'
        }

        if (requestList[config.url]) {
            requestList[config.url]('取消相同请求')
            requestList[config.url] = cancel
        } else {
            requestList[config.url] = cancel
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    response => { // 响应码属于 2**
        return response.status === 200 ? requestSuccess(response) : Promise.reject(response)
    },
    error => { // 响应码不在 2** 范围内
        const { response } = error
        if (response) { // 处理对应的错误码
            errorHandler(response)
            return Promise.reject(response)
        } else {
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            if (!window.navigator.onLine) {
                // store.commit('changeNetwork', false);
            } else {
                return Promise.reject(error)
            }
        }

    }
)

/**
 * 使用的时候必选传入一个泛型，用来定义响应数据的结构
 */
export function get<T>(url: string, params?: any): Promise<T> {
    return new Promise((resolve, reject) => {
        instance({
            method: 'get',
            url,
            params,
            cancelToken: new CancelToken(c => cancel = c)
        }).then(res => resolve(res.data)).catch(err => reject(err))
    })
}
/**
 * 使用的时候必选传入一个泛型，用来定义响应数据的结构
 */
export function post<T>(url: string, data?: any): Promise<T> {
    return new Promise((resolve, reject) => {
        instance({
            method: 'post',
            url,
            data: qs.stringify(data),
            cancelToken: new CancelToken(c => cancel = c)
        }).then(res => resolve(res.data)).catch(err => {
            reject(err)
        })
    })
}

```
**统一封装api请求，新建 request/api/robotIn.ts**

```typescript
import { IProjectRes, IRobotInReq, IRobotInRes, ISupplierRes, IRobotDivideReq, IRobotDivideRes } from '../../types/robotIn-types'
import { get, post } from '../http'

// 机器人入库
export const robotInHandler = (params: IRobotInReq) => {
    return post<IRobotInRes>('operate/addRobot', params)
}

// 机器人分组
export const robotIDivideHandler = (params: IRobotDivideReq) => {
    return post<IRobotDivideRes>('operate/divideProject', params)
}

// 获取所有项目
export const getAllProject = () => {
    return get<IProjectRes>('operate/allProject')
}

// 获取所有供应商
export const getSupplierList = () => {
    return get<ISupplierRes>('operate/getSupplierList')
}
```

**在组件中使用api**

```typescript
<script lang="ts">
// 接口api
import API from "../../request/api";

API.robotInHandler(obj)
    .then((res) => {
        operateText.value = "入库";
        robotInLoading.value = false;
    })
    .catch((err) => (robotInLoading.value = false));
<script>
```
