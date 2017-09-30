<template>
  <div>
    <b-card-group deck>
      <b-card :header="project + ' - ' + totalHours + ' hours'" style="max-width: 60%; margin: 0 auto; text-align: left">
        <p class="card-text" v-for="(entry, index) in descEntries" :key="index">
          {{ entry.date | date }} - {{ entry.startTime | time }} - {{ entry.endTime | time }} - {{ entry.duration }} hours - {{ entry.note }}
        </p>
      </b-card>
    </b-card-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class ProjectHours extends Vue {
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
        return -1;
      if (firstDate > secondDate)
        return 1;
      return 0;
    })
  }

}
</script>

<style scoped>

</style>
