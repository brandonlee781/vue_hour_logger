<template>
  <div :class="this.expanded ? 'side-nav expanded' : 'side-nav'">
    <v-tooltip right>
      <v-btn flat light :exact="true" to="/" slot="activator" class="sidenav-btn">
        <v-icon light>home</v-icon>
        <span v-if="this.expanded">Home</span>
      </v-btn>
      <span>Home</span>
    </v-tooltip>
    
    <v-tooltip right>
      <v-btn flat light :exact="true" to="/projects" slot="activator" class="sidenav-btn">
        <v-icon light>assignment</v-icon>
        <span v-if="this.expanded">Projects</span>
      </v-btn>
      <span>Projects</span>
    </v-tooltip>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class SideNavBar extends Vue {
  @Prop() expanded: boolean;
  expandSideBar() {
    this.$emit('expandSideBar');
  }
}
</script>

<style lang="scss" scoped>
  .side-nav {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 52px;
    height: 100vh;
    position: fixed;
    background-color: #fff;
    border-right: 2px solid #ddd;
  }
  a.sidenav-btn {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 52px !important;
    min-width: 52px;
    border-radius: 0;
  }
  .expanded .sidenav-btn {
    min-width: 160px;
  }
  .sidenav-btn span {
    margin-left: 6px;
  }
  .sidenav-btn.btn--active {
    border-right: 5px solid #1976d2;
  }
  .expanded {
    width: 160px;
  }
</style>
