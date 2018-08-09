<template>
  <div id="app">
    <relate-table :workflowRowData="workflowRowData" @browserClick="handleBrowser"/>
    <workflow-browser :showBrowser="showBrowser" @closeDialog="closeDialog"/>
  </div>
</template>

<script>
import RelateTable from './components/RelateTable.vue'
import WorkflowBrowser from './components/WorkflowBrowser.vue'

export default {
  name: 'app',
  data(){
    return{
      showBrowser:false,
      workflowRowData:null
    }
  },
  components: {
    'relate-table': RelateTable,
    'workflow-browser': WorkflowBrowser
  },
  methods:{
    handleBrowser(index){
      this.showBrowser = true;
    },
    closeDialog(data,workflowRow){
      if (workflowRow!=null){
        this.workflowRowData = workflowRow;
      }
      this.showBrowser = data;
    }
  }
}
</script>

<style>

</style>
