<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { toggleDark } from './Dark.ts'
import MouseClick from './MouseClick.vue'
import MouseFollower from './MouseFollower.vue'
import BackToTop from './BackToTop.vue'

const { isDark } = useData()
// 实现切换主题过渡动画
toggleDark(isDark)
</script>

<template>
  <DefaultTheme.Layout>
    <template #layout-bottom>
      <MouseClick />
      <MouseFollower />
      <BackToTop />
    </template>
  </DefaultTheme.Layout>
</template>