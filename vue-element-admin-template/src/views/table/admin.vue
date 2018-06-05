<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="50">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="Name" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="Pwd" width="100" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.pwd}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Login" width="200" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <!--<span>{{scope.row.login_time}}</span>-->
          <span>{{scope.row.login_time }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="admin" width="100" align="center">
        <template slot-scope="scope">
          {{scope.row.is_admin}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="dashboard" width="100">
        <template slot-scope="scope">

          {{scope.row.is_dashboard}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="statis" width="100">
        <template slot-scope="scope">

          {{scope.row.is_statis}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="edit" width="100">
        <template slot-scope="scope">

          {{scope.row.is_edit}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">新增</el-button>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<script>
  import { actionGetUserList } from '@/api/admin'

  export default {
    data() {
      return {
        list: null,
        listLoading: true
      }
    },
    filters: {
      // statusFilter(status) {
      //   const statusMap = {
      //     published: 'success',
      //     draft: 'gray',
      //     deleted: 'danger'
      //   }
      //   return statusMap[status]
      // }
    },
    created() {
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        actionGetUserList(this.listQuery).then(response => {
          this.list = response.data.items
          this.listLoading = false
        })
      }
    }
  }
</script>
