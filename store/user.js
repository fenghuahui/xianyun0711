// state:存数据
export const state = ()=>{
  return{
    userInfo:{
      token:'',
      user:{

      }
    }
  }
}

// 同步设置修改state的数据
export const mutations = {
  //设置用户的数据
  setUserInfo(state,data){
    state.userInfo = data;
  },
  // 清除用户数据
  clearUserInfo(state){
    //  state.userInfo = {}
     state.userInfo = {
       token:'',
       user:{}
     }
  }
}


//actions :异步设置修改state的数据
export const actions = {
  // 负责登陆请求
  // 第一个参数是store对象
  login({commit},data){
    return  this.$axios({
      url:'/accounts/login',
      method:'POST',
      data,
    }).then((res)=>{
      //把数据保存到vuex，user是模块名字，命名空间
      commit('setUserInfo',res.data)
    })
  },
  //注册
  register(){}
}