<template>
  <div class="app-container">

    <!--******************************************List*******************************************-->
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>

      <el-table-column label="server_ip" width="200" align="center">
        <template slot-scope="scope">
          {{scope.row.server_ip}}
        </template>
      </el-table-column>

      <el-table-column label="time" width="300" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.time}}</span>
        </template>
      </el-table-column>

      <el-table-column label="table_num" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.table_num}}
        </template>
      </el-table-column>
      <el-table-column label="send_num" width="200" align="center">
        <template slot-scope="scope">
          {{scope.row.send_num}}
        </template>
      </el-table-column>


      <el-table-column align="center" prop="created_at" label="rece_num" width="200">
        <template slot-scope="scope">
          <!--<i class="el-icon-time"></i>-->
          <span>{{scope.row.rece_num}}</span>
        </template>
      </el-table-column>

    </el-table>
    <!--******************************************List*******************************************-->
  </div>
</template>
<script>
  import {getList} from '@/api/server_state'

  export default {
    data() {
      return {
        list: null,
        // **********分页*************
        listQuery: {
          page: 1,
          limit: 10
        },
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
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getList(this.listQuery).then(response => {
          this.list = response.data.items
          this.listLoading = false
        })
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
