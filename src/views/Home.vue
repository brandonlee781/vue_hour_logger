<template>
  <v-layout row nowrap>
    <app-side-bar :expanded="expanded" :links="links" @selectedItem="selectedItem" :selectedIndex="selectedIndex">
      <div class="side-log-header" slot="header">
        <span>Log Entries</span>
      </div>
    </app-side-bar>
    <v-layout class="home-body">
      <!-- <filter-hour-form></filter-hour-form> -->
      <!-- <v-divider></v-divider> -->
      <entry-list :selectedItem="selectedListItem"></entry-list>
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import Cookies from 'vue-cookie';

import FilterHourForm from '@/components/FilterHour/FilterHourForm.vue';
import LogEntryList from '@/components/LogEntry/LogEntryList.vue';
import AppSideBar from '@/components/AppSideBar.vue';

@Component({
  components: {
    'filter-hour-form': FilterHourForm,
    'entry-list': LogEntryList,
    'app-side-bar': AppSideBar
  }
})
export default class Home extends Vue {
  @Prop() expanded: boolean;
  selectedIndex: number = 0;

  get links() {
    const projects =  this.$store.getters['project/getProjects'];
    const firstEl = {
      icon: '',
      title: 'Recent Log Entries',
      id: 'recent'
    };

    return [firstEl, ...projects.map((p) => {
      return {
        icon: 'folder_open',
        title: p.name,
        id: p.name.toLowerCase()
      }
    })]
  }

  get projects() {
    return this.$store.getters['project/getProjects'];
  }
  get isProjectLoading() {
    return this.$store.state.project['isLoading'];
  }

  get selectedListItem() {
    return this.links[this.selectedIndex];
  }

  selectedItem(val) {
    const ind = this.links.findIndex(link => link.id === val.id );
    this.selectedIndex = ind;
  }

}
</script>

<style lang="scss" scoped>
  .home-body {
    background: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    position: relative;
  }
  .side-log-header {
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
