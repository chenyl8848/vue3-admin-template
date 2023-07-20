<template>
  <div class="slider">
    <div class="slider-move">
      <span class="slider-move-span">请依次点击:</span>
      <img :src="sliderImgSrc" class="tip-img" />
    </div>
    <div class="content" @click="clickWord">
      <div class="bg-img-div">
        <img :src="bgImgSrc" alt />
      </div>
      <div class="bg-click-div"></div>
    </div>
    <div class="bottom">
      <button class="close-btn" @click="closeBtn"></button>
      <button class="refresh-btn" @click="refreshBtn"></button>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 刷新验证码
import { CaptchaResponse, CaptchaType } from '@/api/auth/captcha/type'
import { checkCaptcha, generateCaptcha } from '@/api/auth/captcha'
import { ElMessage } from 'element-plus'
import { onMounted, ref } from 'vue'
import { Response } from '@/api/type'
import moment from 'moment'

let currentCaptchaId = ref<string>('')
let sliderImgSrc = ref<string>('')
let bgImgSrc = ref<string>('')

const refreshBtn = async () => {
  const result: CaptchaResponse = await generateCaptcha(
    CaptchaType.WORD_IMAGE_CLICK,
  )
  if (result.code === 200) {
    reset()
    currentCaptchaId.value = result.data.id
    sliderImgSrc.value = result.data.captcha.templateImage
    bgImgSrc.value = result.data.captcha.backgroundImage
  } else {
    ElMessage.error(result.message)
  }
}

// 关闭按钮
const closeBtn = () => {}

onMounted(() => {
  refreshBtn()
})

let start = 0
let startY = 0
let movePercent = 0
let end = 206
let startSlidingTime
let entSlidingTime
const trackArr = []
let clickCount = 0

const clickWord = ($event) => {
  console.log($event)
  clickCount++
  if (clickCount === 1) {
    startSlidingTime = new Date()
    // move 轨迹
    window.addEventListener('mousemove', move)
  }
  trackArr.push({
    x: $event.offsetX,
    y: $event.offsetY,
    type: 'click',
    t: new Date().getTime() - startSlidingTime.getTime(),
  })
  const left = $event.offsetX - 10
  const top = $event.offsetY - 10
  // $(".bg-click-div").append("<span class='click-span' style='left:" + left + "px;top: " + top + "px'>" + clickCount + "</span>")
  const bgClickDiv = document.getElementsByClassName('bg-click-div')
  console.log(bgClickDiv, 'bngggggggggggg')
  let clickSpan = document.createElement('span')
  clickSpan.style.cssText = `left: ${left}px; top: ${top}px; color: green`
  clickSpan.innerText = clickCount + ''
  bgClickDiv[1].appendChild(clickSpan)
  if (clickCount === 4) {
    // 校验
    entSlidingTime = new Date()
    window.removeEventListener('mousemove', move)
    valid()
  }
}

const move = (event) => {
  if (event instanceof TouchEvent) {
    event = event.touches[0]
  }
  // console.log("x:", event.offsetX, "y:", event.offsetY, "time:" ,new Date().getTime() - startSlidingTime.getTime());
  trackArr.push({
    x: event.offsetX,
    y: event.offsetY,
    t: new Date().getTime() - startSlidingTime.getTime(),
    type: 'move',
  })
}

const valid = async () => {
  console.log('=======================')
  console.log('aaa', trackArr)
  console.log('startTime', startSlidingTime)
  console.log('endTime', entSlidingTime)
  console.log('track', JSON.stringify(trackArr))
  let data = {
    // bgImageWidth: $(".bg-img-div").width(),
    // bgImageHeight: $(".content").height(),

    bgImageWidth: 260,
    bgImageHeight: 159,
    templateImageWidth: -1,
    templateImageHeight: -1,
    startSlidingTime: moment(startSlidingTime).format('YYYY-MM-DD HH:mm:ss'),
    endSlidingTime: moment(entSlidingTime).format('YYYY-MM-DD HH:mm:ss'),
    trackList: trackArr,
  }
  console.log(data)

  const result: Response<boolean> = await checkCaptcha(
    currentCaptchaId.value,
    data,
  )
  if (result.code === 200) {
    if (result.data) {
      ElMessage.success('验证成功')
    } else {
      ElMessage.error('验证失败')
    }
    refreshBtn()
  } else {
    ElMessage.error(result.message)
  }
}

const reset = () => {
  // $("#slider-move-btn").css("background-position", "-5px 11.79625%")
  // $("#slider-move-btn").css("transform", "translate(0px, 0px)")
  // $("#slider-img-div").css("transform", "translate(0px, 0px)")
  start = 0
  startSlidingTime = null
  entSlidingTime = null
  trackArr.length = 0
  // $(".bg-click-div span").remove();
  const bgClickDiv = document.getElementsByClassName('bg-click-div')
  while (bgClickDiv[1].hasChildNodes()) {
    bgClickDiv[1].removeChild(bgClickDiv[1].firstChild)
  }
  clickCount = 0
  movePercent = 0
  currentCaptchaId.value = ''
  startY = 0
  window.removeEventListener('mousemove', move)
}
</script>

<style lang="scss" scoped>
.slider {
  background-color: #fff;
  width: 278px;
  height: 285px;
  z-index: 999;
  box-sizing: border-box;
  padding: 9px;
  border-radius: 6px;
  box-shadow: 0 0 11px 0 #999999;
  position: relative;
}

.slider .content {
  width: 100%;
  height: 159px;
  position: relative;
}

.bg-img-div {
  width: 100%;
  height: 100%;
  position: absolute;
  transform: translate(0px, 0px);
  z-index: 0;
}

.bg-click-div {
  z-index: 1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.slider-img-div {
  height: 100%;
  position: absolute;
  transform: translate(0px, 0px);
}

.bg-img-div img {
  width: 100%;
}

.slider-img-div img {
  height: 100%;
}

.slider .slider-move {
  height: 40px;
  width: 100%;
  position: relative;
}

.slider .bottom {
  height: 19px;
  width: 100%;
  margin-top: 10px;
}

.refresh-btn,
.close-btn,
.slider-move-track,
.slider-move-btn {
  background: url(https://static.geetest.com/static/ant/sprite.1.2.4.png)
    no-repeat;
}
.close-btn:hover,
.refresh-btn:hover {
  cursor: pointer;
}
.refresh-btn,
.close-btn {
  display: inline-block;
  border: none;
  margin-left: 6px;
}

.slider-move .slider-move-track {
  line-height: 38px;
  font-size: 14px;
  text-align: center;
  white-space: nowrap;
  color: #88949d;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}

.slider {
  user-select: none;
}

.slider-move .slider-move-btn {
  transform: translate(0px, 0px);
  background-position: -5px 11.79625%;
  position: absolute;
  top: -12px;
  left: 0;
  width: 66px;
  height: 66px;
}

.submit-div {
  width: 100%;
  height: 40px;
  position: relative;
  margin: 5px auto;
}

.bottom .close-btn {
  width: 20px;
  height: 20px;
  background-position: 0 44.86874%;
}

.bottom .refresh-btn {
  width: 20px;
  height: 20px;
  background-position: 0 81.38425%;
}

.tip-img {
  width: 130px;
  position: absolute;
  right: 5px;
}

.slider-move-span {
  font-size: 18px;
  display: inline-block;
  height: 40px;
  line-height: 40px;
}

.click-span {
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 50px;
  background-color: #409eff;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  color: #fff;
  border: 2px solid #fff;
}

.submit-btn {
  height: 40px;
  width: 120px;
  line-height: 40px;
  text-align: center;
  background-color: #409eff;
  color: #fff;
  font-size: 15px;
  box-sizing: border-box;
  border: 1px solid #409eff;
  float: right;
  border-radius: 5px;
}
</style>
