<template>
  <v-layout class="entry-list" column nowrap justify-center>
    <log-entry v-bind:hour="newEntry" v-on:addEntry="addEntry"></log-entry>
    <v-divider light inset></v-divider>
    <div v-for="(log, index) in logs" :key="log._id">
      <log-entry :log="log" @deleteEntry="deleteEntry" @editEntry="editEntry"></log-entry>
      <v-divider light inset></v-divider>
    </div>
    <v-btn color="primary" full-width @click="getMoreEntries()">Load More</v-btn>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Provide } from 'vue-property-decorator';
import { mapState } from 'vuex';
import * as moment from 'moment';
import * as Cookies from 'js-cookie';
import { ILog } from '../../interfaces/log';
import { IAuthCookie } from '../../interfaces/authCookie';
import axios, { AxiosInstance } from 'axios';

import * as logs from '../../store/log';

@Component({
  computed: {
    logs() {
      return logs.readLogs(this.$store);
    }
  }
})
export default class LogEntryList extends Vue {
  @Provide() newEntry: ILog = { date: moment().format('MM/DD/YYYY'), startTime: '', endTime: '', duration: 0, project: '', note: ''};
  currentSkip: number = 20;
  api: AxiosInstance;
  authCookie: IAuthCookie;

  constructor() {
    super();
    this.authCookie = JSON.parse(Cookies.get('hourLoggerAuth'));
    this.api = axios.create({
      baseURL: 'https://www.branlee.me/api/v1',
      headers: { 'Authorization': 'Basic ' + this.authCookie.code }
    })
  }

  // get logs(): logs.Log[] {
  //   return logs.readLogs(this.$state);
  // }

  // addEntry(entry) {
  //   this.api.post('/logs', entry)
  //     .then(res => {
  //       if (res.status === 200) {
  //         const newHours = [res.data, ...this.hours];
  //         this.hours = newHours;

  //         this.newEntry = {_id: undefined, date: moment().format('MM/DD/YYYY'), startTime: '', endTime: '', duration: 0, project: '', note: ''};
  //       }
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     })
  // }

  // deleteEntry(id) {
  //   if(window.confirm('Are you sure you want to delete this entry?')) {
  //     this.api.delete('/logs/'+id)
  //       .then(res => {
  //         if (res.status === 204) {
  //           this.getEntries();
  //         }
  //       })
  //       .catch(err => {
  //         console.error(err);
  //       })
  //   }
  // }

  // editEntry(entry) {
  //   console.log('entryList editEntry');
  //   this.api.put('/logs/'+entry._id, entry)
  //     .then(res => {
  //       if (res.status = 200) {
  //         console.log('this');
  //         let index = this.hours.findIndex(val => val._id === entry._id);
  //         var newHours = [ ...this.hours.slice(0,index), this.hours[index], ...this.hours.slice(index + 1) ];
  //         this.hours = newHours;
  //       }
  //     })
  // }

  // getEntries() {
  //   this.api.get('/logs')
  //     .then(res => {
  //       this.hours = res.data;
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     })
  // }

  // getMoreEntries() {
  //   this.api.get(`/logs?skip=${this.currentSkip}`)
  //     .then(res => {
  //       this.hours = this.hours.concat(res.data);
  //       this.currentSkip += 20;
  //     })
  //     .catch(err => {
  //       console.error(err);
  //     });
  // }
}

</script>

<style lang="scss" scoped>
.entry-list {
  margin-top: 20px;
}
.add-button,
.remove-button {
  height: 40px;
  width: 40px;
  margin-right: 4px;
}
.add-button {
  height: 40px;
  margin-top: auto;
}
</style>