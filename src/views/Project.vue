<template>
  <v-layout row nowrap>
    <app-side-bar :expanded="expanded" :links="links" @selectedItem="selectedItem" :selectedIndex="selectedIndex">
      <div class="side-project-header" slot="header">
        <span v-if="!inputOpen">Projects</span>
        <v-text-field 
          v-if="inputOpen" 
          dark
          color="white"
          placeholder="New Project Name"
          prepend-icon="folder_open"
          v-model="newProjectName" 
        ></v-text-field>
        <v-btn class="project-new-btn" icon large slot="activator" @click="newProject()">+</v-btn>
      </div>
      <img v-if="isProjectLoading" src="../assets/Double Ring.svg" alt="Loading" slot="loader">
    </app-side-bar>
    <v-layout class="project-body">

    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import Cookies from 'vue-cookie';

import AppSideBar from '@/components/AppSideBar.vue';

@Component({
  components: {
    'app-side-bar': AppSideBar,
  }
})
export default class Project extends Vue {
  @Prop() expanded: boolean;
  inputOpen: boolean = false;
  newProjectName: string = '';
  selectedIndex: number = 0;
  
  get links() {
    const projects =  this.$store.getters['project/getProjects'];
    const firstEl = {
      icon: '',
      title: 'Show tasks from all projects',
      id: 'all'
    };

    return [firstEl, ...projects.map((p) => {
      return {
        icon: 'folder_open',
        title: p.name,
        id: p.name.toLowerCase()
      }
    })]
  }
  get isProjectLoading() {
    return this.$store.state.project['isLoading'];
  }

  newProject() {
    if (!this.inputOpen) {
      this.inputOpen = true;
    } else {
      this.$store.dispatch('project/ADD_NEW_PROJECT', { name: this.newProjectName })
      this.newProjectName = '';
      this.inputOpen = false;
    }
  }
  selectedItem(val) {
    const ind = this.links.findIndex(link => link.id === val.id );
    this.selectedIndex = ind;
  }

}
</script>

<style lang="scss" scoped>
  .project-body {
    background: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    position: relative;
  }
  .project-new-btn {
    font-size: 4em;
    font-weight: 100;
    color: #fff !important;
  }
  .side-project-header {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    height: 9em;
    padding: 0 2em;
    border-bottom: 1px solid rgba(255,255,255, 0.3);
    & span {
      font-size: 2.5rem;
      font-weight: 300;
      color: #fff;
    }
  }
</style>