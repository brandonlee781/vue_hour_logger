<template>
  <v-layout column nowrap>
    <v-layout row nowrap align-end class="invoice-body-header">
      <span class="invoice-body-title">Create New Invoice</span>
      <invoice-filter @filterLogs="filterLogs"></invoice-filter>
    </v-layout>
    <v-layout row nowrap justify-start align-start class="invoice-buttons" v-if="filtered.length > 0">
      <v-btn color="primary" class="csv-button" @click="downloadCSV()">Download CSV</v-btn>
      <v-btn outline class="clear-button" color="green" @click="saveInvoice()">Save Invoice</v-btn>
    </v-layout>
    <div class="body-wrapper" v-if="filtered.length > 0">
      <invoice-data-table 
        :filtered="filtered" 
        :projects="projects" 
        :currentFilter="currentFilter"
        class="data-table"
      ></invoice-data-table>
      <div class="invoice-wrapper">
        <div class="invoice-template elevation-1">
          <invoice-template :projects="projects"></invoice-template>
        </div>
      </div>
    </div>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import moment from 'moment';
import { Log } from '../../store/log/';
import { Project } from '../../store/project/';

import InvoiceBodyFilter from '@/components/Invoice/InvoiceBodyFilter.vue';
import InvoiceBodyDataTable from '@/components/Invoice/InvoiceBodyDataTable.vue';
import InvoiceTemplate from '@/components/Invoice/InvoiceTemplate.vue';

@Component({
  components: {
    'invoice-filter': InvoiceBodyFilter,
    'invoice-data-table': InvoiceBodyDataTable,
    'invoice-template': InvoiceTemplate
  }
})
export default class InvoiceBody extends Vue {
  filtered: Log[] = [];
  projects: Project[] = [];
  currentFilter = {startDate: null, endDate: null};

  get logs(): Log[] {
    return this.$store.getters['log/getLogs'];
  }

  filterLogs(filter) {
    this.currentFilter = filter;
    if (filter.startDate) {
      const logs = this.$store.getters['log/getLogs'];
      this.filtered = logs.filter((log) => {
        if ( moment(log.date, 'MM/DD/YYYY').isBetween(filter.startDate, filter.endDate || moment()) ) {
          return log;
        }
      });
      this.projects = this.groupBy(this.filtered, 'project');
    }
  }
  
  public saveInvoice() {

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

<style lang="scss" scoped>
.invoice-body-header {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  height: 9em;
  padding: 0 4em;
  border-bottom: 1px solid rgba(0,0,0,0.12);
  & .invoice-body-title {
    font-size: 2.5rem;
    font-weight: 300;
  }
}
.body-wrapper {
  display: flex;
  flex-flow: column nowrap;
}
.invoice-wrapper {
  width: 100%;
}
.invoice-template {
  margin-left: 8px;
  padding: 16px;
  border: 1px solid rgba(0,0,0,0.12);
}
@media (min-width: 1260px) {
  .body-wrapper {
    flex-flow: row nowrap;
    justify-content: space-between;
  }
}
@media print {
  .invoice-body-header,
  .invoice-buttons
  .data-table,
  .table-buttons {
    display: none;
  }
  .invoice-template {
    margin: 0;
    padding: 0;
    border: 0;
  }
}
</style>
