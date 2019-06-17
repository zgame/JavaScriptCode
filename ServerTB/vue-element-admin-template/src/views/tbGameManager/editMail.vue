<template>
  <div class="app-container">
    <!--**************************条件搜索*******************************-->
    <div class="filter-container">
      <!--<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="玩家ID查询" v-model="listQuery.userId"></el-input>-->
      <!--<el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="setUserConfine">单独搜索</el-button>-->
      <el-button class="filter-item" type="success" v-waves icon="el-icon-plus" @click="ShowAddMailDialog(0, null,'create')">增加</el-button>
      <!--<el-button class="filter-item" type="warning" v-waves round icon="el-icon-error" @click="delUserConfine">修改</el-button>-->
      <!--<el-button class="filter-item" type="danger" v-waves round icon="el-icon-circle-plus-outline" @click="setUserConfine">删除</el-button>-->
    </div>
    <br>

    <!--******************************************List*******************************************-->
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row stripe>
      <el-table-column align="center" label='ID' width="100">
        <template slot-scope="scope">
          <!--{{scope.$index}}-->
          {{scope.row.id}}
        </template>
      </el-table-column>

      <el-table-column label="内置编号" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.uuid}}
        </template>
      </el-table-column>
    <el-table-column label="服务器ID" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.serverId}}
        </template>
      </el-table-column>
      <el-table-column label="玩家ID" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.userId}}
        </template>
      </el-table-column>
      <el-table-column label="邮件内容" width="600" align="center">
        <template slot-scope="scope">
          {{scope.row.mail}}
        </template>
      </el-table-column>
      <el-table-column label="起止时间" width="180" align="center">
        <template slot-scope="scope">
          {{scope.row.start_time}}
        </template>
      </el-table-column>
      <el-table-column label="发放分数" width="80" align="center">
        <template slot-scope="scope">
          {{scope.row.score}}
        </template>
      </el-table-column>
      <el-table-column label="发放道具" width="80" align="center">
        <template slot-scope="scope">
          {{scope.row.item}}
        </template>
      </el-table-column>
  <el-table-column label="道具数量" width="80" align="center">
        <template slot-scope="scope">
          {{scope.row.item_num}}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" type="primary" @click="ShowAddMailDialog(scope.row.id, null,'create')">新增</el-button>
          <el-button size="mini" icon="el-icon-edit-outline" type="success" @click="ShowAddMailDialog(scope.$index, scope.row,'edit')">编辑</el-button>
          <el-button size="mini" icon="el-icon-delete" type="danger" @click="DelMail(scope.row.id,scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>


    <!--**************************弹窗*******************************-->
    <el-dialog :title="增加邮件" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dlgData" :model="dlgData" label-position="left" label-width="120px" style='width: 600px; margin-left:50px;'>
        <el-form-item label="顺序号" prop="id">
          <el-input v-model="dlgData.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="内置编号" prop="uuid">
          <el-input v-model="dlgData.uuid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="服务器ID" prop="serverId">
          <el-input v-model="dlgData.serverId" ></el-input>
        </el-form-item>
        <el-form-item label="玩家ID" prop="userId">
          <el-input v-model="dlgData.userId" ></el-input>
        </el-form-item>
        <el-form-item label="邮件内容" prop="tip">
          <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10}" v-model="dlgData.mail" ></el-input>
        </el-form-item>
        <el-form-item label="起止时间" prop="start_time">
          <el-input v-model="dlgData.start_time" :disabled="true"></el-input>
          <el-date-picker v-model="dlgData.start_time" type="datetimerange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
          <!--<el-date-picker type="datetime" placeholder="开始时间" v-model="dlgData.start_time" style="width: 200px;"  value-format="yyyy-MM-dd HH:mm:ss" ></el-date-picker>-->
        </el-form-item>
        <!--<el-form-item label="结束时间" prop="start_time">-->
          <!--<el-input v-model="dlgData.start_time"></el-input>-->
          <!--<el-date-picker type="datetime" placeholder="结束时间" v-model="dlgData.start_time" style="width: 200px;"  value-format="yyyy-MM-dd HH:mm:ss" ></el-date-picker>-->
        <!--</el-form-item>-->
        <el-form-item label="发放分数" prop="score">
          <el-input v-model="dlgData.score"></el-input>
        </el-form-item>
        <el-form-item label="发放道具" prop="item">
          <el-input v-model="dlgData.item"></el-input>
        </el-form-item>
         <el-form-item label="道具数量" prop="item_num">
          <el-input v-model="dlgData.item_num"></el-input>
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
        <el-button v-if="dialogStatus==='create'" type="primary" icon="el-icon-success"  @click="AddMail">增加</el-button>
        <el-button v-else type="primary" icon="el-icon-success" @click="SetMail">确定</el-button>
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
  import { mapGetters } from 'vuex'
  import { getTime, parseTime } from '@/utils'
  import { getMail, setMail, addMail, delMail } from '@/api/tb_game_manager'
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
          uuid: '',
          mail: '',
          userId: '',
          serverId: '',
          start_time: '',
          score: '',
          item: '',
          item_num: ''
        },
        dialogFormVisible: false,
        dialogStatus: '',
        total: 0,
        listLoading: true,
        // **********校验规则*************
        rules: {
          userId: [{ required: true, trigger: 'blur', validator: validatIntegerMy }],
          score: [{ required: true, trigger: 'blur', validator: validatIntegerMy }],
          item: [{ required: true, trigger: 'blur', validator: validatIntegerMy }],
          item_num: [{ required: true, trigger: 'blur', validator: validatIntegerMy }]
        }
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
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
      this.GetMail()
    },
    methods: {
      GetMail() {
        //  ------------------------获取列表------------------------------
        this.listLoading = true
        getMail(this.listQuery).then(response => {
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
      //  ------------------------显示弹出窗口------------------------------
      ShowAddMailDialog(id, row, status) {
        this.dialogStatus = status
        this.dialogFormVisible = true // 显示出弹框
        if (status === 'create') {
          this.dlgData.id = this.total
          this.dlgData.uuid = ''
          this.dlgData.mail = '默认邮件内容'
          this.dlgData.userId = 0
          this.dlgData.serverId = ''
          const dayAfterTomorrow = new Date()
          dayAfterTomorrow.setTime(dayAfterTomorrow.getTime() + 3600 * 1000 * 24 * 2)
          this.dlgData.start_time = [parseTime(new Date()), parseTime(dayAfterTomorrow)]
          this.dlgData.score = 0
          this.dlgData.item = 0
          this.dlgData.item_num = 0
        } else { // 编辑
          this.dlgData.id = id
          this.dlgData.uuid = row.uuid
          this.dlgData.mail = row.mail
          this.dlgData.userId = row.userId
          this.dlgData.serverId = row.serverId
          this.dlgData.start_time = row.start_time
          this.dlgData.score = row.score
          this.dlgData.item = row.item
          this.dlgData.item_num = row.item_num
          if (status === 'delete') {
            this.dialogFormVisible = false // 不显示出弹框
          }
        }
      },
      AddMail() {
        //  -----------------------增加记录------------------------------
        this.dlgData.uuid = getTime('start')
        this.$refs.dlgData.validate((valid) => {
          if (valid) {
            let tip_type = 'warning'
            let tip_message = '确定要发送给玩家: ' + this.dlgData.userId + ' 么？' // 发送给单一玩家的提示
            if (this.dlgData.userId === -1) {
              tip_message = '警报！警报！你确定要发送给全部玩家么？ 务必确认好！务必确认好！' // 发送全体玩家的提示
              tip_type = 'error'
            }
            this.$confirm(tip_message, '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: tip_type }).then(() => {
              if (!this.roles.includes('admin')) {
                this.$notify({ title: '错误', message: '权限不够', type: 'error', duration: 2000 }) // 判断权限
              } else {
                return new Promise((resolve, reject) => {
                  const mail = JSON.stringify(this.dlgData, null, 1)
                  const roles = this.name
                  addMail({ mail, roles }).then(response => {
                    this.$notify({ title: '成功', message: '增加成功', type: 'success', duration: 2000 })
                    this.GetMail()
                    this.dialogFormVisible = false
                    resolve()
                  }).catch(error => {
                    reject(error)
                  })
                })
              }
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              })
            })
          }
        })
      },
      SetMail() {
        //  ------------------------修改记录------------------------------
        this.$refs.dlgData.validate((valid) => {
          if (valid) {
            return new Promise((resolve, reject) => {
              const mail = JSON.stringify(this.dlgData, null, 1)
              const index = this.dlgData.id
              const roles = this.name
              setMail({ mail, index, roles }).then(response => {
                this.$notify({ title: '成功', message: '修改成功', type: 'success', duration: 2000 })
                this.GetMail()
                this.dialogFormVisible = false
                resolve()
              }).catch(error => {
                reject(error)
              })
            })
          }
        })
      },
      DelMail(id, row) {
        //  ------------------------删除记录------------------------------
        this.$confirm('要删除该邮件么?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
          this.ShowAddMailDialog(id, row, 'delete')
          const mail = JSON.stringify(this.dlgData, null, 1)
          const roles = this.name
          return new Promise((resolve, reject) => {
            delMail({ mail, roles }).then(response => {
              this.$notify({ title: '成功', message: '删除成功', type: 'success', duration: 2000 })
              this.GetMail()
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
