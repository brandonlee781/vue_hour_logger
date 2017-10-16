<template>
  <div class="invoice-data-table">
    <v-data-table
      :headers="headers"
      :items="filtered"
      :pagination.sync="sort"
      hide-actions
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
import { Log } from '../../store/log/';
import { Project } from '../../store/project/';

@Component
export default class InvoiceBodyDataTable extends Vue {
  @Prop() filtered: Log[];
  @Prop() projects: Project[];
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
    rowsPerPage: 100
  }
}
</script>

<style lang="scss" scoped>
  .invoice-data-table {
    width: 50%;
  }
  @media print {
    .invoice-data-table {
      display: none;
    }
  }
</style>
