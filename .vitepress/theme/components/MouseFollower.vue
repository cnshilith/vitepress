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
let particles = [];
let width = 0;
let height = 0;
let mouse = { x: 0, y: 0 };
let targetMouse = { x: 0, y: 0 };
let lastMouse = { x: 0, y: 0 };
let animationFrameId = null;
let started = false;

// 粒子数量上限
const MAX_PARTICLES = 25;

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    // 随机角度
    this.angle = Math.random() * Math.PI * 2;
    // 更小的随机半径 (15-25)
    this.radius = Math.random() * 40 + 25;
    // 随机旋转速度
    this.speed = (Math.random() * 2 + 2) * 0.01;
    // 更小的粒子大小 (1-2)
    this.size = Math.random() * 3 + 1;
    // 随机颜色
    this.hue = Math.random() * 360;
    // 随机方向
    this.clockwise = Math.random() > 0.5;
    // 更小的随机偏移
    this.offsetX = (Math.random() - 0.5) * 10;
    this.offsetY = (Math.random() - 0.5) * 10;
    // 生命周期
    this.life = Math.random() * 0.5 + 0.5;
    this.maxLife = this.life;
    // 拖尾效果
    this.trail = [];
    this.trailLength = Math.floor(Math.random() * 3) + 2; // 2-4个拖尾点
  }

  update() {
    // 更新角度
    this.angle += this.speed * (this.clockwise ? 1 : -1);

    // 计算目标位置
    const targetX = mouse.x + Math.cos(this.angle) * this.radius + this.offsetX;
    const targetY = mouse.y + Math.sin(this.angle) * this.radius + this.offsetY;

    // 添加当前位置到拖尾数组
    if (!this.x) {
      this.x = targetX;
      this.y = targetY;
    }

    // 计算实际移动（添加弹性移动）
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    this.x += dx * 0.15;
    this.y += dy * 0.15;

    // 更新拖尾
    this.trail.unshift({ x: this.x, y: this.y });
    if (this.trail.length > this.trailLength) {
      this.trail.pop();
    }

    // 更新生命周期
    this.life -= 0.002;
    if (this.life <= 0) {
      this.reset();
    }
  }

  draw() {
    const alpha = this.life / this.maxLife;

    // 绘制拖尾
    if (this.trail.length > 1) {
      ctx.beginPath();
      ctx.moveTo(this.trail[0].x, this.trail[0].y);

      for (let i = 1; i < this.trail.length; i++) {
        const point = this.trail[i];
        ctx.lineTo(point.x, point.y);
      }

      ctx.strokeStyle = `hsla(${this.hue}, 70%, 60%, ${alpha * 0.5})`;
      ctx.lineWidth = this.size;
      ctx.lineCap = "round";
      ctx.stroke();
    }

    // 绘制主粒子
    ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${alpha})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
}

// 平滑跟随鼠标
function updateMousePosition() {
  const dx = targetMouse.x - mouse.x;
  const dy = targetMouse.y - mouse.y;

  // 计算鼠标移动速度
  const speedX = targetMouse.x - lastMouse.x;
  const speedY = targetMouse.y - lastMouse.y;
  const mouseSpeed = Math.sqrt(speedX * speedX + speedY * speedY);

  // 根据鼠标速度调整跟随速度
  const followSpeed = Math.min(0.15, 0.15 / (1 + mouseSpeed * 0.005));

  mouse.x += dx * followSpeed;
  mouse.y += dy * followSpeed;

  lastMouse.x = mouse.x;
  lastMouse.y = mouse.y;
}

function handleMouseMove(e) {
  // 画布是 position:fixed; left:0; top:0，无需每帧 getBoundingClientRect 触发强制布局
  targetMouse.x = e.clientX;
  targetMouse.y = e.clientY;
  // 首次移动鼠标时才生成粒子并启动循环
  if (!started) initParticles();
  start();
}

function initParticles() {
  particles = [];
  // 初始创建12-15个粒子
  const initialCount = Math.floor(Math.random() * 4) + 12;
  for (let i = 0; i < initialCount; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  animationFrameId = null;
  if (!ctx) return;

  ctx.clearRect(0, 0, width, height);

  updateMousePosition();

  // 随机添加新粒子
  if (particles.length === 0) {
    // 粒子会自行重置生命周期，正常情况下不会为空
    initParticles();
  } else if (particles.length < MAX_PARTICLES && Math.random() < 0.1) {
    particles.push(new Particle());
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }

  if (particles.length) {
    animationFrameId = requestAnimationFrame(animate);
  }
}

function start() {
  if (animationFrameId === null && !document.hidden) {
    started = true;
    animationFrameId = requestAnimationFrame(animate);
  }
}

function stop() {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

function handleVisibilityChange() {
  // 页面不可见时停止 rAF，重新可见后仅在粒子仍存在时恢复
  if (document.hidden) {
    stop();
  } else if (started && particles.length) {
    start();
  }
}

function handleResize() {
  if (!canvas.value) return;
  width = globalThis.innerWidth;
  height = globalThis.innerHeight;
  canvas.value.width = width;
  canvas.value.height = height;
  if (started) start();
}

onMounted(() => {
  ctx = canvas.value.getContext("2d");

  // 无障碍：系统开启"减少动态效果"时不启用粒子跟随
  if (globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  width = globalThis.innerWidth;
  height = globalThis.innerHeight;
  mouse = { x: width / 2, y: height / 2 };
  targetMouse = { ...mouse };
  lastMouse = { ...mouse };
  handleResize();

  // 首次移动鼠标后才启动循环，避免首屏白跑一个全屏 60fps 画布
  globalThis.addEventListener("resize", handleResize);
  globalThis.addEventListener("mousemove", handleMouseMove, { passive: true });
  document.addEventListener("visibilitychange", handleVisibilityChange);
});

onUnmounted(() => {
  globalThis.removeEventListener("resize", handleResize);
  globalThis.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  stop();
});
</script>

<style scoped>
canvas {
  pointer-events: none;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999999;
}
</style>
