<template>
  <div class="dashboard-editor-container">
    <div class=" clearfix">
      <pan-thumb style="float: left" :image="avatar"> {{ $t('permission.roles')}}:
        <span class="pan-info-roles" :key='item' v-for="item in roles">{{item}}</span>
      </pan-thumb>
      <!--<github-corner></github-corner>-->
      <div class="info-container">
        <span class="display_name">{{name}}</span>
        <span style="font-size:20px;padding-top:20px;display:inline-block;"> 欢迎入坑！ </span>
      </div>
    </div>
    <el-row :gutter="20">

      <el-col :span="18">
        <div class="grid-content bg-purple"></div>
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
                  @click="addUser(scope.$index, scope.row)">新增</el-button>
                <el-button
                  size="mini"
                  @click="editUser(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="deleteUser(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>


      <el-col :span="6">
        <div class="grid-content bg-purple-light"></div>
        <div>
          <img class="emptyGif" :src="emptyGif">
        </div>
      </el-col>
    </el-row>


    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="dlgData" label-position="left" label-width="90px" style='width: 300px; margin-left:50px;'>


        <el-form-item label="账号" >
          <el-input v-model="dlgData.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" >
          <el-input v-model="dlgData.pwd"></el-input>
        </el-form-item>

        <el-form-item label="面板可见">
          <el-switch v-model="dlgData.dashboard"></el-switch>
        </el-form-item>
        <el-form-item label="统计可见">
          <el-switch v-model="dlgData.statis"></el-switch>
        </el-form-item>
        <el-form-item label="编辑可见">
          <el-switch v-model="dlgData.edit"></el-switch>
        </el-form-item>




      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="AddUserAction">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="EditUserAction">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import PanThumb from '@/components/PanThumb'
  import { actionGetUserList, actionAddUser, actionEditUser, actionDelUser } from '@/api/admin'
  // import { actionGetUserList, actionAddUser, actionEditUser, actionDelUser } from '@/api/admin'
  // import GithubCorner from '@/components/GithubCorner'

  export default {
    name: 'dashboard-editor',
    components: { PanThumb },
    data() {
      return {
        emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3',
        is_admin: false,
        list: null,
        listLoading: true,
        dialogFormVisible: false,
        dlgData: {
          username: '',
          pwd: '',
          dashboard: 0,
          statis: 0,
          edit: 0
        },
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        rules: {
          username: [{ required: true, message: '必须有名字', trigger: 'change' }],
          // timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
          pwd: [{ required: true, message: '必须有密码', trigger: 'blur' }]
        }
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'avatar',
        'roles'
      ])
    },
    created() {
      if (this.roles.includes('admin')) {
        this.is_admin = true // 如果是管理员，那么开启权限控制页面
        this.getUserList()
      }
    },
    methods: {
      getUserList() { // 获取用户列表
        this.listLoading = true
        actionGetUserList(this.listQuery).then(response => {
          this.list = response.data.items
          this.listLoading = false
        })
      },
      deleteUser(index, row) {
        // actionDelUser()
        // const index = this.list.indexOf(row)
        return new Promise((resolve, reject) => {
          actionDelUser(row.id).then(response => {
            this.$notify({ title: '成功', message: '删除成功', type: 'success', duration: 2000 })
            this.getUserList()
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      addUser(index, row) {
        this.dialogFormVisible = true
        this.dialogStatus = 'create'
        this.dlgData.username = 'test'
        this.dlgData.pwd = 'test123'
        this.dlgData.dashboard = 0
        this.dlgData.statis = 0
        this.dlgData.edit = 0
      },
      AddUserAction(index, row) {
        return new Promise((resolve, reject) => {
          actionAddUser(this.dlgData.username, this.dlgData.pwd, this.dlgData.dashboard, this.dlgData.statis, this.dlgData.edit).then(response => {
            this.$notify({ title: '成功', message: '增加成功', type: 'success', duration: 2000 })
            this.getUserList()
            this.dialogFormVisible = false
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      },
      editUser(index, row) {
        this.dialogFormVisible = true
        this.dialogStatus = 'update'
        this.dlgData.username = row.name
        this.dlgData.pwd = row.pwd
        this.dlgData.dashboard = row.dashboard
        this.dlgData.statis = row.statis
        this.dlgData.edit = row.edit
      },
      EditUserAction(index, row) {
        return new Promise((resolve, reject) => {
          actionEditUser(this.dlgData.id, this.dlgData.name, this.dlgData.pwd, this.dlgData.dashboard, this.dlgData.statis, this.dlgData.edit).then(response => {
            this.$notify({ title: '成功', message: '编辑成功', type: 'success', duration: 2000 })
            this.getUserList()
            this.dialogFormVisible = false
            resolve()
          }).catch(error => {
            reject(error)
          })
        })
      }
    }

  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .emptyGif {
    display: block;
    width: 150%;
    margin: 0 auto;
    /*text-align: right;*/
  }

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
