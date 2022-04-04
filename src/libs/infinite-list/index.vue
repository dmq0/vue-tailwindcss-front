<template>
  <div>
    <!-- 内容 -->
    <slot />
    <div ref="laodingTarget" class="h-6 py-4">
      <!-- 加载更多 -->
      <m-svg-icon
        v-show="loading"
        class="w-4 h-4 mx-auto animate-spin"
        name="infinite-load"
      ></m-svg-icon>
      <!-- 没有更多数据了 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        已经没有更多数据了!
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useIntersectionObserver, useVModel } from '@vueuse/core'

const props = defineProps({
  // 是否处于加载状态
  modelValue: {
    type: Boolean,
    required: true
  },
  // 数据是否全部加载完成
  isFinished: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['onLoad', 'update:modelValue'])

// 处理 loading 状态
const loading = useVModel(props)

// 滚动的元素
const laodingTarget = ref(null)
// 记录当前是否在底部（是否交叉）
const targetIsIntersecting = ref(false)
useIntersectionObserver(
  laodingTarget,
  ([{ isIntersecting }], observerElement) => {
    // 获取当前交叉状态
    targetIsIntersecting.value = isIntersecting
    // 触发 load
    emitLoad()
  }
)

/**
 * 触发 load
 */
const emitLoad = () => {
  // 当加载更多的视图可见时，加载更多数据，因为 DOM 存在渲染时长，所以可以在这里进行一次等待，进行简单的解决
  setTimeout(() => {
    if (targetIsIntersecting.value && !loading.value && !props.isFinished) {
      // 修改加载数据标记
      loading.value = true
      // 触发加载更多行为
      emits('onLoad')
    }
  }, 100)
}

/**
 * 监听 loading 的变化，解决数据加载完成后，首屏未铺满的问题
 */
watch(loading, (val) => {
  // 触发 load
  emitLoad()
})
</script>

<style lang="scss" scoped></style>
