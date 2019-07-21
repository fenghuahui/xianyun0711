export const state = ()=>{
  return{
    //选中的机票的信息
    infoData:{
      seat_infos:{}
    }
  }
}

//同步
export const mutations = {
  //设置机票信息
  setInfoData(state,data){
    state.infoData = data ;
  },
  //设置总价格
  setAllPrice(state,price){
    state.allPrice = price
  }
}