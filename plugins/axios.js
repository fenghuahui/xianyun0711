//导入message 
import { Message } from 'element-ui';

// axios拦截器
//第一个参数是nuxt对象
export default ( { $axios } ) =>{
  //拦截axios的错误请求
  $axios.onError((err)=>{
    const {message,statusCode}=err.response.data
    if(statusCode === 400){
      Message.error(message);
    }
  })
}