<template>
  <div class="home">
    <entry-list></entry-list>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Home extends Vue {

}
</script>
<style scoped>
  .home {
    margin-top: 30px;
  }
</style>
