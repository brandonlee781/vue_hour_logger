<template>
  <v-card class="project-card">
    <v-card-title>
      <p class="project-hours-title">{{ project }} - {{ totalHours }} hours</p>
    </v-card-title>
    <v-card-text>
      <v-layout column justify-start align-start>
        <p class="card-text" v-for="(entry, index) in descEntries" :key="index">
          {{ entry.date | date }} - {{ entry.startTime | time }} - {{ entry.endTime | time }} - {{ entry.duration }} hours 
        </p>
      </v-layout>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class FilterHourFormItem extends Vue {
  @Prop() entries;
  @Prop() project;

  constructor() {
    super();
  }

  get totalHours() {
    return this.entries.reduce((acc, cur) => {
      return acc + cur.duration;
    }, 0)
  }

  get descEntries() {
    return this.entries.sort((a, b) => {
      const firstDate = new Date(a.date);
      const secondDate = new Date(b.date);

      if (firstDate < secondDate)
        return 1;
      if (firstDate > secondDate)
        return -1;
      return 0;
    })
  }

}
</script>

<style lang="scss" scoped>
  .project-card {
    width: calc(50% - 8px);
    margin: 4px;
    max-height: 450px;
    overflow-y: scroll;
  }
  .card-body {
    padding: 0 16px;
  }
  .project-hours-title {
    font-size: 16px;
  }
</style>
