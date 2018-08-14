export default {
  state:{
    show:false,
    formid:null,
  },
  mutations:{
    switch_FieldDialog(state,formid){
      state.show = state.show?false:true;
      state.formid = formid;
    }
  }
}