<template>
  <v-layout row nowrap>
    <app-side-bar :expanded="expanded" :links="links" @selectedItem="selectedItem" :selectedIndex="selectedIndex">
      <div class="side-invoice-header" slot="header">
        <span>Invoices</span>
      </div>
    </app-side-bar>
    <div class="invoice-body">
      <invoice-body :savedInvoice="links[selectedIndex]"></invoice-body>
    </div>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import Cookies from 'vue-cookie';

import AppSideBar from '@/components/AppSideBar.vue';
import InvoiceBody from '@/components/Invoice/InvoiceBody.vue';

@Component({
  components: {
    'app-side-bar': AppSideBar,
    'invoice-body': InvoiceBody,
  }
})
export default class Invoice extends Vue {
  @Prop() expanded: boolean;
  selectedIndex: number = 0;
  fab = false;

  get links() {
    const projects =  this.$store.getters['invoice/getInvoices'];
    const firstEl = {
      icon: '',
      title: 'Create New Invoice',
      id: 'new'
    };

    return [firstEl, ...projects.map((p) => {
      return {
        icon: 'receipt',
        title: 'Invoice #' + p.number + ' - ' + p.date,
        id: p.number,
        logs: p.logs
      }
    }).sort((a,b) => {
      if (a.id < b.id) return 1;
      else if (a.id > b.id) return -1;
      return 0;
    })]
  }
  selectedItem(val) {
    const ind = this.links.findIndex(link => link.id === val.id );
    this.selectedIndex = ind;
  }

}
</script>

<style lang="scss" scoped>
  .invoice-body {
    background: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    position: relative;
  }
  .invoice-new-btn {
    font-size: 4em;
    font-weight: 100;
    color: #fff !important;
  }
  .side-invoice-header {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    height: 9em;
    padding: 0 2em;
    border-bottom: 1px solid rgba(255,255,255, 0.3);
    & span {
      font-size: 2.5rem;
      font-weight: 300;
      color: #fff;
    }
  }
  @media (min-width: 1260px) {
    .invoice-body {
      height: 100vh;
    }
  }
</style>