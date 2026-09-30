<template>
  <canvas
    ref="canvas"
    style="position: fixed; left: 0; top: 0; pointer-events: none; z-index: 999999"
  ></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref(null);
let ctx = null;
let animationFrameId = null;
let particles = [];
let circles = [];
const colors = ["#FF1461", "#18FF92", "#5A87FF", "#FBF38C"];

// 超采样倍率，画布按 2 倍分辨率渲染再缩放，避免高分屏下的锯齿
const SCALE = 2;

// 设置画布大小（重设 width/height 会重置变换，需重新 scale）
function setCanvasSize() {
  const canvasEl = canvas.value;
  if (!canvasEl) return;
  canvasEl.width = globalThis.innerWidth * SCALE;
  canvasEl.height = globalThis.innerHeight * SCALE;
  canvasEl.style.width = globalThis.innerWidth + "px";
  canvasEl.style.height = globalThis.innerHeight + "px";
  ctx.scale(SCALE, SCALE);
}

// 创建粒子
function createParticle(x, y) {
  const angle = Math.random() * Math.PI * 2;
  const speed = 2 + Math.random() * 3;
  const radius = 4 + Math.random() * 8;
  const color = colors[Math.floor(Math.random() * colors.length)];

  return {
    x,
    y,
    radius,
    color,
    speedX: Math.cos(angle) * speed,
    speedY: Math.sin(angle) * speed,
    life: 100 + Math.random() * 100, // 生命周期
    currentLife: 0,
    draw(ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    },
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.currentLife++;
      this.radius *= 0.98; // 逐渐缩小

      // 根据生命周期调整透明度
      const progress = this.currentLife / this.life;
      if (progress > 0.5) {
        this.radius *= 0.95;
      }

      return this.currentLife < this.life;
    }
  };
}

// 创建圆形扩散效果
function createCircle(x, y) {
  const radius = 5 + Math.random() * 10;
  const color = "#FFF";

  return {
    x,
    y,
    radius,
    color,
    maxRadius: 80 + Math.random() * 80,
    lineWidth: 6,
    alpha: 0.5,
    speed: 1 + Math.random(),
    draw(ctx) {
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.lineWidth = this.lineWidth;
      ctx.strokeStyle = this.color;
      ctx.stroke();
      ctx.globalAlpha = 1;
    },
    update() {
      this.radius += this.speed * 2;
      this.alpha *= 0.97;
      this.lineWidth *= 0.98;
      return this.radius < this.maxRadius && this.alpha > 0.01;
    }
  };
}

// 创建随机圆形
function createRandomCircle(x, y) {
  const radius = 1;
  const color = colors[Math.floor(Math.random() * colors.length)];
  const maxRadius = 50 + Math.random() * 40;

  return {
    x,
    y,
    radius,
    color,
    maxRadius,
    alpha: 1,
    speed: 1 + Math.random(),
    draw(ctx) {
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.globalAlpha = 1;
    },
    update() {
      this.radius += this.speed * 3;
      this.alpha *= 0.96;
      return this.radius < this.maxRadius && this.alpha > 0.01;
    }
  };
}

// 动画循环：仅在仍有元素需要绘制时运行，空闲时完全停止 rAF
function animate() {
  animationFrameId = null;
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

  // 更新并绘制粒子
  particles = particles.filter(particle => {
    particle.update();
    particle.draw(ctx);
    return particle.currentLife < particle.life;
  });

  // 更新并绘制圆形
  circles = circles.filter(circle => {
    const shouldKeep = circle.update();
    circle.draw(ctx);
    return shouldKeep;
  });

  if (particles.length || circles.length) {
    animationFrameId = requestAnimationFrame(animate);
  }
}

function start() {
  if (animationFrameId === null && !document.hidden) {
    animationFrameId = requestAnimationFrame(animate);
  }
}

function stop() {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

// 处理点击事件
function handleClick(e) {
  const point = e.touches ? e.touches[0] : e;
  const x = point.clientX;
  const y = point.clientY;

  // 创建粒子
  for (let i = 0; i < 20; i++) {
    particles.push(createParticle(x, y));
  }

  // 创建圆形扩散效果
  circles.push(createCircle(x, y));

  // 创建随机圆形
  circles.push(createRandomCircle(x, y));

  start();
}

function handleVisibilityChange() {
  if (document.hidden) {
    stop();
  } else if (particles.length || circles.length) {
    start();
  }
}

onMounted(() => {
  ctx = canvas.value.getContext("2d");
  setCanvasSize();

  const reducedMotion = globalThis.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // 无粒子可绘制时无需常驻 rAF，也尊重系统的减少动态效果设置
  if (reducedMotion) return;

  const tapEvent = "ontouchstart" in globalThis ? "touchstart" : "mousedown";
  globalThis.addEventListener(tapEvent, handleClick, { passive: true });
  globalThis.addEventListener("resize", setCanvasSize);
  document.addEventListener("visibilitychange", handleVisibilityChange);
});

onUnmounted(() => {
  const tapEvent = "ontouchstart" in globalThis ? "touchstart" : "mousedown";
  globalThis.removeEventListener(tapEvent, handleClick);
  globalThis.removeEventListener("resize", setCanvasSize);
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  stop();
});
</script>
