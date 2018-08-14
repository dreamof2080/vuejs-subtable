<template>
  <div class="main">
    <div class="menu">
      <el-button-group>
        <el-button type="primary" size="mini" @click="handleAdd">增加</el-button>
        <el-button type="primary" size="mini" @click="handleDelete">删除</el-button>
        <el-button type="primary" size="mini" @click="handleSave">保存</el-button>
      </el-button-group>
    </div>
    <div class="table">
      <el-table
          :data="details"
          height="600"
          border
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
            width="220">
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
              width="180">
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
              width="180">
            <template slot-scope="scope">
              <el-select v-model="scope.row.formid" placeholder="请选择" size="small"
                         @focus="handleFormidClick(scope.$index)">
                <el-option
                    v-for="item in formids"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
            align="center"
            label="关联字段"
            width="180">
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
                size="small"
                placeholder="请输入内容"
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
    props: ['workflowRowData', 'fieldRowData','oid'],
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
        currentIndex: null
      }
    },
    methods: {
      loadData(oid){
        this.axios.get('/ServiceAction/com.eweaver.workflow.workflow.servlet.WorkflowRelateAction?action=load&oid=' + oid).then(response => {
          this.details = response.data;
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
          formName:null,
          fieldid: null,
          fieldName: null,
          condition: null
        });
      },
      handleDelete() {
        this.multipleSelection.forEach(element => {
          if (this.deleteIds.indexOf(element.id) === -1) {
            this.deleteIds.push(element.id);
          }
          this.details.splice(this.details.indexOf(element), 1)
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleWorkflowBrowserClick(index) {
        this.$store.commit('switch_workflowDialog');
        this.currentIndex = index;
      },
      handleFieldBrowserClick(index) {
        this.$store.commit('switch_FieldDialog', this.details[index].formid);
        this.currentIndex = index;
      },
      handleFormidClick(index) {
        if (this.details && this.details[index] && this.details[index].workflowid) {
          this.axios.get('/ServiceAction/com.eweaver.workflow.workflow.servlet.WorkflowRelateAction?action=formid&workflowid=' +
            this.details[index].workflowid + '&formType=' + this.details[index].formType).then(response => {
            this.formids = response.data;
          }).catch(err => {
            console.log(err)
          })
        }
      },
      handleSave() {
        if (this.details.length > 0) {
          let params = new URLSearchParams();
          params.append('workflowid', this.$store.state.globalStore.workflowid);
          params.append('list', JSON.stringify(this.details));
          this.axios.post('/ServiceAction/com.eweaver.workflow.workflow.servlet.WorkflowRelateAction?action=save',params,
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
      fieldRowData: function (newData, oldData) {
        this.details[this.currentIndex].fieldid = newData.fieldid;
        this.details[this.currentIndex].fieldName = newData.fieldName;
      },
      oid:function (newData,oldData) {
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

  .menu {
    float: right;
    margin: 20px 30px 10px 0;
  }

  .table {
    margin: 10px;
  }
</style>