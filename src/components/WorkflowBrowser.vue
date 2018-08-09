<template>
  <el-dialog :visible.sync="showThis">
    <el-container>
      <el-header>
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
      </el-header>
      <el-main>
        <el-table
            ref="singleTable"
            :data="tableData3"
            highlight-current-row
            @current-change="handleCurrentChange"
            height="400"
            style="width: 100%">
          <el-table-column
              type="index"
              width="50">
          </el-table-column>
          <el-table-column
              v-if="false"
              prop="flowid"
              label="流程ID">
          </el-table-column>
          <el-table-column
              prop="flowName"
              label="流程名称">
          </el-table-column>
          <el-table-column
              prop="moduleName"
              label="模块名称">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-dialog>
</template>

<script>
  export default {
    props:['showBrowser'],
    data() {
      return {
        showThis: false,
        tableData3: [{
          flowid:'1',
          flowName:'差旅费报销',
          moduleName:'财务管理'
        }, {
          flowid:'2',
          flowName:'请假申请',
          moduleName:'人事管理'
        }, {
          flowid:'3',
          flowName:'离职申请',
          moduleName:'人事管理'
        }, {
          flowid:'4',
          flowName:'加班申请',
          moduleName:'人事管理'
        }, {
          flowid:'4',
          flowName:'加班申请',
          moduleName:'人事管理'
        }, {
          flowid:'4',
          flowName:'加班申请',
          moduleName:'人事管理'
        }, {
          flowid:'4',
          flowName:'加班申请',
          moduleName:'人事管理'
        }, {
          flowid:'4',
          flowName:'加班申请',
          moduleName:'人事管理'
        }],
        currentRow: null,
        searchForm: {
          searchFlowName: '',
          searchModuleName: ''
        }
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.currentRow = val;
        this.showThis = false;
      },
      onSubmit() {
        console.log('submit!');
      }
    },
    mounted(){
      this.showThis = this.showBrowser
    },
    watch:{
      showThis:function (newV, oldV) {
        this.$emit('closeDialog',newV,this.currentRow);
        this.currentRow = null;
      },
      showBrowser:function (newV, oldV) {
        this.showThis = newV;
      }
    }
  }
</script>

<style scoped>
  form{
    text-align: center;
    border-bottom:2px solid #009688;
  }
</style>