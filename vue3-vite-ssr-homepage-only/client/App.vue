<template>
  <div>
    <h1>{{ message }}</h1>
    <router-link to="/other">Go to Other Page</router-link>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const message = ref('Hello, SSR!');
</script>    