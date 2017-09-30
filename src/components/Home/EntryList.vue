<template>
  <div class="wrapper">
    <div class="data-row">
      <log-entry v-bind:hour="newEntry" v-on:addEntry="addEntry"></log-entry>
    </div>
    <div class="data-row">
      <log-entry v-for="(hour, index) in hours" :key="hour.id" v-bind:hour="hour" v-on:deleteEntry="deleteEntry" v-on:editEntry="editEntry"></log-entry>
    </div>
    <b-button variant="primary" @click="getMoreEntries()">Load More</b-button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import * as moment from 'moment';
import * as Cookies from 'js-cookie';
import { ILog } from '../../interfaces/log';
import { IAuthCookie } from '../../interfaces/authCookie';
import axios, { AxiosInstance } from 'axios';

@Component
export default class EntryList extends Vue {
  hours: ILog[] = [];
  newEntry: ILog = {};
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

  mounted() {
    this.$nextTick(function() {
      this.getEntries();
    })
  }

  addEntry(entry) {
    this.api.post('/logs', entry)
      .then(res => {
        if (res.status === 200) {
          this.getEntries();
          this.newEntry = {_id: '0', startTime: '', endTime: '', duration: 0, project: '', note: ''};
        }
      })
      .catch(err => {
        console.error(err);
      })
  }

  deleteEntry(id) {
    if(window.confirm('Are you sure you want to delete this entry?')) {
      this.api.delete('/logs/'+id)
        .then(res => {
          if (res.status === 204) {
            this.getEntries();
          }
        })
        .catch(err => {
          console.error(err);
        })
    }
  }

  editEntry(entry) {
    console.log(entry);
    this.api.put('/logs/'+entry._id, entry)
      .then(res => {
        if (res.status = 200) {
          this.getEntries();
        }
      })
  }

  getEntries() {
    this.api.get('/logs')
      .then(res => {
        this.hours = res.data;
      })
      .catch(err => {
        console.error(err);
      })
  }

  getMoreEntries() {
    this.api.get(`/logs?skip=${this.currentSkip}`)
      .then(res => {
        this.hours = this.hours.concat(res.data);
        this.currentSkip += 20;
      })
      .catch(err => {
        console.error(err);
      });
  }
}

</script>

<style scoped>
.add-button,
.remove-button {
  height: 40px;
  width: 40px;
  margin-right: 4px;
}
.wrapper {
  display: flex;
  flex-flow: column nowrap;
  width: 80%;
  margin: 0 auto;
}
.add-button {
  height: 40px;
  margin-top: auto;
}
</style>