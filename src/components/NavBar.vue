<template>
  <div class="bran-toolbar">
    <v-btn flat class="expand-button" @click="expandSideBar"><v-icon>menu</v-icon></v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class NavBar extends Vue {
  expandSideBar() {
    this.$emit('expandSideBar');
  }
}
</script>

<style lang="scss" scoped>
  .bran-toolbar {
    display: flex;
    flex-flow: row nowrap;
    height: 42px;
    width: 100%;
    border-bottom: 2px solid #ddd;
    background-color: #fff;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 3;
  }
  .expand-button {
    align-self: flex-start;
    min-width: 52px;
    width: 52px;
    height: 42px;
    margin: 0;
    border-right: 2px solid #ddd;
    color: #777;
  }
</style>
