<template>
  <div class="app-container">
    <!--**************************条件搜索*******************************-->
    <div class="filter-container">
      <!--<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="玩家ID查询" v-model="listQuery.userId"></el-input>-->
      <!--<el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="setUserConfine">单独搜索</el-button>-->
      <el-button class="filter-item" type="success" v-waves icon="el-icon-plus" @click="ShowAddTipDialog(0, null,'create')">增加</el-button>
      <!--<el-button class="filter-item" type="warning" v-waves round icon="el-icon-error" @click="delUserConfine">修改</el-button>-->
      <!--<el-button class="filter-item" type="danger" v-waves round icon="el-icon-circle-plus-outline" @click="setUserConfine">删除</el-button>-->

    </div>
    <br>

    <!--******************************************List*******************************************-->
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row stripe>
      <el-table-column align="center" label='ID' width="100">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>

       <el-table-column label="指定服务器" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.server}}
        </template>
      </el-table-column>
      <el-table-column label="跑马灯内容" width="800" align="center">
        <template slot-scope="scope">
          {{scope.row.tip}}
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="250" align="center">
        <template slot-scope="scope">
          {{scope.row.start_time}}
        </template>
      </el-table-column>
      <el-table-column label="间隔秒数" width="80" align="center">
        <template slot-scope="scope">
          {{scope.row.interval}}
        </template>
      </el-table-column>
      <el-table-column label="循环次数" width="80" align="center">
        <template slot-scope="scope">
          {{scope.row.loop}}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" type="primary" @click="ShowAddTipDialog(scope.row.id, null,'create')">新增</el-button>
          <el-button size="mini" icon="el-icon-edit-outline" type="success" @click="ShowAddTipDialog(scope.$index, scope.row,'edit')">编辑</el-button>
          <el-button size="mini" icon="el-icon-delete" type="danger" @click="DelTip(scope.row.id,scope.row)">删除</el-button>
        </template>
      </el-table-column>


    </el-table>



    <!--**************************弹窗*******************************-->
    <el-dialog :title="增加跑马灯" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dlgData" :model="dlgData" label-position="left" label-width="120px" style='width: 600px; margin-left:50px;'>
        <el-form-item label="编号" prop="id">
          <el-input v-model="dlgData.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="指定服务器" prop="id">
          <el-input v-model="dlgData.server" ></el-input>
        </el-form-item>
         <el-form-item label="跑马灯内容" prop="tip">
          <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10}" v-model="dlgData.tip" ></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="start_time">
          <el-input v-model="dlgData.start_time" :disabled="true"></el-input>
          <el-date-picker type="datetime" placeholder="开始时间" v-model="dlgData.start_time" style="width: 200px;"  value-format="yyyy-MM-dd HH:mm:ss" ></el-date-picker>
        </el-form-item>
         <el-form-item label="间隔秒数" prop="interval">
          <el-input v-model="dlgData.interval"></el-input>
        </el-form-item>
         <el-form-item label="循环次数" prop="loop">
          <el-input v-model="dlgData.loop"></el-input>
        </el-form-item>
        <!--<el-form-item label="间隔秒数" prop="state" v-if="dialogStatus!=='create'">-->
          <!--<el-select v-model="dlgData.state" placeholder="select">-->
            <!--<el-option label="开启" value="1"></el-option>-->
            <!--<el-option label="维护" value="0"></el-option>-->
            <!--<el-option label="关闭" value="-1"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-error" @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus==='create'" type="primary" icon="el-icon-success"  @click="AddTip">增加</el-button>
        <el-button v-else type="primary" icon="el-icon-success" @click="SetTip">确定</el-button>
      </div>
    </el-dialog>


    <!--**************************分页*******************************-->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
                     :page-sizes="[5,10,20,50,100,200]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>
<script>
  import { getTip, setTip, addTip, delTip } from '@/api/tb_game_manager'
  import { validatInteger } from '@/utils/validate'
  import waves from '@/directive/waves' // 水波纹指令
  import LineChart from '@/components/Charts/Line3Chart'
  export default {
    components: {
      LineChart
    },
    directives: {
      waves
    },
    data() {
      const validatIntegerMy = (rule, value, callback) => {
        if (!validatInteger(value)) {
          callback(new Error('必须使用数字'))
        } else {
          callback()
        }
      }
      return {
        list: null,
        // **********分页*************
        listQuery: {
          page: 1,
          limit: 10
          // userId: '',
          // gameid: '',
          // starttime: '',
          // endtime: '',
          // time: []
        },
        dlgData: {
          id: '',
          server: '',
          tip: '',
          start_time: '',
          interval: '',
          loop: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        total: 0,
        listLoading: true,
        // **********校验规则*************
        rules: {
          interval: [{ required: true, trigger: 'blur', validator: validatIntegerMy }],
          loop: [{ required: true, trigger: 'blur', validator: validatIntegerMy }]
        }
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    created() {
      this.GetTip()
    },
    methods: {
      GetTip() {
        this.listLoading = true
        //  ------------------------获取列表------------------------------
        getTip(this.listQuery).then(response => {
          this.list = response.data.items // 用返回的数据给列表赋值
          this.listLoading = false
          this.total = response.data.total // 设置总共有多少页面
          this.list = []
          for (const i in response.data.items) {
            const str = response.data.items[i]
            const obj = JSON.parse(str)
            this.list.push(obj)
          }
        })
      },
      ShowAddTipDialog(id, row, status) {
        this.dialogStatus = status
        this.dialogFormVisible = true // 显示出弹框
        if (status === 'create') {
          this.dlgData.id = this.total
          this.dlgData.tip = ''
          this.dlgData.server = ''
          this.dlgData.start_time = ''
          this.dlgData.interval = ''
          this.dlgData.loop = ''
        } else { // 编辑
          this.dlgData.id = id
          this.dlgData.tip = row.tip
          this.dlgData.server = row.server
          this.dlgData.start_time = row.start_time
          this.dlgData.interval = row.interval
          this.dlgData.loop = row.loop
          if (status === 'delete') {
            this.dialogFormVisible = false // 不显示出弹框
          }
        }
      },
      AddTip() {
        //  -----------------------增加记录------------------------------
        this.$refs.dlgData.validate((valid) => {
          if (valid) {
            return new Promise((resolve, reject) => {
              const tip = JSON.stringify(this.dlgData, null, 1)
              addTip({ tip }).then(response => {
                this.$notify({ title: '成功', message: '增加成功', type: 'success', duration: 2000 })
                this.GetTip()
                this.dialogFormVisible = false
                resolve()
              }).catch(error => {
                reject(error)
              })
            })
          }
        })
      },
      SetTip() {
        //  ------------------------修改记录------------------------------
        this.$refs.dlgData.validate((valid) => {
          if (valid) {
            return new Promise((resolve, reject) => {
              const tip = JSON.stringify(this.dlgData, null, 1)
              const index = this.dlgData.id
              setTip({ tip, index }).then(response => {
                this.$notify({ title: '成功', message: '修改成功', type: 'success', duration: 2000 })
                this.GetTip()
                this.dialogFormVisible = false
                resolve()
              }).catch(error => {
                reject(error)
              })
            })
          }
        })
      },
      DelTip(id, row) {
        this.$confirm('要删除该跑马灯么?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
          this.ShowAddTipDialog(id, row, 'delete')
          const tip = JSON.stringify(this.dlgData, null, 1)
          return new Promise((resolve, reject) => {
            delTip({ tip }).then(response => {
              this.$notify({ title: '成功', message: '删除成功', type: 'success', duration: 2000 })
              this.GetTip()
              resolve()
            }).catch(error => {
              reject(error)
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // --------------------------------分页--------------------------------
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getUserList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getUserList()
      },
      // --------------------------------搜索--------------------------------
      handleFilter() {
        this.listQuery.page = 1
        this.getUserList()
      }
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 50px 60px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }
</style>
