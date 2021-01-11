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
    <el-button class="filter-item" type="success" v-waves icon="el-icon-plus" @click="addList(0, null)">增加</el-button>
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

<!--      <el-table-column label="服务器地址" width="400" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          {{scope.row.server_ip}}-->
<!--        </template>-->
<!--      </el-table-column>-->

      <el-table-column label="sellingway" width="120" align="center">
        <template slot-scope="scope">     <el-tag>{{scope.row.sellingway}}</el-tag>        </template>
      </el-table-column>
      <el-table-column label="recommend" width="120" align="center">
        <template slot-scope="scope">     <el-tag>{{scope.row.recommend}}</el-tag>        </template>
      </el-table-column>
      <el-table-column label="recommendactivity" width="120" align="center">
        <template slot-scope="scope">     <el-tag>{{scope.row.recommendactivity}}</el-tag>        </template>
      </el-table-column>
      <el-table-column label="price" width="120" align="center">
        <template slot-scope="scope">     <el-tag>{{scope.row.price}}</el-tag>        </template>
      </el-table-column>
      <el-table-column label="discountprice" width="120" align="center">
        <template slot-scope="scope">     <el-tag>{{scope.row.discountprice}}</el-tag>        </template>
      </el-table-column>
      <el-table-column label="starttime" width="150" align="center">
        <template slot-scope="scope">     <el-tag>{{scope.row.starttime}}</el-tag>        </template>
      </el-table-column>
      <el-table-column label="endtime" width="150" align="center">
        <template slot-scope="scope">     <el-tag>{{scope.row.endtime}}</el-tag>        </template>
      </el-table-column>

<!--      <el-table-column label="服务器状态" width="110" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          &lt;!&ndash;{{scope.row.server_state}}&ndash;&gt;-->
<!--          <el-tag :type="scope.row.server_state | statusFilter">{{scope.row.server_state| stateFilter}}</el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" type="primary" @click="addList(scope.row.id, scope.row)">新增</el-button>
          <el-button size="mini" icon="el-icon-edit-outline" type="success" @click="editList(scope.row.id, scope.row)">编辑</el-button>
          <el-button size="mini" icon="el-icon-delete" type="danger" @click="deleteList(scope.row.id, scope.row)">删除</el-button>
        </template>
      </el-table-column>


    </el-table>
    <!--**************************分页*******************************-->
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page"
                     :page-sizes="[5,10,20,50,100,200]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

    <!--**************************弹窗*******************************-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dlgData" :model="dlgData" label-position="left" label-width="120px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="id" prop="name">
          <el-input v-model="dlgData.id"></el-input>
        </el-form-item>
        <el-form-item label="sellingway" prop="server">
          <el-input v-model="dlgData.sellingway"></el-input>
        </el-form-item>
        <el-form-item label="sellingway" prop="server">
          <el-input v-model="dlgData.sellingway"></el-input>
        </el-form-item>
        <el-form-item label="recommend" prop="server">
          <el-input v-model="dlgData.recommend"></el-input>
        </el-form-item>
        <el-form-item label="recommendactivity" prop="server">
          <el-input v-model="dlgData.recommendactivity"></el-input>
        </el-form-item>
        <el-form-item label="price" prop="server">
          <el-input v-model="dlgData.price"></el-input>
        </el-form-item>
        <el-form-item label="discountprice" prop="server">
          <el-input v-model="dlgData.discountprice"></el-input>
        </el-form-item>
        <el-form-item label="starttime" prop="server">
          <el-input v-model="dlgData.starttime"></el-input>
        </el-form-item>
        <el-form-item label="endtime" prop="server">
          <el-input v-model="dlgData.endtime"></el-input>
        </el-form-item>
<!--        <el-form-item label="服务器状态" prop="state" v-if="dialogStatus!=='create'">-->
<!--          <el-select v-model="dlgData.state" placeholder="select">-->
<!--            <el-option label="开启" value="1"></el-option>-->
<!--            <el-option label="维护" value="0"></el-option>-->
<!--            <el-option label="关闭" value="-1"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button icon="el-icon-error" @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus==='create'" type="primary" icon="el-icon-success"  @click="AddListAction">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" icon="el-icon-success" @click="EditListAction">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  import { getList, actionAddList, actionEditList, actionDelList } from '@/api/portia_shop'
  // import { parseTime, pickerOptions } from '@/utils'
  import waves from '@/directive/waves' // 水波纹指令
  // import LineChart from '@/components/Charts/Line3Chart'

  // 这里定义服务器列表的状态显示
  // const ServerListStateTypeOptions = [
  //   { key: 0, display_name: '维护' },
  //   { key: 1, display_name: '开放' },
  //   { key: -1, display_name: '关闭' },
  //   { key: 99, display_name: '备用' }
  // ]
  //
  // const ServerListStateTypeOptionsKeyValue = ServerListStateTypeOptions.reduce((acc, cur) => {
  //   acc[cur.key] = cur.display_name
  //   return acc
  // }, {})

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
          id: '',
          sellingway: '',
          recommend: '',
          recommendactivity: '',
          price: '',
          discountprice: '',
          starttime: '',
          endtime: ''
        },
        // **********弹窗变量*************
        dialogStatus: '',
        textMap: {
          update: '编辑',
          create: '新增'
        },
        // **********校验规则*************
        rules: {
          id: [{ required: true, message: '不能空', trigger: 'change' }, { min: 1, max: 20, message: '长度在 1 到 19 个字符', trigger: 'blur' }],
          sellingway: [{ required: true, message: '不能空', trigger: 'blur' }, { min: 1, max: 20, message: '长度在 1 到 19 个字符', trigger: 'blur' }],
          recommend: [{ required: true, message: '不能空', trigger: 'blur' }, { min: 1, max: 20, message: '长度在 1 到 19 个字符', trigger: 'blur' }],
          recommendactivity: [{ required: true, message: '不能空', trigger: 'blur' }, { min: 1, max: 20, message: '长度在 1 到 19 个字符', trigger: 'blur' }],
          price: [{ required: true, message: '不能空', trigger: 'blur' }, { min: 1, max: 20, message: '长度在 1 到 19 个字符', trigger: 'blur' }],
          discountprice: [{ required: true, message: '不能空', trigger: 'blur' }, { min: 1, max: 20, message: '长度在 1 到 19 个字符', trigger: 'blur' }],
          starttime: [{ required: true, message: '不能空', trigger: 'blur' }, { min: 10, max: 10, message: '长度在 10 个字符', trigger: 'blur' }],
          endtime: [{ required: true, message: '不能空', trigger: 'blur' }, { min: 10, max: 10, message: '长度在 10  个字符', trigger: 'blur' }]
        }
      }
    },
    filters: {
      // stateFilter(state) {
      //   return ServerListStateTypeOptionsKeyValue[state] // 这里返回服务器列表的状态显示，上线，还是维护
      // },
      // statusFilter(status) {
      //   const statusMap = { // 这是用来定义服务器列表状态下面的标签颜色的
      //     '1': 'success',
      //     '0': 'info',
      //     '99': 'warning',
      //     '-1': 'danger'
      //   }
      //   return statusMap[status.toString()]
      // }
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
        })
      },

      // --------------------------------删除用户--------------------------------
      deleteList(index, row) {
        // actionDelUser()
        // const index = this.list.indexOf(row)
        this.$confirm('要删除么?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
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
        this.dlgData.id = '1'
        this.dlgData.sellingway = '0'
        this.dlgData.recommend = '0'
        this.dlgData.recommendactivity = '0'
        this.dlgData.price = '0'
        this.dlgData.discountprice = '-1'
        this.dlgData.starttime = '-1'
        this.dlgData.endtime = '-1'
      },
      AddListAction(index, row) {
        this.$refs.dlgData.validate((valid) => {
          if (valid) {
            return new Promise((resolve, reject) => {
              actionAddList(this.dlgData.id, this.dlgData.sellingway, this.dlgData.recommend, this.dlgData.recommendactivity, this.dlgData.price, this.dlgData.discountprice, this.dlgData.starttime, this.dlgData.endtime).then(response => {
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
        this.dlgData.id = '1'
        this.dlgData.sellingway = '0'
        this.dlgData.recommend = '0'
        this.dlgData.recommendactivity = '0'
        this.dlgData.price = '0'
        this.dlgData.discountprice = '-1'
        this.dlgData.starttime = '-1'
        this.dlgData.endtime = '-1'
        this.dialogStatus = 'update'

        this.dlgData.id = row.id
        this.dlgData.sellingway = '' + row.sellingway
        this.dlgData.recommend = '' + row.recommend
        this.dlgData.recommendactivity = '' + row.recommendactivity
        this.dlgData.price = row.price
        this.dlgData.discountprice = row.discountprice
        this.dlgData.starttime = row.starttime
        this.dlgData.endtime = row.endtime
      },
      EditListAction(index, row) {
        this.$refs['dlgData'].validate((valid) => {
          if (valid) {
            return new Promise((resolve, reject) => {
              actionEditList(this.dlgData.id, this.dlgData.sellingway, this.dlgData.recommend, this.dlgData.recommendactivity, this.dlgData.price, this.dlgData.discountprice, this.dlgData.starttime, this.dlgData.endtime).then(response => {
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
