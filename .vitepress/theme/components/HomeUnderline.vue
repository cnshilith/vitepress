<template>
  <div class="home-underline">
    <span class="hero-text">{{ frontmatter.hero?.text }}
      <svg
        class="hero-svg"
        xmlns="http://www.w3.org/2000/svg"
        width="240"
        height="11"
        viewBox="0 0 240 11"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M0,10 Q60,0 120,10 T240,10" />
      </svg>
    </span>
  </div>
</template>

<script setup>
import { useData } from 'vitepress'
const { frontmatter } = useData()
</script>

<style scoped>
.home-underline {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.hero-text {
  display: inline-block;
  position: relative;
  font-size: 2rem;
  font-weight: bold;
  color: var(--vp-c-text-1);
}

.hero-svg {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: -1;
  width: 100%;
  height: auto;
  color: var(--vp-c-brand);
  margin-top: -0.5rem;
}
</style>