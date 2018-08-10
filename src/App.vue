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
    }
  }
}
</script>

<style>

</style>
