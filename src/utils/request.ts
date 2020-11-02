import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { Message, Notification } from "element-ui";
import router from '@/router';

// API 请求的默认前缀
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// 添加响应拦截器
axios.interceptors.response.use(
  function (response: AxiosResponse) {
    // 对响应数据做点什么
    return response;
  },
  function (error: AxiosError) {
    // 对响应错误做点什么
    const { config, response } = error;
    if (response && response.status) {
      const errorText = (codeMessage as any)[response.status] || response.statusText;
      const { status } = response;
      if (status === 401) router.push('/login');

      Notification.error({
        title: `请求错误 ${status}: ${config.url}`,
        message: errorText,
      });
    } else {
      Notification.error({
        title: '网络异常',
        message: '您的网络发生异常，无法连接服务器',
      });
    }
    throw error;
  }
);


const showErrorMessage = (showType: number, errorMessage: string) => {
  switch (showType) {
    case 0:
      break;
    case 1:
      Message.warning(errorMessage);
      break;
    case 2:
      Message.error(errorMessage);
      break;
    case 4:
      Notification.error({ title: '网络异常',message: errorMessage });
      break;
    default:
      break;
  }
}
export interface RequestResponse {
  success: boolean; // 是否请求成功
  data?: any; // 响应数据
  errorCode?: string; // 错误码
  errorMessage?: string; // 向用户显示消息
  showType?: number; // 错误消息显示类型： 0 不显示; 1 message.warn; 2 message.error; 4 notification;
  traceId?: string; // 方便后端故障排除: 唯一请求ID
  host?: string; // 后端故障排除的便利性: 当前访问服务器的主机
}

// 封装request方法
async function request(url: string, options?: AxiosRequestConfig): Promise<RequestResponse> {
  const { data } = await axios(url, options);
  if (data && data.success) {
    return data;
  } else {
    if (data.showType && data.errorMessage) {
      showErrorMessage(data.showType, data.errorMessage);
    }

    return Promise.reject(new Error(data.errorMessage || "Error"));
  }
}


export default request;
