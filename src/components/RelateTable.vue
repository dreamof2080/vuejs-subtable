<template>
  <div class="main">
    <div class="menu">
      <el-row>
        <el-button type="primary" icon="el-icon-plus" size="mini" circle @click="handleAdd"></el-button>
        <el-button type="danger" icon="el-icon-minus" size="mini" circle @click="handleDelete"></el-button>
      </el-row>
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
            <el-input v-model="scope.row.flowid" v-show="false" size="mini"></el-input>
            <el-input placeholder="请选择" v-model="scope.row.flowName" size="small">
              <el-button slot="append" icon="el-icon-search" @click="handleClick(scope.$index)" size="small"></el-button>
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
              <el-select v-model="scope.row.formid" placeholder="请选择" size="small">
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
            <el-select v-model="scope.row.fieldid" placeholder="请选择" size="small">
              <el-option
                  v-for="item in fieldids"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
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
    props:['workflowRowData'],
    data() {
      return {
        details: [{
          id:1,
          flowid: '',
          flowName:'',
          formType: '1',
          formid: '111',
          fieldid: '111',
          condition: 'requestbase.isdelete=0'
        }, {
          id:2,
          flowid: '',
          flowName:'',
          formType: '0',
          formid: '111',
          fieldid: '222',
          condition: 'requestbase.isdelete=0'
        }, {
          id:3,
          flowid: '',
          flowName:'',
          formType: '0',
          formid: '111',
          fieldid: '111',
          condition: 'requestbase.isdelete=0'
        }],
        formTypeOptions:[
          {
            value:'0',
            label:'主表'
          },
          {
            value:'1',
            label:'子表'
          }
        ],
        multipleSelection: [],
        formids:[
          {
            value:'111',
            label:'报销主表'
          },
          {
            value:'222',
            label:'报销子表'
          }
        ],
        fieldids:[
          {
            value:'111',
            label:'字段1'
          },
          {
            value:'222',
            label:'字段2'
          }
        ],
        deleteIds:[],
        currentIndex:null
      }
    },
    methods:{
      handleAdd() {
        this.details.push({
          id: 99,
          flowid: '',
          flowName:'',
          formType: '',
          formid: '111',
          fieldid: '111',
          condition: 'requestbase.isdelete=0'
        });
      },
      handleDelete(){
        this.multipleSelection.forEach(element=>{
          if (this.deleteIds.indexOf(element.id)===-1){
            this.deleteIds.push(element.id);
          }
          this.details.splice(this.details.indexOf(element),1)
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleClick(index){
        this.$store.commit('switch_workflowDialog');
        this.currentIndex = index;
      }
    },
    watch:{
      workflowRowData:function (newData,oldData) {
        this.details[this.currentIndex].flowid = newData.flowid;
        this.details[this.currentIndex].flowName = newData.flowName;
      }
    }
  }
</script>

<style scoped>
  .main{
    width:80%;
    margin:0 auto;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  .menu{
    float: left;
    margin: 20px 0 10px 30px;

  }
  .table{
    margin:10px;
  }
</style>