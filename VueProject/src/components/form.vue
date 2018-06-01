<template>
  <div id="app">
    <p>input 元素：</p>
    <input v-model="message" placeholder="编辑我……">
    <p>消息是: {{ message }}</p>

    <button type="button" class="btn btn-primary" @click="get">get</button>
    <p>textarea 元素：</p>
    <p style="white-space: pre">{{ idx }}</p>
    <textarea v-model="idx" placeholder="多行文本输入……"></textarea>

    <p>{{ resz }}</p>

  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'form',
  data: function () {
    return {

      message: 'this is a zsw form',
      idx: '99999999994',
      resz: []

    }
  },
  methods: {
    get () {
      // let url = 'http://127.0.0.1:8000/zsw?user=' + this.message + '&id=' + this.idx
      let url = 'http://127.0.0.1:3000/echo'

      this.$axios.get(url, {
        params: {
          user: this.message,
          id: this.idx
        }
      }).then((response) => {
        console.log(response)
        console.log('response:' + response.data)
        this.resz = response.data

        console.log('ddddddddddddddddddd')
      })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
