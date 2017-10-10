<template>
  <div class="invoice-data-table">
    <!-- <v-layout row nowrap justify-end align-end class="table-buttons" v-if="filtered.length > 0">
      <v-btn outline class="clear-button" color="secondary" @click="clearEntries()">Clear Entries</v-btn>
      <v-btn color="primary" class="csv-button" @click="downloadCSV()">Download CSV</v-btn>
    </v-layout> -->

    <v-data-table
      :headers="headers"
      :items="filtered"
      :pagination.sync="sort"
      class="elevation-1"
    >
      <template slot="items" scope="props">
        <td>
          <v-tooltip right>
            <div slot="activator">{{ props.item.project }}</div>
            <span>{{ props.item.project }}: {{ projects[props.item.project].map(p => p.duration).reduce((a,b) =>  a + b ) }} hours</span>
          </v-tooltip>
        </td>
        <td class="text-xs-right">{{ props.item.date }}</td>
        <td class="text-xs-right">{{ props.item.startTime }}</td>
        <td class="text-xs-right">{{ props.item.endTime }}</td>
        <td class="text-xs-right">{{ props.item.duration }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import moment from 'moment';
import * as jsonexport from 'jsonexport/dist';
import { Log } from '../../store/log/';

@Component
export default class InvoiceBodyDataTable extends Vue {
  @Prop() filtered: Log[];
  @Prop() projects;
  @Prop() currentFilter;
  headers = [
    { text: 'Project', value: 'project'},
    { text: 'Date', value: 'date'},
    { text: 'Start Time', value: 'startTime', sortable: false},
    { text: 'End Time', value: 'endTime', sortable: false},
    { text: 'Duration', value: 'duration'},
  ];
  sort = {
    sortBy: 'date',
    descending: true,
    rowsPerPage: 25
  }

  clearEntries() {

  }

  public downloadCSV() {
    const formattedLogs = this.filtered.map((log, ind) => {
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
      const filename = this.currentFilter.endDate ? 
        moment(this.currentFilter.endDate).format('MMMDD') + '_hours.csv' : 
        moment().format('MMMDD') + '_hours.csv';

      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
      element.setAttribute('download', filename);

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    })
  }
}
</script>

<style lang="scss" scoped>
  .invoice-data-table {
    width: 50%;
  }
</style>
