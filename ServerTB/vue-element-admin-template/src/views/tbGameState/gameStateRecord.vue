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
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="按服务器ID查询" v-model="listQuery.serverip"></el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="游戏类型查询" v-model="listQuery.gameid"></el-input>
      <!--********时间选择框********-->
      <el-date-picker v-model="listQuery.time" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2"></el-date-picker>
      <!--<el-date-picker type="date" placeholder="开始时间" v-model="listQuery.starttime" style="width: 200px;"></el-date-picker>-->
      <!--<el-date-picker type="date" placeholder="截止时间" v-model="listQuery.endtime" style="width: 200px;"></el-date-picker>-->
      <!--********按钮********-->
      <el-button class="filter-item" type="success" v-waves icon="el-icon-time" @click="handleTimeYestoday">昨天</el-button>
      <el-button class="filter-item" type="success" v-waves icon="el-icon-time" @click="handleTimeToday">今天</el-button>
      <el-button class="filter-item" type="danger" round  v-waves icon="el-icon-time" @click="handleTimeOneWeak">前一周</el-button>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">开始搜索</el-button>
      <!--<el-button class="filter-item" type="warning" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出Excel</el-button>-->
    </div>
    <br>

    <!--**************************图表*******************************-->
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"></line-chart>
    </el-row>

    <!--******************************************List*******************************************-->
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row stripe>
      <el-table-column align="center" label='ID' width="55">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>

      <el-table-column label="服务器地址" width="220" align="center">
        <template slot-scope="scope">
          {{scope.row.server_ip}}
        </template>
      </el-table-column>

      <el-table-column label="游戏类型" width="90" align="center">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <el-tag>{{scope.row.game_id}}</el-tag>
          <!--<span>{{scope.row.game_id}}</span>-->
        </template>
      </el-table-column>

      <el-table-column label="桌子id" width="50" align="center">
        <template slot-scope="scope">
          {{scope.row.table_id}}
        </template>
      </el-table-column>
      <el-table-column label="库存" width="200" align="center">
        <template slot-scope="scope">
          {{scope.row.pool_all}}
        </template>
      </el-table-column>
       <el-table-column label="大奖池" width="200" align="center">
        <template slot-scope="scope">
          {{scope.row.jackpot}}
        </template>
      </el-table-column>
      <el-table-column label="椅子人数" width="50" align="center">
        <template slot-scope="scope">
          {{scope.row.seat_array}}
        </template>
      </el-table-column>
      <el-table-column label="返奖率" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.reward_rate}}
        </template>
      </el-table-column>
      <el-table-column label="时间" width="200" align="center">
        <template slot-scope="scope">
          <el-tag>{{scope.row.time}} </el-tag>
        </template>
      </el-table-column>
      <!--玩家排名-->
      <el-table-column label="赢Top1" width="200" align="center">
        <template slot-scope="scope">
          <el-tag>{{scope.row.player_win1}} </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="赢Top2" width="200" align="center">
        <template slot-scope="scope">
          <el-tag>{{scope.row.player_win2}} </el-tag>
        </template>
      </el-table-column>
      <!--<el-table-column label="赢Top3" width="200" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<el-tag>{{scope.row.player_win3}} </el-tag>-->
        <!--</template>-->
      <!--</el-table-column>-->
      <el-table-column label="输Top1" width="200" align="center">
        <template slot-scope="scope">
          <el-tag>{{scope.row.player_lost1}} </el-tag>
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
  import { getRecordList } from '@/api/tb_game_state'
  import { parseTime, pickerOptions } from '@/utils'
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
          serverip: '',
          gameid: '',
          starttime: '',
          endtime: '',
          time: []
        },
        total: 0,
        listLoading: true,
        //* **********日期选择器******************
        pickerOptions2: {
          shortcuts: pickerOptions
        },
        //* **********图表******************
        lineChartData: {
          Data1: [],
          Data2: [],
          Data3: [],
          chartTitle: ['库存', '大奖池', '椅子'],
          chartXaxis: []
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
      this.getUserList()
    },
    methods: {
      getUserList() {
        this.listLoading = true
        //  ------------------------获取列表------------------------------
        getRecordList(this.listQuery).then(response => {
          this.list = response.data.items // 用返回的数据给列表赋值
          this.listLoading = false
          this.total = response.data.total // 设置总共有多少页面

          // ------设置图表的显示----
          this.lineChartData.Data1 = []
          this.lineChartData.Data2 = []
          this.lineChartData.Data3 = []
          this.lineChartData.chartXaxis = []
          for (const value of this.list) {
            this.lineChartData.Data1.push(value.pool_all)
            this.lineChartData.Data2.push(value.jackpot)
            this.lineChartData.Data3.push(value.seat_array)
            this.lineChartData.chartXaxis.push(value.table_id)
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
        const day = new Date()
        day.setTime(day.getTime() + 3600 * 1000 * 24)
        this.listQuery.starttime = parseTime(new Date()).substring(0, 10)
        this.listQuery.endtime = parseTime(day).substring(0, 10)
        this.listQuery.time = [this.listQuery.starttime, this.listQuery.endtime]
        this.getUserList()
      }, // --------------------------------昨天--------------------------------
      handleTimeYestoday() {
        this.listQuery.page = 1
        const day = new Date()
        day.setTime(day.getTime() - 3600 * 1000 * 24)
        this.listQuery.starttime = parseTime(day).substring(0, 10)
        this.listQuery.endtime = parseTime(new Date()).substring(0, 10)
        this.listQuery.time = [this.listQuery.starttime, this.listQuery.endtime]
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
