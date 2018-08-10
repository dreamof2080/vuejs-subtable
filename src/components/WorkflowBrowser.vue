<template>
  <el-dialog :visible.sync="show">
    <div>
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="流程名称">
          <el-input v-model="searchForm.searchFlowName" placeholder="" size="mini"></el-input>
        </el-form-item>
        <el-form-item label="模块名称">
          <el-input v-model="searchForm.searchModuleName" placeholder="" size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-table
          ref="singleTable"
          :data="tableData3"
          highlight-current-row
          @row-click="handleCurrentChange"
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
      </el-table>
    </div>
    <div class="block">
      <el-pagination
          layout="prev, pager, next"
          :current-page.sync="currentPage"
          :page-size="10"
          :total="1000">
      </el-pagination>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        tableData3: [{
          workflowid:'1',
          workflowName:'差旅费报销',
          moduleid:'',
          moduleName:'财务管理'
        }, {
          workflowid:'2',
          workflowName:'请假申请',
          moduleid:'',
          moduleName:'人事管理'
        }, {
          workflowid:'3',
          workflowName:'离职申请',
          moduleid:'',
          moduleName:'人事管理'
        }, {
          workflowid:'4',
          workflowName:'加班申请',
          moduleid:'',
          moduleName:'人事管理'
        }, {
          workflowid:'4',
          workflowName:'加班申请',
          moduleid:'',
          moduleName:'人事管理'
        }, {
          workflowid:'4',
          workflowName:'加班申请',
          moduleid:'',
          moduleName:'人事管理'
        }, {
          workflowid:'4',
          workflowName:'加班申请',
          moduleid:'',
          moduleName:'人事管理'
        }, {
          workflowid:'4',
          workflowName:'加班申请',
          moduleid:'',
          moduleName:'人事管理'
        }],
        searchForm: {
          searchFlowName: '',
          searchModuleName: ''
        },
        currentPage:1,
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.$emit('browserClick',val);
        this.$store.commit('switch_workflowDialog');
      },
      onSubmit() {
        this.axios.get('/ServiceAction/com.eweaver.workflow.workflow.servlet.WorkflowRelateAction?action=workflowinfo&workflowName='
          +encodeURI(encodeURI(this.searchForm.searchFlowName))+'&moduleName='+encodeURI(encodeURI(this.searchForm.searchModuleName))).then(response=>{
          this.tableData3.length = 0;
          this.tableData3 = response.data.detail;
        }).catch(function (err) {
          console.log(err)
        })
      }
    },
    computed:{
      show:{
        get(){
          return this.$store.state.workflowBrowser.show;
        },
        set(){
          this.currentPage = 1;
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
  }
</style>