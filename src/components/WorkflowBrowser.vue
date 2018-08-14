<template>
  <el-dialog :visible.sync="show">
    <div>
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="流程名称">
          <el-input v-model="searchForm.searchFlowName" placeholder="" size="mini" @keydown.13.native="handleSubmit"></el-input>
        </el-form-item>
        <el-form-item label="模块名称">
          <el-input v-model="searchForm.searchModuleName" placeholder="" size="mini" @keydown.13.native="handleSubmit"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
          ref="singleTable"
          :data="tableList"
          highlight-current-row
          @row-click="handleRowClick"
          height="400"
          style="width: 100%">
        <el-table-column
            type="index"
            width="50">
        </el-table-column>
        <el-table-column
            v-if="false"
            prop="workflowid"
            label="流程ID">
        </el-table-column>
        <el-table-column
            prop="workflowName"
            label="流程名称">
        </el-table-column>
        <el-table-column
            prop="moduleName"
            label="模块名称">
        </el-table-column>
        <el-table-column
            prop="isActive"
            label="流程状态">
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
          layout="prev, pager, next"
          :current-page.sync="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          :total="pageInfo.total"
          @current-change="handleCurrentPage">
      </el-pagination>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        tableList: [],
        searchForm: {
          searchFlowName: '',
          searchModuleName: ''
        },
        pageInfo:{
          currentPage:1,
          pageSize:10,
          total:0,
        }
      }
    },
    methods: {
      handleRowClick(val) {
        this.$emit('workflowBrowserClick',val);
        this.$store.commit('switch_workflowDialog');
      },
      handleSubmit() {
        this.axios.get('/ServiceAction/com.eweaver.workflow.workflow.servlet.WorkflowRelateAction?action=workflowinfo&workflowid='+
          this.$store.state.globalStore.workflowid
          +'&workflowName='
          +encodeURI(encodeURI(this.searchForm.searchFlowName))+'&moduleName='+encodeURI(encodeURI(this.searchForm.searchModuleName))
          +'&pageSize='+this.pageInfo.pageSize+'&pageNo='+this.pageInfo.currentPage).then(response=>{
          this.tableList = response.data.detail;
          this.pageInfo.total = response.data.total;
        }).catch(function (err) {
          console.log(err)
        })
      },
      handleCurrentPage(){
        this.handleSubmit();
      }
    },
    computed:{
      show:{
        get(){
          if (this.$store.state.workflowBrowser.show && this.tableList.length==0) {
            this.handleSubmit();
          }
          return this.$store.state.workflowBrowser.show;
        },
        set(){
          this.pageInfo.currentPage = 1;
          this.$store.commit('switch_workflowDialog');
        }
      }
    }
  }
</script>

<style scoped>
  form{
    text-align: center;
    border-bottom:2px solid #009688;
  }
  .block{
    text-align:right;
    margin-top: 10px;
  }
</style>