<template>
  <div class="main">
    <div class="header">
      <div class="titleTag">
        <el-tag size="medium">{{flowName}} 一 流程关联设置</el-tag>
      </div>
      <div class="menu">
        <el-button-group>
          <el-button type="primary" size="mini" @click="handleAdd">增加</el-button>
          <el-button type="primary" size="mini" @click="handleDelete">删除</el-button>
          <el-button type="primary" size="mini" @click="handleSave">保存</el-button>
        </el-button-group>
      </div>
    </div>
    <div class="table">
      <el-table
          :data="details"
          height="600"
          style="width: 100%"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            type="index"
            width="50">
        </el-table-column>
        <el-table-column
            v-if="false"
            prop="id"
            label="id">
        </el-table-column>
        <el-table-column
            align="center"
            label="关联流程"
            width="250">
          <template slot-scope="scope">
            <el-input v-model="scope.row.workflowid" v-show="false" size="mini"></el-input>
            <el-input placeholder="请选择" v-model="scope.row.workflowName" size="small">
              <el-button slot="append" icon="el-icon-search" @click="handleWorkflowBrowserClick(scope.$index)"
                         size="small"></el-button>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="关联表单">
          <el-table-column
              align="center"
              label="主表/子表"
              width="200">
            <template slot-scope="scope">
              <el-select v-model="scope.row.formType" placeholder="请选择" size="small">
                <el-option
                    v-for="item in formTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
              align="center"
              label="表单名称"
              width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.formid" v-show="false" size="mini"></el-input>
              <el-input placeholder="请选择" v-model="scope.row.formName" size="small">
                <el-button slot="append" icon="el-icon-search" @click="handleFormBrowserClick(scope.$index)"
                           size="small"></el-button>
              </el-input>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
            align="center"
            label="关联字段"
            width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.fieldid" v-show="false" size="mini"></el-input>
            <el-input placeholder="请选择" v-model="scope.row.fieldName" size="small">
              <el-button slot="append" icon="el-icon-search" @click="handleFieldBrowserClick(scope.$index)"
                         size="small"></el-button>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="关联条件">
          <template slot-scope="scope">
            <el-input
                :disabled="true"
                size="small"
                placeholder="开发中，敬请期待"
                v-model="scope.row.condition"
                clearable>
            </el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['workflowRowData', 'fieldRowData', 'formRowData', 'oid'],
    data() {
      return {
        details: [],
        formTypeOptions: [
          {
            value: 0,
            label: '主表'
          },
          {
            value: 1,
            label: '子表'
          }
        ],
        multipleSelection: [],
        formids: [],
        deleteIds: [],
        currentIndex: null,
        flowName: null,
      }
    },
    methods: {
      loadData(oid) {
        this.axios.get('/ServiceAction/com.eweaver.workflow.workflow.servlet.WorkflowRelateAction?action=load&oid=' + oid).then(response => {
          this.details = response.data.detail;
          this.flowName = response.data.flowName;
        }).catch(err => {
          console.log(err)
        })
      },
      handleAdd() {
        this.details.push({
          id: null,
          workflowid: null,
          workflowName: null,
          formType: null,
          formid: null,
          formName: null,
          fieldid: null,
          fieldName: null,
          condition: null
        });
      },
      handleDelete() {
        this.multipleSelection.forEach(element => {
          if (element.id && this.deleteIds.indexOf(element.id) === -1) {
            this.deleteIds.push(element.id);
          }
          this.details.splice(this.details.indexOf(element), 1)
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleWorkflowBrowserClick(index) {
        this.$store.commit('switch_workflowDialog');
        this.currentIndex = index;
      },
      handleFormBrowserClick(index) {
        this.$store.commit('switch_FormDialog', {
          workflowid: this.details[index].workflowid,
          formType: this.details[index].formType
        });
        this.currentIndex = index;
      },
      handleFieldBrowserClick(index) {
        this.$store.commit('switch_FieldDialog', this.details[index].formid);
        this.currentIndex = index;
      },
      handleSave() {
        if (this.details.length > 0 || this.deleteIds.length > 0) {
          let params = new URLSearchParams();
          params.append('workflowid', this.$store.state.globalStore.workflowid);
          params.append('list', JSON.stringify(this.details));
          params.append('deleteList', JSON.stringify(this.deleteIds));
          this.axios.post('/ServiceAction/com.eweaver.workflow.workflow.servlet.WorkflowRelateAction?action=save', params,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}}).then(response => {
            this.$message.info("主人，保存成功！");
          }).catch(error => {
            console.log(error);
          })
        } else {
          this.showMessage()
        }
      },
      showMessage() {
        this.$message.error('主人，小的发现无数据可提交哦');
      }
    },
    watch: {
      workflowRowData: function (newData, oldData) {
        this.details[this.currentIndex].workflowid = newData.workflowid;
        this.details[this.currentIndex].workflowName = newData.workflowName;
      },
      formRowData: function (newData, oldData) {
        this.details[this.currentIndex].formid = newData.formid;
        this.details[this.currentIndex].formName = newData.formName;
      },
      fieldRowData: function (newData, oldData) {
        this.details[this.currentIndex].fieldid = newData.fieldid;
        this.details[this.currentIndex].fieldName = newData.fieldName;
      },
      oid: function (newData, oldData) {
        this.loadData(newData);
      }
    }
  }
</script>

<style scoped>
  .main {
    width: 80%;
    margin: 0 auto;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .titleTag {
    float: left;
    margin: 20px 0 10px 10px;
  }

  .menu {
    float: right;
    margin: 20px 10px 10px 0;
  }

  .table {
    margin: 10px;
    padding-bottom: 10px;
  }
</style>
