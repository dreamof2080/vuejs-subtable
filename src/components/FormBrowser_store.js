export default {
  state:{
    show:false,
    workflowid:null,
    formType:null,
  },
  mutations:{
    switch_FormDialog(state,stark){
      state.show = state.show?false:true;
      if (stark!=null){
        state.workflowid = stark.workflowid;
        state.formType = stark.formType;
      }
    }
  }
}