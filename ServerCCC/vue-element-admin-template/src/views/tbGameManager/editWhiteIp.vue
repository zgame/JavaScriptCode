<template>
  <div class="app-container">
    <!--**************************条件搜索*******************************-->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入IP" v-model="listQuery.ip"></el-input>
      <!--<el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="getUserConfine">单独搜索</el-button>-->
      <!--<el-button class="filter-item" type="success" v-waves icon="el-icon-search" @click="getUserList">全部搜索</el-button>-->
      <el-button class="filter-item" type="success" v-waves round icon="el-icon-circle-plus-outline" @click="AddIp">新增</el-button>
      <!--<el-button class="filter-item" type="warning" v-waves round icon="el-icon-error" @click="delUserConfine">解除</el-button>-->
    </div>
    <br>

    <!--******************************************List*******************************************-->
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row stripe>
      <el-table-column align="center" label='ID' width="55">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>

      <el-table-column label="IP白名单" width="420" align="center">
        <template slot-scope="scope">
          {{scope.row}}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!--<el-button size="mini" icon="el-icon-edit" type="primary" @click="ShowAddIpDialog(scope.row.id, null,'create')">新增</el-button>-->
          <!--<el-button size="mini" icon="el-icon-edit-outline" type="success" @click="ShowAddIpDialog(scope.$index, scope.row,'edit')">编辑</el-button>-->
          <el-button size="mini" icon="el-icon-delete" type="danger" @click="DelIp(scope.$index,scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <!--**************************分页*******************************-->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
                     :page-sizes="[5,10,20,50,100,200]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>
<script>
  import { getIp, addIp, delIp } from '@/api/tb_game_manager'
  // import { parseTime, pickerOptions } from '@/utils'
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
      return {
        list: null,
        // **********分页*************
        listQuery: {
          page: 1,
          limit: 10,
          ip: ''
          // gameid: '',
          // starttime: '',
          // endtime: '',
          // time: []
        },
        // dlgData: {
        //   id: '',
        //   mail: '',
        //   userId: '',
        //   serverId: '',
        //   start_time: '',
        //   score: '',
        //   item: '',
        //   item_num: ''
        // },
        total: 0,
        listLoading: true
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
      this.GetIp()
    },
    methods: {
      //  ------------------------显示弹出窗口------------------------------
      // ShowAddIpDialog(id, row, status) {
      //   this.dialogStatus = status
      //   if (status !== 'delete') {
      //     this.dialogFormVisible = true // 显示出弹框
      //   }
      //   this.dlgData.id = this.total
      //   this.dlgData.mail = ''
      //   this.dlgData.start_time = ''
      //   this.dlgData.score = ''
      //   this.dlgData.item = ''
      //   this.dlgData.item_num = ''
      //   if (row !== null) { // 编辑
      //     this.dlgData.id = id
      //     this.dlgData.mail = row.mail
      //     this.dlgData.start_time = row.start_time
      //     this.dlgData.score = row.score
      //     this.dlgData.item = row.item
      //     this.dlgData.item_num = row.item_num
      //   }
      // },
      GetIp() {
        this.listLoading = true
        //  ------------------------获取列表------------------------------
        getIp(this.listQuery).then(response => {
          this.list = response.data.items // 用返回的数据给列表赋值
          this.listLoading = false
          this.total = response.data.total // 设置总共有多少页面
        })
      },
      AddIp() {
        if (this.listQuery.ip === '') {
          this.listLoading = false
          this.$notify({ title: '提示', message: '需要输入IP！', type: 'error', duration: 2000 })
          return
        }
        this.listLoading = true
        //  ------------------------新增记录------------------------------
        addIp(this.listQuery).then(response => {
          this.listLoading = false
          this.total = response.data.total // 设置总共有多少页面
          if (response.data.items === 1) {
            this.$notify({ title: '提示', message: '增加成功', type: 'success', duration: 2000 })
            this.list = [this.listQuery.ip]
          } else {
            this.$notify({ title: '提示', message: '没有查询到', type: 'error', duration: 2000 })
          }
          this.GetIp()
        })
      },
      // SetIp() {
      //   if (this.listQuery.userId === '') {
      //     this.listLoading = false
      //     this.$notify({ title: '提示', message: '需要输入玩家UID！', type: 'error', duration: 2000 })
      //     return
      //   }
      //   this.listLoading = true
      //   //  ------------------------修改------------------------------
      //   setIp(this.listQuery).then(response => {
      //     this.list = [this.listQuery.userId]
      //     this.listLoading = false
      //     this.total = response.data.total // 设置总共有多少页面
      //     if (response.data.items === 1) {
      //       this.$notify({ title: '提示', message: '封号成功', type: 'success', duration: 2000 })
      //     } else {
      //       this.$notify({ title: '提示', message: '封号失败， 可能已经封了，可以查询一下！', type: 'error', duration: 2000 })
      //     }
      //   })
      // },
      DelIp(id, row) {
        // if (this.listQuery.ip === '') {
        //   this.listLoading = false
        //   this.$notify({ title: '提示', message: '需要输入玩家UID！', type: 'error', duration: 2000 })
        //   return
        // }
        this.listQuery.ip = row
        this.listLoading = true
        //  ------------------------删除记录------------------------------
        delIp(this.listQuery).then(response => {
          // this.list = []
          this.listLoading = false
          this.total = response.data.total // 设置总共有多少页面
          if (response.data.items === 1) {
            this.$notify({ title: '提示', message: '删除成功', type: 'success', duration: 2000 })
          } else {
            this.$notify({ title: '提示', message: '解除失败，可能没有被封，可以查询一下！', type: 'error', duration: 2000 })
          }
          this.GetIp()
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
