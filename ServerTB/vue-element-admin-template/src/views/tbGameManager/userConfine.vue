<template>
  <div class="app-container">
    <!--**************************条件搜索*******************************-->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="玩家ID查询" v-model="listQuery.userId"></el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="getUserConfine">单独搜索</el-button>
      <el-button class="filter-item" type="success" v-waves icon="el-icon-search" @click="getUserList">全部搜索</el-button>
      <el-button class="filter-item" type="danger" v-waves round icon="el-icon-circle-plus-outline" @click="setUserConfine">封号</el-button>
      <el-button class="filter-item" type="warning" v-waves round icon="el-icon-error" @click="delUserConfine">解除</el-button>
    </div>
    <br>

    <!--******************************************List*******************************************-->
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row stripe>
      <el-table-column align="center" label='ID' width="55">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>

      <el-table-column label="玩家UID" width="120" align="center">
        <template slot-scope="scope">
          {{scope.row}}
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
  import { getConfine, getConfineList, setConfine, delConfine } from '@/api/tb_game_manager'
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
          userId: '',
          // gameid: '',
          starttime: '',
          endtime: '',
          time: []
        },
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
      this.getUserList()
    },
    methods: {
      getUserList() {
        this.listLoading = true
        //  ------------------------获取列表------------------------------
        getConfineList(this.listQuery).then(response => {
          this.list = response.data.items // 用返回的数据给列表赋值
          this.listLoading = false
          this.total = response.data.total // 设置总共有多少页面
        })
      },
      getUserConfine() {
        if (this.listQuery.userId === '') {
          this.listLoading = false
          this.$notify({ title: '提示', message: '需要输入玩家UID！', type: 'error', duration: 2000 })
          return
        }
        this.listLoading = true
        //  ------------------------查询单个玩家------------------------------
        getConfine(this.listQuery).then(response => {
          this.listLoading = false
          this.total = response.data.total // 设置总共有多少页面
          if (response.data.items === 1) {
            this.$notify({ title: '提示', message: '查询成功', type: 'success', duration: 2000 })
            this.list = [this.listQuery.userId]
          } else {
            this.list = []
            this.$notify({ title: '提示', message: '没有查询到', type: 'error', duration: 2000 })
          }
        })
      },
      setUserConfine() {
        if (this.listQuery.userId === '') {
          this.listLoading = false
          this.$notify({ title: '提示', message: '需要输入玩家UID！', type: 'error', duration: 2000 })
          return
        }
        this.listLoading = true
        //  ------------------------封号单个玩家------------------------------
        setConfine(this.listQuery).then(response => {
          this.list = [this.listQuery.userId]
          this.listLoading = false
          this.total = response.data.total // 设置总共有多少页面
          if (response.data.items === 1) {
            this.$notify({ title: '提示', message: '封号成功', type: 'success', duration: 2000 })
          } else {
            this.$notify({ title: '提示', message: '封号失败， 可能已经封了，可以查询一下！', type: 'error', duration: 2000 })
          }
        })
      },
      delUserConfine() {
        if (this.listQuery.userId === '') {
          this.listLoading = false
          this.$notify({ title: '提示', message: '需要输入玩家UID！', type: 'error', duration: 2000 })
          return
        }
        this.listLoading = true
        //  ------------------------解除单个玩家------------------------------
        delConfine(this.listQuery).then(response => {
          this.list = []
          this.listLoading = false
          this.total = response.data.total // 设置总共有多少页面
          if (response.data.items === 1) {
            this.$notify({ title: '提示', message: '解除成功', type: 'success', duration: 2000 })
          } else {
            this.$notify({ title: '提示', message: '解除失败，可能没有被封，可以查询一下！', type: 'error', duration: 2000 })
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
