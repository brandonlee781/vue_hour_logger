<template>
  <v-layout class="log-entry" row nowrap>

    <v-layout class="log-wrapper" column nowrap justify-center align-start>
      <span class="log-note">{{ log.note }}</span>
      <v-layout class="log-details" row nowrap>
        <div class="log-project">
          <v-icon>folder_open</v-icon>
          <span>{{ log.project }}</span>
        </div>
        <div class="log-date">
          <v-icon>event</v-icon>
          <span>{{ log.date }}</span>
        </div>
        <div class="log-start">
          <v-icon>access_time</v-icon>
          <span>{{ log.startTime }}</span>
        </div>
        <div class="log-end">
          <v-icon>access_time</v-icon>
          <span>{{ log.endTime }}</span>
        </div>
        <div class="duration">
          <v-icon>timelapse</v-icon>
          <span>{{ log.duration || tempDuration || 0 }}</span>
        </div>
      </v-layout>
    </v-layout>

    <div class="entry-actions">
      <v-btn icon large><v-icon color="blue lighten-1">mode_edit</v-icon></v-btn>
      <v-btn icon large @click="deleteEntry()"><v-icon color="red lighten-1">delete</v-icon></v-btn>
    </div>
      
  </v-layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import { ILog } from '../../interfaces/log';
  import * as moment from 'moment';

  @Component
  export default class LogEntryListItem extends Vue {
    @Prop() log: ILog;
    @Prop() actions;
    dateMenu: boolean = false;
    startMenu: boolean = false;
    endMenu: boolean = false;

    get formattedDate() {
      if (this.log.date) {
        return moment(this.log.date, 'MM/DD/YYYY').format('YYYY-MM-DD');
      } else {
        return null;
      }
    }
    set formattedDate(val) {
      this.log.date = moment(val, 'YYYY-MM-DD').format('MM/DD/YYYY');
    }

    get tempDuration() {
      if (this.log.startTime && this.log.endTime) {
        return moment(this.log.endTime, 'HH:mm').diff(moment(this.log.startTime, 'HH:mm'), 'hours', true);
      }
    }

    deleteEntry() {
      if (window.confirm('Are you sure you want to delete this entry?')) {
        this.actions.deleteLog(this.log);
      }
    }

    editEntry() {
      if (this.log._id) {
        if (!this.log.duration) this.log.duration = this.tempDuration;
        this.actions.editLog(this.log);
      }
    }

    cancel() {

    }

    save() {
      console.log(this.log)
    }

  }


</script>
<style lang="scss" scoped>
  .log-entry {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100%;
    height: 7em;
    padding: 6px 4em;
    border-bottom: 1px solid rgba(0,0,0,0.12);
  }
  .log-note {
    max-width: 80%;
    font-size: 1.3rem;
    font-weight: 500;
    letter-spacing: 0.3px;
    margin-bottom: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .log-details {
    display: flex;
    justify-content: space-between;
    max-width: 500px;
    max-height: 1.5em;
    & div {
      text-align: left;
      margin-right: 10px;
    }
  }
</style>