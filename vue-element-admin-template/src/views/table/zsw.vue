<template>
  <div class="app-container">
    <!--**************************过滤*******************************-->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('table.title')" v-model="listQuery.title"></el-input>
      <!--<el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.importance" :placeholder="$t('table.importance')">-->
        <!--<el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">-->
        <!--</el-option>-->
      <!--</el-select>-->
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.type" :placeholder="$t('table.type')">
        <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <!--<el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-edit">{{$t('table.add')}}</el-button>-->
      <el-button class="filter-item" type="warning" :loading="downloadLoading" v-waves icon="el-icon-download" @click="handleDownload">导出Excel</el-button>
    </div>
    <br>
    <!--**************************表格*******************************-->
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row stripe default-sort = "{prop: 'name', order: 'descending'}">
      <el-table-column align="center" label='UID' width="150" sortable prop="user_id">
        <template slot-scope="scope"> {{scope.row.user_id}}</template>
      </el-table-column>
      <el-table-column label="渠道" width="100" align="center" sortable prop="platform_id">
        <template slot-scope="scope"> {{scope.row.platform_id}}</template>
      </el-table-column>
      <el-table-column label="服务器" width="100" align="center" sortable prop="server_id">
        <template slot-scope="scope"><span>{{scope.row.server_id}}</span></template>
      </el-table-column>
      <el-table-column label="商品类型" width="100" align="center" sortable prop="shop_index">
        <template slot-scope="scope"><span>{{scope.row.shop_index }}</span></template>
      </el-table-column>
      <el-table-column  label="商品事件" width="100" align="center" sortable prop="shop_event">
        <template slot-scope="scope"> {{scope.row.shop_event}}</template>
      </el-table-column>
      <el-table-column align="center" label="订单号" width="300" sortable prop="pay_id">
        <template slot-scope="scope"> {{scope.row.pay_id}}</template>
      </el-table-column>
      <el-table-column align="center" label="钻石" width="100" sortable prop="stone_change">
        <template slot-scope="scope"> {{scope.row.stone_change}}</template>
      </el-table-column>
      <el-table-column align="center" label="充值金额" width="100" sortable prop="rmb">
        <template slot-scope="scope"> {{scope.row.rmb}}</template>
      </el-table-column>
      <el-table-column align="center" label="充值时间" width="300" sortable prop="time">

        <template slot-scope="scope"> <i class="el-icon-time"></i><span>{{scope.row.time}}</span></template>
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
                     :page-sizes="[5,10,20,50,100,200,2000]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>


<script>
  import { actionGetRechargeList } from '@/api/recharge'

  export default {
    data() {
      return {
        list: null,
        listLoading: true,
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
        listQuery: {
          page: 1,
          limit: 10
        },
        total: 0,
        downloadLoading: false
      }
    },

    created() {
      this.getUserList()
    },
    methods: {
      // --------------------------------获取充值列表--------------------------------
      getUserList() {
        this.listLoading = true
        actionGetRechargeList(this.listQuery).then(response => {
          this.list = response.data.items
          this.listLoading = false
          this.total = response.data.total
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
      // --------------------------------导出excel--------------------------------
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['user_id', 'platform_id', 'server_id', 'shop_index', 'shop_event', 'pay_id', 'stone_change', 'time', 'rmb']
          const filterVal = ['user_id', 'platform_id', 'server_id', 'shop_index', 'shop_event', 'pay_id', 'stone_change', 'time', 'rmb']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'table-list'
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
