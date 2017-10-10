<template>
  <!-- <div class="bran-toolbar">
  </div> -->
  <v-toolbar class="bran-toolbar" app dense fixed>
    <v-btn color="primary" dark class="menu-btn hidden-md-and-up elevation-0" @click.stop="expandSidebar"><v-icon>menu</v-icon></v-btn>
    
    <div class="fancy-b hidden-sm-and-down">
      <img src="../assets/FancyB.svg" alt="FancyB">
    </div>



  </v-toolbar>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class TheTopNav extends Vue {
  expandSidebar() {
    this.$emit('expandSidebar');
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/app-colors.scss';
  .bran-toolbar {
    background-color: $background;
  }
  .menu-btn {
    align-self: flex-start;
    max-width: 42px;
    height: 100%;
    margin: 0 !important;
  }
  .fancy-b {
    width: 7rem;
    height: 100%;
    padding: 8px;
    border-right: 2px solid $text;
    border-bottom: 2px solid $text;
    background-color: $background;
    & img {
      height: 2.5rem;
      width: 2.5rem;
    }
  }
  @media print {
    .bran-toolbar {
      display: none;
    }
  }
</style>
