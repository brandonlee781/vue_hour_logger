<template>
  <div class="hours-wrapper">
    <div class="select-date-form">
      <b-form-group label="Get entries from: " label-for="fromDate">
        <b-form-input id="fromDate" type="date" v-model="fromDate"></b-form-input>
      </b-form-group>
      <b-form-group label="Get entries to: " label-for="toDate">
        <b-form-input id="toDate" type="date" v-model="toDate"></b-form-input>
      </b-form-group>
      <b-button class="get-button" variant="success" @click="getEntries()">Get Entries</b-button>
    </div>
    <project-hours v-for="(entries, key) in projects" :key="key" :project="key" :entries="entries"></project-hours>
    <div class="buttons">
      <b-button class="csv-button" v-if="logs.length > 0" @click="downloadCSV()" variant="primary">Download CSV</b-button>
      <b-button class="pdf-button" v-if="logs.length > 0" @click="downloadPDF()" variant="primary">Create Invoice</b-button>
    </div>
  </div>
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
export default class Hours extends Vue {
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
    display: flex;
    flex-flow: column nowrap;
    margin-top: 40px;
    justify-content: center;
    align-self: center;
  }
  .log-nav-bar {
    margin-bottom: 40px;
  }
  .select-date-form {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: flex-end;
  }
  .get-button {
    max-height: 42px;
    margin-bottom: 1.1rem;
    margin-left: 8px;
  }
  .buttons {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: 60%;
    margin: 10px auto 0 auto;
  }
  .pdf-button,
  .csv-button {
    width: 49%;
  }
</style>