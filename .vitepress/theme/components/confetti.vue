<template>
  <!-- 必须渲染一个真实节点：模板若只有注释，生产构建的 SSR 会把它剥离，
       而客户端仍会生成注释占位节点，导致 hydration 子节点数量不一致 -->
  <span hidden aria-hidden="true"></span>
</template>

<script setup lang="ts">
import confetti from 'canvas-confetti'
import { inBrowser } from 'vitepress';

if (inBrowser) {
  /* 纸屑 */
  confetti({
    particleCount: 100,
    spread: 170,
    origin: { y: 0.6 },
  })
}
</script>
