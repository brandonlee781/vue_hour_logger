<template>
  <v-navigation-drawer 
    class="blue app-side-bar"
    v-model="isOpen"
    width="378"
    persistent 
    enable-resize-watcher 
    dark>
    <slot name="header"></slot>
    <slot name="loader"></slot>
    <v-list>
      <v-list-tile 
        v-for="(item, index) in links" 
        :key="item.title" 
        :class="selectedIndex === index ? 'list-item selected' : 'list-item'"
        @click="selectItem(item)">
        <v-list-tile-action>
          <v-icon light>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class AppSideBar extends Vue {
  @Prop() expanded: boolean;
  @Prop() links;
  @Prop() selectedIndex: number = 0;
  isOpen: boolean = true;

  @Watch('expanded')
  toggleSidebar(val) {
    this.isOpen = !this.isOpen;
  }

  selectItem(item) {
    this.$emit('selectedItem', item);
  }
}
</script>

<style lang="scss" scoped>
$cutoutSize: 10px;
.list-item {
  display: flex;
  align-items: center;
  height: 5em;
  border-bottom: 1px solid rgba(255,255,255, 0.3);
  cursor: pointer;
}
.selected:after {
    content:"";
    position:absolute; 
    right: 0;
    border-top: $cutoutSize solid transparent;
    border-bottom: $cutoutSize solid transparent;
    border-right: $cutoutSize solid #fff;
  }
@media (min-width: 1264px) {
  .app-side-bar {
    left: 9em;
  }
}
@media print {
  .app-side-bar {
    display: none;
  }
}
</style>
