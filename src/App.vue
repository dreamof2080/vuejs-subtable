<template>
  <div id="app">
    <relate-table :workflowRowData="workflowRowData"/>
    <workflow-browser @browserClick="handleWorkflowRowData"/>
  </div>
</template>

<script>
import RelateTable from './components/RelateTable.vue'
import WorkflowBrowser from './components/WorkflowBrowser.vue'

export default {
  name: 'app',
  data(){
    return{
      workflowRowData:null
    }
  },
  components: {
    'relate-table': RelateTable,
    'workflow-browser': WorkflowBrowser
  },
  methods:{
    handleWorkflowRowData(workflowRow){
      this.workflowRowData = workflowRow;
    },
    loaded(){
      let url = window.location.href;
      let paramArr = url.substring(url.lastIndexOf('?') + 1,url.length).split('&');
      for (let i=0;i<paramArr.length;i++){
        let param = paramArr[i].split("=");
        if (param.length>1){
          if (param[0].toLocaleLowerCase()=='workflowid') {
            this.$store.commit('setWorkflowId',param[1]);
          }
        }
      }
    }
  },
  mounted(){
    this.loaded();
  }
}
</script>

<style>

</style>
