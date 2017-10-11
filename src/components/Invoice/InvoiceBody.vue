<template>
  <v-layout column nowrap>
    <v-layout row nowrap align-end class="invoice-body-header">
      <span class="invoice-body-title">{{ savedInvoice.title }}</span>
      <invoice-filter v-if="!savedInvoice.logs" @filterLogs="filterLogs"></invoice-filter>
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
          <invoice-template 
            :projects="projects" 
            :invoiceNumber="invoiceNumber" 
            :currentFilter="currentFilter"
            :currentRate="currentRate"
          ></invoice-template>
        </div>
      </div>
    </div>
    <v-speed-dial
      class="invoice-buttons"
      v-if="filtered.length > 0"
      v-model="fab"
      bottom
      right
      fixed
      direction="top"
      :hover="false"
      transition="scale-transition"
    >
      <v-btn
        slot="activator"
        color="blue darken-2"
        dark
        fab
        hover
        v-model="fab"
      >
        <v-icon>file_download</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
      <v-tooltip left>
        <v-btn
          fab
          dark
          small
          slot="activator"
          color="indigo"
          @click="downloadCSV()"
        >
          <v-icon>insert_chart</v-icon>
        </v-btn>
        <span>Download CSV</span>
      </v-tooltip>
      <v-tooltip left>
        <v-btn
          fab
          dark
          small
          color="green"
          slot="activator"
          v-if="!savedInvoice.logs"
          @click="saveInvoice()"
        >
          <v-icon>save</v-icon>
        </v-btn>
        <span>Save Invoice</span>
      </v-tooltip>
    </v-speed-dial>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import moment from 'moment';
import * as jsonexport from 'jsonexport/dist';
import { Log } from '../../store/log/';
import { Invoice } from '../../store/invoice/';

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
  @Prop() savedInvoice;
  currentFilter = {startDate: null, endDate: null};
  fab: boolean = false;
  currentRate: number = 25;
  filtered: Log[] = [];

  @Watch('savedInvoice')
  loadSavedInvoice() {
    if (this.savedInvoice.logs) {
      this.filtered = this.savedInvoice.logs;
    } else {
      this.filtered = this.getFiltered();
    }
  }

  filterLogs(filter) {
    this.currentFilter = filter;
    this.filtered = this.getFiltered();
  }

  private getFiltered(): Log[] {
    if (this.currentFilter.startDate) {
      const logs = this.$store.getters['log/getLogs'];
      return logs.filter((log) => {
        if ( moment(log.date, 'MM/DD/YYYY').isBetween(this.currentFilter.startDate, this.currentFilter.endDate || moment()) ) {
          return log;
        }
      });
    } else {
      return [];
    }
  }

  get projects() {
    if (!this.filtered) return {};
    return this.groupBy(this.filtered, 'project');
  }
  
  get invoiceNumber() {
    if (this.savedInvoice.logs) {
      return this.savedInvoice.id;
    } else {
      return this.$store.getters['invoice/getInvoiceCount'] + 1;
    }
  }
  
  public saveInvoice() {
    this.$store.dispatch('invoice/ADD_NEW_INVOICE', {
      number: this.invoiceNumber,
      date: moment(this.currentFilter.endDate).format('MM/DD/YYYY') || moment().format('MM/DD/YYYY'),
      logs: this.filtered,
      total: this.invoiceTotal()
    })
  }

  private invoiceTotal() {
    let logs = []; // tslint:disable-line
    
    Object.keys(this.projects).forEach((key, ind) => {
      this.projects[key].forEach((entry, ind) => {
        logs.push(entry);
      })
    });
    const hours = logs.reduce( (acc, cur) => { return acc + cur.duration; }, 0 )
    return hours * this.currentRate;
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
