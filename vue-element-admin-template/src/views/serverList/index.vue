<template>
  <div class="app-container">
    <!--**************************条件搜索*******************************-->
    <!--<div class="filter-container">-->
      <!--&lt;!&ndash;<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="按UID查询" v-model="listQuery.uid"></el-input>&ndash;&gt;-->
      <!--&lt;!&ndash;********下拉选择框*********&ndash;&gt;-->
      <!--&lt;!&ndash;<el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.channel" placeholder="按渠道查询">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-option v-for="item in  channelTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">&ndash;&gt;-->
      <!--&lt;!&ndash;</el-option>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
      <!--<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="按服务器ID查询" v-model="listQuery.serverip"></el-input>-->
      <!--<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="游戏类型查询" v-model="listQuery.gameid"></el-input>-->
      <!--&lt;!&ndash;********时间选择框********&ndash;&gt;-->
      <!--&lt;!&ndash;<el-date-picker v-model="listQuery.time" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2"></el-date-picker>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-date-picker type="date" placeholder="开始时间" v-model="listQuery.starttime" style="width: 200px;"></el-date-picker>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-date-picker type="date" placeholder="截止时间" v-model="listQuery.endtime" style="width: 200px;"></el-date-picker>&ndash;&gt;-->
      <!--&lt;!&ndash;********按钮********&ndash;&gt;-->
      <!--&lt;!&ndash;<el-button class="filter-item" type="success" v-waves icon="el-icon-time" @click="handleTimeYestoday">昨天</el-button>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-button class="filter-item" type="success" v-waves icon="el-icon-time" @click="handleTimeToday">今天</el-button>&ndash;&gt;-->
      <!--&lt;!&ndash;<el-button class="filter-item" type="success" v-waves icon="el-icon-time" @click="handleTimeOneWeak">前一周</el-button>&ndash;&gt;-->

      <!--<el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">开始搜索</el-button>-->
      <!--&lt;!&ndash;<el-button class="filter-item" type="warning" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出Excel</el-button>&ndash;&gt;-->
    <!--</div>-->
    <br>

    <!--**************************图表*******************************-->
    <!--<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">-->
      <!--<line-chart :chart-data="lineChartData"></line-chart>-->
    <!--</el-row>-->

    <!--******************************************List*******************************************-->
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row stripe>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>

      <el-table-column label="服务器地址" width="400" align="center">
        <template slot-scope="scope">
          {{scope.row.server_ip}}
        </template>
      </el-table-column>

      <el-table-column label="服务器名字" width="300" align="center">
        <template slot-scope="scope">

          <el-tag>{{scope.row.server_name}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="服务器状态" width="110" align="center">
        <template slot-scope="scope">
          <!--{{scope.row.server_state}}-->
          <el-tag :type="scope.row.server_state | statusFilter">{{scope.row.server_state| stateFilter}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="addList(scope.row.id, scope.row)">新增</el-button>
          <el-button size="mini" @click="editList(scope.row.id, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteList(scope.row.id, scope.row)">删除</el-button>
        </template>
      </el-table-column>


    </el-table>
    <!--**************************分页*******************************-->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
                     :page-sizes="[5,10,20,50,100,200,2000]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--**************************弹窗*******************************-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dlgData" :model="dlgData" label-position="left" label-width="120px" style='width: 400px; margin-left:50px;'>

        <el-form-item label="服务器名字" prop="name">
          <el-input v-model="dlgData.name"></el-input>
        </el-form-item>

        <el-form-item label="服务器地址" prop="server">
          <el-input v-model="dlgData.server"></el-input>
        </el-form-item>

        <el-form-item label="服务器状态" prop="state" v-if="dialogStatus!=='create'">
          <el-input v-model="dlgData.state"></el-input>
        </el-form-item>



        <!--<el-form-item label="面板可见" >-->
          <!--<el-switch v-model="dlgData.dashboard" active-color="#13ce66" inactive-color="#ff4949" active-value=1 inactive-value=0></el-switch>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="统计可见" >-->
          <!--<el-switch v-model="dlgData.statis" active-color="#13ce66" inactive-color="#ff4949" active-value=1 inactive-value=0></el-switch>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="编辑可见">-->
          <!--<el-switch v-model="dlgData.edit" active-color="#13ce66" inactive-color="#ff4949" active-value=1 inactive-value=0></el-switch>-->
        <!--</el-form-item>-->

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus==='create'" type="primary" @click="AddListAction">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="EditListAction">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import { getList, actionAddList, actionEditList, actionDelList } from '@/api/server_list'
  // import { parseTime, pickerOptions } from '@/utils'
  import waves from '@/directive/waves' // 水波纹指令
  // import LineChart from '@/components/Charts/Line3Chart'

  // 这里定义服务器列表的状态显示
  const ServerListStateTypeOptions = [
    { key: 0, display_name: '维护' },
    { key: 1, display_name: '开放' },
    { key: -1, display_name: '关闭' },
    { key: 99, display_name: '备用' }
  ]

  const ServerListStateTypeOptionsKeyValue = ServerListStateTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})

  export default {
    components: {
      // LineChart
    },
    directives: {
      waves
    },
    data() {
      return {
        list: null,
        // **********分页*************
        listQuery: {
          page: 1,
          limit: 10,
          serverip: '',
          gameid: ''
          // starttime: '',
          // endtime: '',
          // time: [] // 备用
        },
        total: 0,
        listLoading: true,
        dialogFormVisible: false,
        // **********表格*************
        dlgData: {
          name: '',
          server: '',
          state: ''
        },
        // **********弹窗变量*************
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        // **********校验规则*************
        rules: {
          name: [{ required: true, message: '必须有名字', trigger: 'change' }, { min: 5, max: 19, message: '长度在 5 到 19 个字符', trigger: 'blur' }],
          server: [{ required: true, message: '必须有地址', trigger: 'blur' }, { min: 5, max: 59, message: '长度在 5 到 59 个字符', trigger: 'blur' }],
          state: [{ required: true, message: '0是维护，1是开放，-1是关闭', trigger: 'blur' }, { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }]
        }
        //* **********日期选择器******************
        // pickerOptions2: {
        //   shortcuts: pickerOptions
        // },
        //* **********图表******************
        // lineChartData: {
        //   Data1: [],
        //   Data2: [],
        //   Data3: [],
        //   chartTitle: ['鱼数量', '子弹数量', '椅子'],
        //   chartXaxis: []
        // }
      }
    },
    filters: {
      stateFilter(state) {
        return ServerListStateTypeOptionsKeyValue[state] // 这里返回服务器列表的状态显示，上线，还是维护
      },
      statusFilter(status) {
        const statusMap = { // 这是用来定义服务器列表状态下面的标签颜色的
          '1': 'success',
          '0': 'info',
          '99': 'warning',
          '-1': 'danger'
        }
        return statusMap[status.toString()]
      }
    },
    created() {
      this.getUserList()
    },
    methods: {
      getUserList() {
        this.listLoading = true
        //  ------------------------获取列表------------------------------
        getList(this.listQuery).then(response => {
          this.list = response.data.items // 用返回的数据给列表赋值
          this.listLoading = false
          this.total = response.data.total // 设置总共有多少页面

          // // ------设置图表的显示----
          // this.lineChartData.Data1 = []
          // this.lineChartData.Data2 = []
          // this.lineChartData.Data3 = []
          // this.lineChartData.chartXaxis = []
          // for (const value of this.list) {
          //   this.lineChartData.Data1.push(value.fish_num)
          //   this.lineChartData.Data2.push(value.bullet_num)
          //   this.lineChartData.Data3.push(value.seat_array)
          //   this.lineChartData.chartXaxis.push(value.table_id)
          // }
        })
      },

      // --------------------------------删除用户--------------------------------
      deleteList(index, row) {
        // actionDelUser()
        // const index = this.list.indexOf(row)
        this.$confirm('要删除该服务器么?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
          return new Promise((resolve, reject) => {
            actionDelList(row.id).then(response => {
              this.$notify({ title: '成功', message: '删除成功', type: 'success', duration: 2000 })
              this.getUserList()
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
      // --------------------------------添加用户--------------------------------
      addList(index, row) {
        this.dialogFormVisible = true
        this.dialogStatus = 'create'
        this.dlgData.name = '服务器名字'
        this.dlgData.server = '172.16.140.123:8123:8089'
        this.dlgData.state = 0
      },
      AddListAction(index, row) {
        this.$refs.dlgData.validate((valid) => {
          if (valid) {
            return new Promise((resolve, reject) => {
              actionAddList(this.dlgData.name, this.dlgData.server).then(response => {
                this.$notify({ title: '成功', message: '增加成功', type: 'success', duration: 2000 })
                this.getUserList()
                this.dialogFormVisible = false
                resolve()
              }).catch(error => {
                reject(error)
              })
            })
          }
        })
      },
      // --------------------------------修改用户--------------------------------
      editList: function(index, row) {
        this.dialogFormVisible = true
        this.dialogStatus = 'update'

        this.dlgData.id = row.id
        this.dlgData.name = row.server_name
        this.dlgData.server = row.server_ip
        this.dlgData.state = '' + row.server_state
      },
      EditListAction(index, row) {
        this.$refs['dlgData'].validate((valid) => {
          if (valid) {
            return new Promise((resolve, reject) => {
              actionEditList(this.dlgData.id, this.dlgData.name, this.dlgData.server, this.dlgData.state).then(response => {
                this.$notify({ title: '成功', message: '编辑成功', type: 'success', duration: 2000 })
                this.getUserList()
                this.dialogFormVisible = false
                resolve()
              }).catch(error => {
                reject(error)
              })
            })
          }
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
        // 处理成标准日期字符串
        // console.info('' + this.listQuery.time)

        // if (this.listQuery.time === null) {
        //   this.listQuery.starttime = ''
        //   this.listQuery.endtime = ''
        // } else {
        //   if (typeof this.listQuery.time[0] === 'string') {
        //     // 因为快捷按钮给time赋值成了string，所以要判断一下
        //     this.listQuery.starttime = this.listQuery.time[0]
        //     this.listQuery.endtime = this.listQuery.time[1]
        //   } else {
        //     this.listQuery.starttime = parseTime(this.listQuery.time[0]).substring(0, 10)
        //     this.listQuery.endtime = parseTime(this.listQuery.time[1]).substring(0, 10)
        //   }
        // }

        this.getUserList()
      }
      // // --------------------------------一周--------------------------------
      // handleTimeOneWeak() {
      //   this.listQuery.page = 1
      //   const week = new Date()
      //   week.setTime(week.getTime() - 3600 * 1000 * 24 * 7)
      //   this.listQuery.starttime = parseTime(week).substring(0, 10)
      //   this.listQuery.endtime = parseTime(new Date()).substring(0, 10)
      //   this.listQuery.time = [this.listQuery.starttime, this.listQuery.endtime]
      //   this.getUserList()
      // },
      // // --------------------------------今天--------------------------------
      // handleTimeToday() {
      //   this.listQuery.page = 1
      //   const day = new Date()
      //   day.setTime(day.getTime() + 3600 * 1000 * 24)
      //   this.listQuery.starttime = parseTime(new Date()).substring(0, 10)
      //   this.listQuery.endtime = parseTime(day).substring(0, 10)
      //   this.listQuery.time = [this.listQuery.starttime, this.listQuery.endtime]
      //   this.getUserList()
      // }, // --------------------------------昨天--------------------------------
      // handleTimeYestoday() {
      //   this.listQuery.page = 1
      //   const day = new Date()
      //   day.setTime(day.getTime() - 3600 * 1000 * 24)
      //   this.listQuery.starttime = parseTime(day).substring(0, 10)
      //   this.listQuery.endtime = parseTime(new Date()).substring(0, 10)
      //   this.listQuery.time = [this.listQuery.starttime, this.listQuery.endtime]
      //   this.getUserList()
      // }
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
