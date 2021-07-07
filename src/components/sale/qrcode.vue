
<template>
  <div>
    <div>
      <canvas id="canvas"></canvas>
    </div>
  </div>
</template>
 
<script>
import QRCode from 'qrcode'
export default {
  data () {
    return {
      userinfo: {}
    }
  },
  created () {
    //这个是从store中获取的，因为笔者在登录的时候已经存入进去了
    this.userinfo = this.$store.state.userinfo;
  },
  mounted () {
    document.querySelector('body').setAttribute('style', 'background-color:#E9EAEE');
    this.useqrcode();
  },
  beforeDestroy () {
    document.querySelector('body').removeAttribute('style');
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1);
    },

    useqrcode () {
      var canvas = document.getElementById('canvas')

      //域名例：https://www.baidu.com，拼装url参数
      //{ margin: 1 }设置二维码的白边为1
      //this.userinfo.user_id--是自己的唯一ID

      var url = 'http://xbk.xuebaka.cn'

      QRCode.toCanvas(canvas, url, { margin: 1 }, function (error) {
        if (error) console.error(error)
        // console.log('QRCode success!');
      })
    },
  }
}
</script>
 
<style scoped>
</style>
