<template>
  <div class="app-container">
    <!--**************************条件搜索*******************************-->
    <div class="filter-container">
      <!--<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="按UID查询" v-model="listQuery.uid"></el-input>-->
      <!--********下拉选择框*********-->
      <!--<el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.channel" placeholder="按渠道查询">-->
        <!--<el-option v-for="item in  channelTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">-->
        <!--</el-option>-->
      <!--</el-select>-->
      <!--<el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="按服务器ID查询" v-model="listQuery.serverid"></el-input>-->
      <!--********时间选择框********-->
      <el-date-picker v-model="listQuery.time" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2"></el-date-picker>
      <!--<el-date-picker type="date" placeholder="开始时间" v-model="listQuery.starttime" style="width: 200px;"></el-date-picker>-->
      <!--<el-date-picker type="date" placeholder="截止时间" v-model="listQuery.endtime" style="width: 200px;"></el-date-picker>-->
      <!--********按钮********-->
      <el-button class="filter-item" type="success" v-waves icon="el-icon-time" @click="handleTimeYestoday">昨天</el-button>
      <el-button class="filter-item" type="success" v-waves icon="el-icon-time" @click="handleTimeToday">今天</el-button>
      <el-button class="filter-item" type="danger" round  v-waves icon="el-icon-time" @click="handleTimeOneWeak">前一周</el-button>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">开始搜索</el-button>
      <el-button class="filter-item" type="warning" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出Excel</el-button>
    </div>
    <br>

    <!--**************************图表*******************************-->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"></line-chart>
    </el-row>


    <!--**************************表格*******************************-->
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row stripe>
      <el-table-column align="center" label='日期' width="150" sortable prop="user_id">
        <template slot-scope="scope">  <i class="el-icon-time"></i><span>{{scope.row.day}}</span></template>
      </el-table-column>
      <!--<el-table-column label="渠道" width="200" align="center" sortable prop="platform_id">-->
        <!--<template slot-scope="scope">-->
          <!--<span class="link-type">{{scope.row.title}}</span>-->
          <!--<el-tag>{{// scope.row.platform_id | typeFilter}}({{ scope.row.platform_id }})</el-tag>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column align="center" label="新增" width="150" sortable prop="server_id">
        <template slot-scope="scope"><span> <el-tag type="warning">{{scope.row.new_player}} </el-tag></span></template>
      </el-table-column>
      <el-table-column align="center" label="日活DAU" width="150" sortable prop="shop_index">
        <template slot-scope="scope"> <el-tag type="success">{{scope.row.dau }} </el-tag></template>
      </el-table-column>
      <el-table-column  align="center" label="月活MAU" width="150" sortable prop="shop_event">
        <template slot-scope="scope"> {{scope.row.mau}}</template>
      </el-table-column>
      <el-table-column align="center" label="次日留存" width="150" sortable prop="pay_id">
        <template slot-scope="scope"> <el-tag> {{scope.row.retain2}} </el-tag></template>
      </el-table-column>
      <el-table-column align="center" label="三日留存" width="150" sortable prop="stone_change">
        <template slot-scope="scope"> {{scope.row.retain3}}</template>
      </el-table-column>
      <el-table-column align="center" label="七日留存" width="150" sortable prop="rmb">
        <template slot-scope="scope">  <el-tag type="danger">{{scope.row.retain7}} </el-tag></template>
      </el-table-column>
      <el-table-column align="center" label="三十日留存" width="150" sortable prop="rmb">
        <template slot-scope="scope"> {{scope.row.retain30}}</template>
      </el-table-column>
      <el-table-column align="center" label="回归用户" width="150" sortable prop="time">
        <template slot-scope="scope"> {{scope.row.returnPlayer}}</template>
      </el-table-column>

      <!--<el-table-column label="操作" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button size="mini" type="primary" @click="addUser(scope.$index, scope.row)">新增</el-button>-->
          <!--<el-button size="mini" @click="editUser(scope.$index, scope.row)">编辑</el-button>-->
          <!--<el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
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
  import waves from '@/directive/waves' // 水波纹指令
  import { actionGetAllList } from '@/api/tb_all_statistic'
  import { parseTime, pickerOptions } from '@/utils'
  import LineChart from '@/components/Charts/Line3Chart'

  const channelTypeOptions = [
    { key: '20', display_name: 'UC' },
    { key: '888888', display_name: '自有渠道' },
    { key: '255', display_name: '华为' },
    { key: '368', display_name: 'vivo' }
  ]

  // arr to obj ,such as { CN : "China", US : "USA" }
  const calendarTypeKeyValue = channelTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})

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
        listLoading: true,
        //* **********表格显示******************
        dlgData: {
          uid: '',
          platform_id: 0,
          server: 0,
          shop_index: 0,
          shop_event: 0,
          pay_id: '',
          stone_change: 0,
          time: '',
          rmb: 0
        },
        //* **********请求查询参数******************
        listQuery: {
          page: 1,
          limit: 10,
          uid: '',
          channel: '',
          serverid: '',
          starttime: '',
          endtime: '',
          time: [] // 备用
        },
        channelTypeOptions,
        total: 0,
        downloadLoading: false,
        //* **********日期选择器******************
        pickerOptions2: {
          shortcuts: pickerOptions
        },
        //* **********图表******************
        lineChartData: {
          Data1: [],
          Data2: [],
          Data3: [],
          chartTitle: ['新增', '日活', '次留'],
          chartXaxis: []
        }
      }
    },
    filters: {

      typeFilter(type) {
        return calendarTypeKeyValue[type]
      }
    },

    created() {
      this.getUserList()
    },
    methods: {
      // --------------------------------获取充值列表--------------------------------
      getUserList() {
        this.listLoading = true
        actionGetAllList(this.listQuery).then(response => {
          this.list = response.data.items
          this.listLoading = false
          this.total = response.data.total

          // ------设置图表的显示----
          this.lineChartData.Data1 = []
          this.lineChartData.Data2 = []
          this.lineChartData.Data3 = []
          this.lineChartData.chartXaxis = []
          for (const value of this.list) {
            this.lineChartData.Data1.push(value.new_player)
            this.lineChartData.Data2.push(value.dau)
            this.lineChartData.Data3.push(value.retain2)
            this.lineChartData.chartXaxis.push(value.time)
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

        if (this.listQuery.time === null) {
          this.listQuery.starttime = ''
          this.listQuery.endtime = ''
        } else {
          if (typeof this.listQuery.time[0] === 'string') {
            // 因为快捷按钮给time赋值成了string，所以要判断一下
            this.listQuery.starttime = this.listQuery.time[0]
            this.listQuery.endtime = this.listQuery.time[1]
          } else {
            this.listQuery.starttime = parseTime(this.listQuery.time[0]).substring(0, 10)
            this.listQuery.endtime = parseTime(this.listQuery.time[1]).substring(0, 10)
          }
        }

        this.getUserList()
      },
      // --------------------------------一周--------------------------------
      handleTimeOneWeak() {
        this.listQuery.page = 1
        const week = new Date()
        week.setTime(week.getTime() - 3600 * 1000 * 24 * 7)
        this.listQuery.starttime = parseTime(week).substring(0, 10)
        this.listQuery.endtime = parseTime(new Date()).substring(0, 10)
        this.listQuery.time = [this.listQuery.starttime, this.listQuery.endtime]
        this.getUserList()
      },
      // --------------------------------今天--------------------------------
      handleTimeToday() {
        this.listQuery.page = 1
        // const day = new Date()
        // day.setTime(day.getTime() + 3600 * 1000 * 24)
        this.listQuery.starttime = parseTime(new Date()).substring(0, 10)
        this.listQuery.endtime = parseTime(new Date()).substring(0, 10)
        this.listQuery.time = [this.listQuery.starttime, this.listQuery.endtime]
        this.getUserList()
      }, // --------------------------------昨天--------------------------------
      handleTimeYestoday() {
        this.listQuery.page = 1
        const day = new Date()
        day.setTime(day.getTime() - 3600 * 1000 * 24)
        this.listQuery.starttime = parseTime(day).substring(0, 10)
        this.listQuery.endtime = parseTime(day).substring(0, 10)
        this.listQuery.time = [this.listQuery.starttime, this.listQuery.endtime]
        this.getUserList()
      },
      // --------------------------------导出excel--------------------------------
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['day', 'new_player', 'dau', 'mau', 'retain2', 'retain3', 'retain7', 'retain30', 'returnPlayer']
          const filterVal = ['day', 'new_player', 'dau', 'mau', 'retain2', 'retain3', 'retain7', 'retain30', 'returnPlayer']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'all-statistic-list'
          })
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          // if (j === 'timestamp') {
          //   return parseTime(v[j])
          // } else {
          return v[j]
          // }
        }))
      }
    }
  }
</script>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
