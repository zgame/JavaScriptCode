<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px" label-position="top">
      <el-form-item label="游戏公告">
        <el-input type="textarea" v-model="form.notice" :autosize="{minRows:15,maxRows:60}"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="success" icon="el-icon-upload" @click="onSubmit">保存公告</el-button>
        <!--<el-button @click="onCancel">Cancel</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { getNotice, setNotice } from '@/api/tb_game_manager'

  export default {
    data() {
      return {
        form: {
          notice: ''
        }
      }
    },
    created() {
      this.getNoticeData() // 给公告赋值
    },
    methods: {
      getNoticeData() {
        getNotice().then(response => {
          this.form.notice = response.data.items // 用返回的数据给列表赋值
        })
      },
      onSubmit() {
        setNotice(this.form).then(response => {
          this.$message('保存完成！')
        })
      },
      onCancel() {
        this.$message({ message: 'cancel!', type: 'warning' })
      }
    }
  }
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>

