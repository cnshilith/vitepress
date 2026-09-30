<template>
  <div class="LastUpdated">
    <p v-if="hasDate">更新时间: {{ date }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useData } from 'vitepress'

const { page } = useData()

// lastUpdated 可能为 undefined，直接格式化会得到 Invalid Date
const hasDate = computed(() => !!page.value.lastUpdated)
// 服务端与浏览器时区不同，SSR 渲染本地时间会导致 hydration 文本不一致，
// 因此只在客户端填充，SSR 先占一个空行盒以避免首屏布局偏移
const date = ref('')

onMounted(() => {
  const lastUpdated = page.value.lastUpdated
  if (lastUpdated) {
    date.value = new Date(lastUpdated).toLocaleString()
  }
})
</script>
