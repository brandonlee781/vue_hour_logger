<template>
  <b-navbar toggleable="md" type="dark" variant="primary">
    <b-nav-toggle target="nav_collapse"></b-nav-toggle>
    <b-navbar-brand><router-link class="navbar-brand" to="/">Hour Logger</router-link></b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-nav is-nav-bar class="ml-auto">
        <b-nav-item><router-link class="nav-link" to="/hours">Get Hours</router-link></b-nav-item>
      </b-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class NavBar extends Vue {

}
</script>

<style scoped>

</style>
