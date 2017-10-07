<template>
  <v-layout column nowrap class="hours-wrapper">
    <v-layout row nowrap>
      <v-flex>
        <v-menu
          class="date-wrapper"
          lazy
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          :nudge-left="40"
          max-width="290px">
          <v-text-field
            slot="activator"
            label="Select Date From"
            v-model="fromDate"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="fromDate" autosave no-title scrollable></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex>
        <v-menu
          class="date-wrapper"
          lazy
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          :nudge-left="40"
          max-width="290px">
          <v-text-field
            slot="activator"
            label="Select Date To"
            v-model="toDate"
            prepend-icon="event"
            readonly
          ></v-text-field>
          <v-date-picker v-model="toDate" no-title scrollable autosave></v-date-picker>
        </v-menu>
      </v-flex>
      <!-- <v-flex> -->
        <v-btn class="get-button" color="primary" @click="getEntries()">Get Project Totals</v-btn>
      <!-- </v-flex> -->
    </v-layout>

    <v-layout row wrap>
      <project-hours v-for="(entries, key) in projects" :key="key" :project="key" :entries="entries"></project-hours>
    </v-layout>
    
    <v-layout row nowrap justify-end align-end class="buttons" v-if="logs.length > 0">
      <v-btn flat v-if="logs.length > 0" class="clear-button" color="secondary" @click="clearEntries()">Clear Entries</v-btn>
      <v-btn outline color="primary" class="csv-button" @click="downloadCSV()">Download CSV</v-btn>
      <v-btn color="primary" class="pdf-button" @click="downloadPDF()">Create Invoice</v-btn>
    </v-layout>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import * as moment from 'moment';
import { ILog } from '../../interfaces/log';
import { IAuthCookie } from '../../interfaces/authCookie';
import axios, { AxiosInstance } from 'axios';
import * as jsonexport from 'jsonexport/dist';
import * as Cookies from 'js-cookie';

@Component
export default class HourTotalsSearch extends Vue {
  private api: AxiosInstance;
  public fromDate: Date | null = null;
  public toDate: Date | null = null;
  public logs: ILog[] = [];
  public projects: ILog[] = [];
  public authCookie: IAuthCookie;

  constructor() {
    super();
    this.authCookie = JSON.parse(Cookies.get('hourLoggerAuth'));
    this.api = axios.create({
      baseURL: 'https://www.branlee.me/api/v1',
      headers: { 'Authorization': 'Basic ' + this.authCookie.code }
    })
  }

  public getEntries() {
    if (this.fromDate || this.toDate) {
      const params = {params: { fromDate: this.fromDate, toDate: this.toDate }};
      this.api.get('/logs', params)
        .then(res => {
          this.logs = res.data;
          this.projects = this.groupBy(res.data, 'project');
        })
        .catch(err => {
          console.error(err);
        })
    }
  }

  public clearEntries() {
    this.fromDate = null;
    this.toDate = null;
    this.projects = [];
    this.logs = [];
  }

  public downloadCSV() {
    const formattedLogs = this.logs.map((log, ind) => {
      return {
        date: moment(log.date).format('MM/DD/YYYY'),
        'start time': moment(log.startTime, 'HH:mm:ss').format('HH:mm'),
        'end time': moment(log.endTime, 'HH:mm:ss').format('HH:mm'),
        'project': log.project,
        'total hours': log.duration,
        'notes': log.note
      }
    })


    jsonexport(formattedLogs, (err, csv) => {
      if (err) console.error(err);
      let filename = this.toDate ? moment(this.toDate).format('MMMDD') + '_hours.csv' : moment().format('MMMDD') + '_hours.csv';

      let element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    })
  }

  public downloadPDF() {
    this.$router.push({ name: 'Invoice', params: { projects: JSON.stringify(this.projects) } })
  }

  private groupBy(arr, prop) {
    return arr.reduce((log, x) => {
      if (!log[x[prop]]) { log[x[prop]] = [] };
      log[x[prop]].push(x);
      return log;
    }, {});
  }
}
</script>

<style scoped>
  .hours-wrapper {
    margin: 10px auto 20px auto;
    width: 100%;
  }
  .log-nav-bar {
    margin-bottom: 40px;
  }
  .date-wrapper {
    margin: 0 16px;
  }
  .get-button {
    max-height: 42px;
    margin-bottom: 1.1rem;
    margin-left: 8px;
  }
  .buttons {
    width: 100%;
    margin: 10px auto 0 auto;
  }
</style>