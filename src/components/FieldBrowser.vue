<template>
  <el-dialog :visible.sync="show">
    <div>
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="字段名称">
          <el-input v-model="searchForm.searchFieldName" placeholder="" size="mini"
                    @keydown.13.native="handleSubmit"></el-input>
        </el-form-item>
        <el-form-item label="显示名称">
          <el-input v-model="searchForm.searchLabelName" placeholder="" size="mini"
                    @keydown.13.native="handleSubmit"></el-input>
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
            prop="fieldid"
            label="字段id">
        </el-table-column>
        <el-table-column
            prop="fieldName"
            label="字段名称">
        </el-table-column>
        <el-table-column
            prop="labelName"
            label="显示名称">
        </el-table-column>
        <el-table-column
            prop="htmlType"
            label="表现形式">
        </el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        tableList: [],
        searchForm: {
          searchFieldName: '',
          searchLabelName: ''
        }
      }
    },
    methods: {
      handleRowClick(val) {
        this.$emit('fieldBrowserClick', val);
        this.$store.commit('switch_FieldDialog');
      },
      handleSubmit() {
        this.axios.get('/ServiceAction/com.eweaver.workflow.workflow.servlet.WorkflowRelateAction?action=fieldid&formid=' +
          this.$store.state.fieldStore.formid
          + '&fieldName='
          + encodeURI(encodeURI(this.searchForm.searchFieldName)) + '&labelName=' + encodeURI(encodeURI(this.searchForm.searchLabelName))).then(response => {
          this.tableList = response.data.detail;
        }).catch(function (err) {
          console.log(err)
        })
      }
    },
    computed: {
      show: {
        get() {
          if (this.$store.state.fieldStore.show) {
            this.handleSubmit();
          }
          return this.$store.state.fieldStore.show;
        },
        set() {
          this.$store.commit('switch_FieldDialog');
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