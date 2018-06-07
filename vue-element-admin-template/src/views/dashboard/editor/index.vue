<template>
  <div class="dashboard-editor-container">
    <!--**************************顶部信息*******************************-->
    <div class=" clearfix">
      <pan-thumb style="float: left" :image="avatar"> {{ $t('permission.roles')}}:
        <span class="pan-info-roles" :key='item' v-for="item in roles">{{item}}</span>
      </pan-thumb>
      <!--<github-corner></github-corner>-->
      <div class="info-container">
        <span class="display_name">{{name}}</span>
        <span style="font-size:20px;padding-top:20px;display:inline-block;"> 权限管理！ </span>
      </div>
    </div>
    <el-row :gutter="20">
        <!--**************************表格*******************************-->
      <el-col :span="18">
        <div class="grid-content bg-purple"></div>
        <div class="app-container">
          <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
            <el-table-column align="center" label='ID' width="50" sortable prop="id">
              <template slot-scope="scope"> {{scope.row.id}}</template>
            </el-table-column>
            <el-table-column label="账号" width="100" align="center" sortable prop="name">
              <template slot-scope="scope"> {{scope.row.name}}</template>
            </el-table-column>
            <el-table-column label="密码" width="100" align="center" >
              <template slot-scope="scope"><span>{{scope.row.pwd}}</span></template>
            </el-table-column>
            <el-table-column label="最后登录时间" width="200" align="center" sortable prop="login_time">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span>{{scope.row.login_time }}</span>
              </template>
            </el-table-column>
            <el-table-column  label="管理权限" width="100" align="center" sortable prop="is_admin">
              <template slot-scope="scope"> {{scope.row.is_admin}}</template>
            </el-table-column>
            <el-table-column align="center" label="主面板可见" width="100" sortable prop="is_dashboard">
              <template slot-scope="scope"> {{scope.row.is_dashboard}}</template>
            </el-table-column>
            <el-table-column align="center" label="统计权限" width="100" sortable prop="is_statis">
              <template slot-scope="scope"> {{scope.row.is_statis}}</template>
            </el-table-column>
            <el-table-column align="center" label="编辑权限" width="100" sortable prop="is_edit">
              <template slot-scope="scope"> {{scope.row.is_edit}}</template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="addUser(scope.$index, scope.row)">新增</el-button>
                <el-button size="mini" @click="editUser(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
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
      </el-col>

      <!--**************************动画*******************************-->
      <el-col :span="6">
        <div class="grid-content bg-purple-light"></div>
        <div>
          <img class="emptyGif" :src="emptyGif">
        </div>
      </el-col>
    </el-row>


    <!--**************************弹窗*******************************-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dlgData" :model="dlgData" label-position="left" label-width="90px" style='width: 300px; margin-left:50px;'>

        <el-form-item label="账号" prop="username">
          <el-input v-model="dlgData.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="pwd">
          <el-input v-model="dlgData.pwd"></el-input>
        </el-form-item>

        <el-form-item label="面板可见" >
          <el-switch v-model="dlgData.dashboard" active-color="#13ce66" inactive-color="#ff4949" active-value=1 inactive-value=0></el-switch>
        </el-form-item>
        <el-form-item label="统计可见" >
          <el-switch v-model="dlgData.statis" active-color="#13ce66" inactive-color="#ff4949" active-value=1 inactive-value=0></el-switch>
        </el-form-item>
        <el-form-item label="编辑可见">
          <el-switch v-model="dlgData.edit" active-color="#13ce66" inactive-color="#ff4949" active-value=1 inactive-value=0></el-switch>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus==='create'" type="primary" @click="AddUserAction">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="EditUserAction">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import PanThumb from '@/components/PanThumb'
  import { actionGetUserList, actionAddUser, actionEditUser, actionDelUser } from '@/api/admin'
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
        // **********表格*************
        dlgData: {
          id: 0,
          username: '',
          pwd: '',
          dashboard: 0,
          statis: 0,
          edit: 0
        },
        // **********弹窗变量*************
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        // **********校验规则*************
        rules: {
          username: [{ required: true, message: '必须有名字', trigger: 'change' }, { min: 5, max: 9, message: '长度在 5 到 9 个字符', trigger: 'blur' }],
          pwd: [{ required: true, message: '必须有密码', trigger: 'blur' }, { min: 5, max: 9, message: '长度在 5 到 9 个字符', trigger: 'blur' }]
        },
        // **********分页*************
        listQuery: {
          page: 1,
          limit: 10
        },
        total: 0
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
      // --------------------------------获取用户列表--------------------------------
      getUserList() {
        this.listLoading = true
        actionGetUserList(this.listQuery).then(response => {
          this.list = response.data.items
          this.listLoading = false
          this.total = response.data.total
        })
      },
      // --------------------------------删除用户--------------------------------
      deleteUser(index, row) {
        // actionDelUser()
        // const index = this.list.indexOf(row)
        this.$confirm('要删除该用户么?', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
          return new Promise((resolve, reject) => {
            actionDelUser(row.id).then(response => {
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
        this.$refs.dlgData.validate((valid) => {
          if (valid) {
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
          }
        })
      },
      // --------------------------------修改用户--------------------------------
      editUser: function(index, row) {
        this.dialogFormVisible = true
        this.dialogStatus = 'update'

        this.dlgData.id = row.id
        this.dlgData.username = row.name
        this.dlgData.pwd = row.pwd
        this.dlgData.dashboard = '' + row.is_dashboard
        this.dlgData.statis = '' + row.is_statis
        this.dlgData.edit = '' + row.is_edit
      },
      EditUserAction(index, row) {
        this.$refs['dlgData'].validate((valid) => {
          if (valid) {
            return new Promise((resolve, reject) => {
              actionEditUser(this.dlgData.id, this.dlgData.username, this.dlgData.pwd, this.dlgData.dashboard, this.dlgData.statis, this.dlgData.edit).then(response => {
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
