export default {
  state:{
    show:false
  },
  mutations:{
    switch_workflowDialog(state){
      state.show = state.show?false:true;
    }
  }
}