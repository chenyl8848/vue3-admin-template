<template>
  <div class="slider">
    <div class="content">
      <div class="bg-img-div">
        <img id="bg-img" :src="bgImgSrc" alt/>
      </div>
      <div class="slider-img-div" id="slider-img-div" :class="sliderImgClass">
        <img id="slider-img" :src="sliderImgSrc" alt/>
      </div>
    </div>
    <div class="slider-move">
      <div class="slider-move-track">
        拖动滑块完成拼图
      </div>
      <div class="slider-move-btn" id="slider-move-btn" @mousedown="moveBtnDown" :class="moveBtnClass" ></div>
    </div>
    <div class="bottom">
      <!--          <div class="close-btn" id="slider-close-btn"></div>-->
      <!--          <div class="refresh-btn" id="slider-refresh-btn"></div>-->
      <button class="close-btn" @click="closeBtn"></button>
      <button class="refresh-btn" @click="refreshCaptcha"></button>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {onMounted, ref} from "vue";
import {checkCaptcha, generateCaptcha} from "@/api/auth/captcha";
import {CaptchaResponse, CaptchaType, CheckCaptchaRequest} from "@/api/auth/captcha/type";
import { Response } from "@/api/type";
import {ElMessage} from "element-plus";
import moment from "moment";

let currentCaptchaId = ref(null)
let bgImgSrc = ref<string>("")
let sliderImgSrc = ref<string>("")
let sliderImgClass = ref("")
let moveBtnClass = ref("")
const movX = ref("0px")

// 刷新验证码
const refreshCaptcha = async () => {
  const result: CaptchaResponse = await generateCaptcha(CaptchaType.SLIDER);
  if (result.code === 200) {
    reset()
    currentCaptchaId.value = result.data.id
    bgImgSrc.value = result.data.captcha.backgroundImage
    sliderImgSrc.value = result.data.captcha.templateImage
    initConfig(260, 158.64, 48.58, 159, 206)
  } else {
    ElMessage.error(result.message)
  }
}

// 关闭按钮
const closeBtn = () => {

}

onMounted(() => {
  refreshCaptcha()
})

const moveBtnDown = ($event) => {
  down($event)
}

function doMove(currentCaptchaConfig) {
  movX.value = currentCaptchaConfig.moveX + "px"
  sliderImgClass.value = "sliderImgClass"
  moveBtnClass.value = "moveBtnClass"
}
function reset() {
  movX.value = "0px"
  currentCaptchaId.value = null;
}

let currentCaptchaConfig;
/** 是否打印日志 */
let isPrintLog = false;

function printLog(...params) {
  if (isPrintLog) {
    console.log(JSON.stringify(params));
  }
}

function initConfig(bgImageWidth, bgImageHeight, sliderImageWidth, sliderImageHeight, end) {
  currentCaptchaConfig = {
    startTime: new Date(),
    trackArr: [],
    movePercent: 0,
    bgImageWidth,
    bgImageHeight,
    sliderImageWidth,
    sliderImageHeight,
    end
  }
  printLog("init", currentCaptchaConfig);
  return currentCaptchaConfig;
}

function down(event) {
  let targetTouches = event.originalEvent ? event.originalEvent.targetTouches : event.targetTouches;
  let startX = event.pageX;
  let startY = event.pageY;
  if (startX === undefined) {
    startX = Math.round(targetTouches[0].pageX);
    startY = Math.round(targetTouches[0].pageY);
  }
  currentCaptchaConfig.startX = startX;
  currentCaptchaConfig.startY = startY;

  const pageX = currentCaptchaConfig.startX;
  const pageY = currentCaptchaConfig.startY;
  const startTime = currentCaptchaConfig.startTime;
  const trackArr = currentCaptchaConfig.trackArr;
  trackArr.push({
    x: pageX - startX,
    y: pageY - startY,
    type: "down",
    t: (new Date().getTime() - startTime.getTime())
  });
  printLog("start", startX, startY)
  // pc
  window.addEventListener("mousemove", move);
  window.addEventListener("mouseup", up);
  // 手机端
  window.addEventListener("touchmove", move, false);
  window.addEventListener("touchend", up, false);
}

function move(event) {
  if (event instanceof TouchEvent) {
    event = event.touches[0];
  }
  let pageX = Math.round(event.pageX);
  let pageY = Math.round(event.pageY);
  const startX = currentCaptchaConfig.startX;
  const startY = currentCaptchaConfig.startY;
  const startTime = currentCaptchaConfig.startTime;
  const end = currentCaptchaConfig.end;
  const bgImageWidth = currentCaptchaConfig.bgImageWidth;
  const trackArr = currentCaptchaConfig.trackArr;
  let moveX = pageX - startX;
  const track = {
    x: pageX - startX,
    y: pageY - startY,
    type: "move",
    t: (new Date().getTime() - startTime.getTime())
  };
  trackArr.push(track);
  if (moveX < 0) {
    moveX = 0;
  } else if (moveX > end) {
    moveX = end;
  }
  currentCaptchaConfig.moveX = moveX;
  currentCaptchaConfig.movePercent = moveX / bgImageWidth;
  doMove(currentCaptchaConfig);
  printLog("move", track)
}

function up(event) {
  window.removeEventListener("mousemove", move);
  window.removeEventListener("mouseup", up);
  window.removeEventListener("touchmove", move);
  window.removeEventListener("touchend", up);
  if (event instanceof TouchEvent) {
    event = event.changedTouches[0];
  }
  currentCaptchaConfig.stopTime = new Date();
  let pageX = Math.round(event.pageX);
  let pageY = Math.round(event.pageY);
  const startX = currentCaptchaConfig.startX;
  const startY = currentCaptchaConfig.startY;
  const startTime = currentCaptchaConfig.startTime;
  const trackArr = currentCaptchaConfig.trackArr;

  const track = {
    x: pageX - startX,
    y: pageY - startY,
    type: "up",
    t: (new Date().getTime() - startTime.getTime())
  }

  trackArr.push(track);
  printLog("up", track)
  valid(currentCaptchaConfig);
}

async function valid(captchaConfig) {

  let data:CheckCaptchaRequest = {
    bgImageWidth: captchaConfig.bgImageWidth,
    bgImageHeight: captchaConfig.bgImageHeight,
    templateImageWidth: captchaConfig.templateImageWidth,
    templateImageHeight: captchaConfig.templateImageHeight,
    startSlidingTime: moment(captchaConfig.startTime).format('YYYY-MM-DD HH:mm:ss'),
    endSlidingTime: moment(captchaConfig.stopTime).format('YYYY-MM-DD HH:mm:ss'),
    trackList: captchaConfig.trackArr
  };

  const result:Response<boolean> = await checkCaptcha(currentCaptchaId.value, data);
  if (result.code === 200) {
    if (result.data) {
      ElMessage.success("验证成功")
    } else {
      ElMessage.error("验证失败")
      // refreshCaptcha()
      movX.value = "0px"
    }
  } else {
    ElMessage.error(result.message)
  }
}

</script>

<style scoped lang="scss">

.moveBtnClass {
  transform: translate(v-bind(movX), 0px) !important;
}

.sliderImgClass {
  transform: translate(v-bind(movX), 0px) !important;
}

.slider {
  background-color: #fff;
  width: 278px;
  height: 285px;
  z-index: 999;
  box-sizing: border-box;
  padding: 9px;
  border-radius: 6px;
  box-shadow: 0 0 11px 0 #999999;
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
  height: 60px;
  width: 100%;
  margin: 11px 0;
  position: relative;
}

.slider .bottom {
  height: 19px;
  width: 100%;
}

.refresh-btn, .close-btn, .slider-move-track, .slider-move-btn {
  background: url(https://static.geetest.com/static/ant/sprite.1.2.4.png) no-repeat;
  border: none;
}

.refresh-btn, .close-btn {
  display: inline-block;
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

.slider-move-btn:hover, .close-btn:hover, .refresh-btn:hover {
  cursor: pointer
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
</style>