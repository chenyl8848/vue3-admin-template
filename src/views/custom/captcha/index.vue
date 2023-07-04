<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="滑块验证码" name="first">
      <div class="slider">
        <div class="content">
          <div class="bg-img-div">
            <img id="bg-img" src="" alt/>
          </div>
          <div class="slider-img-div" id="slider-img-div">
            <img id="slider-img" src="" alt/>
          </div>
        </div>
        <div class="slider-move">
          <div class="slider-move-track">
            拖动滑块完成拼图
          </div>
          <div class="slider-move-btn"></div>
        </div>
        <div class="bottom">
          <div class="close-btn" id="slider-close-btn"></div>
          <div class="refresh-btn" id="slider-refresh-btn"></div>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="旋转验证码" name="second">
      <div class="slider rotate">
        <div class="content">
          <div class="bg-img-div">
            <img id="rotate-bg-img" src="" alt/>
          </div>
          <div class="rotate-img-div">
            <img id="rotate-image" src="" alt/>
          </div>
        </div>
        <div class="slider-move">
          <div class="slider-move-track">
            拖动滑块旋转正确位置
          </div>
          <div class="slider-move-btn" id="rotate-move-btn"></div>
        </div>
        <div class="bottom">
          <div class="close-btn" id="rotate-close-btn"></div>
          <div class="refresh-btn" id="rotate-refresh-btn"></div>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="滑动还原验证码" name="third">
      <div class="slider">
        <div class="content">
          <div class="slider-img-div" id="slider-img-div">
            <img id="slider-img" src="" alt/>
          </div>
          <div class="bg-img-div">
          </div>
        </div>
        <div class="slider-move">
          <div class="slider-move-track">
            拖动滑块完成拼图
          </div>
          <div class="slider-move-btn" id="slider-move-btn"></div>
        </div>
        <div class="bottom">
          <div class="close-btn" id="slider-close-btn"></div>
          <div class="refresh-btn" id="slider-refresh-btn"></div>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="点选验证码" name="fourth">
      <div class="slider">
        <div class="slider-move">
          <span class="slider-move-span">请依次点击:</span><img src="" class="tip-img">
        </div>
        <div class="content">
          <div class="bg-img-div">
            <img id="bg-img" src="" alt/>
          </div>
          <div class="bg-click-div">

          </div>
        </div>
        <div class="bottom">
          <div class="close-btn" id="slider-close-btn"></div>
          <div class="refresh-btn" id="slider-refresh-btn"></div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style scoped lang="scss">
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