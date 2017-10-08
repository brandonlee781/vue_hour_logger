<template>
  <v-container class="home">
    <img class="fancy-b" src="../assets/FancyB.svg" alt="FancyB">
    <filter-hour-form></filter-hour-form>
    <v-divider></v-divider>
    <entry-list></entry-list>
  </v-container>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Cookies from 'vue-cookie';
import FilterHourForm from '@/components/FilterHour/FilterHourForm';
import LogEntryList from '@/components/LogEntry/LogEntryList';

@Component({
  components: {
    'filter-hour-form': FilterHourForm,
    'entry-list': LogEntryList,
  }
})
export default class Home extends Vue {
 
}
</script>
<style scoped>
  .home {
    margin-top: 30px auto;
    width: 80%;
    max-width: 850px;
  }
  .fancy-b {
    height: 139px;
    width: 182px;
    margin-bottom: 10px;
  }
</style>
