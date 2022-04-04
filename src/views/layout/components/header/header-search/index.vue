<template>
  <div class="w-full">
    <m-search
      v-model="inputValue"
      @search="onSearchHandler"
      @clear="onSearchHandler"
    >
      <template #dropdown>
        <div>
          <!-- 搜索提示 -->
          <hint-vue
            v-show="inputValue"
            :searchText="inputValue"
            @itemClick="onHintItemClick"
          ></hint-vue>
        </div>
      </template>
    </m-search>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import hintVue from './hint.vue'

const inputValue = ref('')

// 搜索的回调事件
const onSearchHandler = (val) => {
  inputValue.value = val
}

/**
 * 搜索结果点击事件处理
 */
const onHintItemClick = (item) => {
  onSearchHandler(item)
}
</script>

<style lang="scss" scoped></style>
