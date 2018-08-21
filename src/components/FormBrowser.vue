<template>
  <el-dialog :visible.sync="show">
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
            prop="formid"
            label="表单id">
        </el-table-column>
        <el-table-column
            prop="formName"
            label="表单名称">
        </el-table-column>
        <el-table-column
            prop="dbName"
            label="数据库表名">
        </el-table-column>
        <el-table-column
            prop="formType"
            label="表单类型">
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        tableList: []
      }
    },
    methods: {
      handleRowClick(val) {
        this.$emit('formBrowserClick', val);
        this.$store.commit('switch_FormDialog');
      },
      handleSubmit() {
        this.axios.get('/ServiceAction/com.eweaver.workflow.workflow.servlet.WorkflowRelateAction?action=formid&workflowid=' +
          this.$store.state.formStore.workflowid + '&formType=' + this.$store.state.formStore.formType).then(response => {
          this.tableList = response.data;
        }).catch(err => {
          console.log(err)
        });
      }
    },
    computed: {
      show: {
        get() {
          if (this.$store.state.formStore.show) {
            this.handleSubmit();
          }
          return this.$store.state.formStore.show;
        },
        set() {
          this.$store.commit('switch_FormDialog');
        }
      }
    }
  }
</script>

<style scoped>
  form {
    text-align: center;
    border-bottom: 2px solid #009688;
  }
</style>