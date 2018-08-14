<template>
  <div id="app">
    <relate-table :workflowRowData="workflowRowData" :fieldRowData="fieldRowData" :oid="oid"/>
    <workflow-browser @workflowBrowserClick="handleWorkflowRowData"/>
    <field-browser @fieldBrowserClick="handleFieldRowData"/>
  </div>
</template>

<script>
import RelateTable from './components/RelateTable'
import WorkflowBrowser from './components/WorkflowBrowser'
import FieldBrowser from './components/FieldBrowser'

export default {
  name: 'app',
  data(){
    return{
      workflowRowData:null,
      fieldRowData:null,
      oid:null
    }
  },
  components: {
    'relate-table': RelateTable,
    'workflow-browser': WorkflowBrowser,
    'field-browser':FieldBrowser,
  },
  methods:{
    handleWorkflowRowData(workflowRow){
      this.workflowRowData = workflowRow;
    },
    handleFieldRowData(fieldRow){
      this.fieldRowData = fieldRow;
    },
    loaded(){
      let url = window.location.href;
      let paramArr = url.substring(url.lastIndexOf('?') + 1,url.length).split('&');
      for (let i=0;i<paramArr.length;i++){
        let param = paramArr[i].split("=");
        if (param.length>1){
          if (param[0].toLocaleLowerCase()=='workflowid') {
            this.oid = param[1];
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
