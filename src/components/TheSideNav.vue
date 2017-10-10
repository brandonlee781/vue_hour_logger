<template>
  <div :class="this.expanded ? 'side-nav expanded' : 'side-nav'">
    
    <v-btn color="primary" class="menu-btn hidden-lg-and-up" @click.stop="expandSidebar"><v-icon>menu</v-icon> MENU</v-btn>

    <v-tooltip right>
      <v-btn flat :exact="true" to="/" slot="activator" class="sidenav-btn" active-class="sidenav-active">
        <v-layout column nowrap justify-center align-center>
          <v-icon>home</v-icon>
          <span>Home</span>
        </v-layout>
      </v-btn>
      <span>Home</span>
    </v-tooltip>
    
    <v-tooltip right>
      <v-btn flat :exact="true" to="/projects" slot="activator" class="sidenav-btn" active-class="sidenav-active">
        <v-layout column nowrap>
          <v-icon>assignment</v-icon>
          <span>Projects</span>
        </v-layout>
      </v-btn>
      <span>Projects</span>
    </v-tooltip>

    <v-tooltip right>
      <v-btn flat :exact="true" to="/invoice" slot="activator" class="sidenav-btn" active-class="sidenav-active">
        <v-layout column nowrap>
          <v-icon>receipt</v-icon>
          <span>Invoices</span>
        </v-layout>
      </v-btn>
      <span>Projects</span>
    </v-tooltip>


  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class TheSideNav extends Vue {
  @Prop() expanded: boolean;

  expandSidebar() { 
    this.$emit('expandSidebar');
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/app-colors.scss';
  $cutoutSize: 10px;
  $buttonSize: 9em;
  .side-nav {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    width: $buttonSize;
    height: 100vh;
    position: fixed;
    background-color: $background;
    z-index: 10;
  }
  .sidenav-btn {
    width: $buttonSize!important;
    min-width: $buttonSize;
    height: $buttonSize;
    border-radius: 0;
    margin: 0;
    color: $text;
    & .icon {
      font-size: 2.5rem
    }
    & span {
      margin-top: 6px;
      font-size: 0.8rem;
    }
  }
  .menu-btn {
    max-width: 100%;
    height: 40px;
    margin: 0;
  }
  .sidenav-active {
    color: $accent;
  }
  .sidenav-active:after {
    content:"";
    position:absolute; 
    right: 0;
    border-top: $cutoutSize solid transparent;
    border-bottom: $cutoutSize solid transparent;
    border-right: $cutoutSize solid $primary;
  }
  @media print {
    .side-nav {
      display: none;
    }
  }
</style>
