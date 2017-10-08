<template>
  <div class="invoice">
    <div class="invoice-header">
      <div class="address">
        <div class="address-wrapper">
          <span class="name">Brandon Lee</span>
          <span class="street">5582 Windy Knoll Dr</span>
          <span class="city-st-zip">Loves Park IL, 61111</span>
          <span class="email">brandonlee781@gmail.com</span>
        </div>
      </div>
      <div class="info-wrapper">
        <h3>INVOICE</h3>
        <div class="info-box">
          <div class="date">DATE: {{ today }}</div>
          <div class="number"><span>INVOICE #</span><span>{{ invoiceNumber }}</span></div>
          <div class="customer">
            <div>
              <span>CUSTOMER ID</span>
              <span>1</span>
            </div>
            <span>STERLING DATABASES</span>
          </div>
        </div>
      </div>
    </div>
    <div class="invoice-body">
      <h4>Sterling Databases</h4>
      <table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th class="unit-price">UNIT PRICE</th>
            <th class="amount">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(project, key) in projects" :key="key">
            <td class="project-name">{{ key }}</td>
            <td>{{ project.reduce((acc, cur) => { return acc + cur.duration; }, 0) }}</td>
            <td class="unit-price">$25</td>
            <td class="amount">{{ '$' + ((project.reduce((acc, cur) => { return acc + cur.duration; }, 0)) * 25).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
      <div class="totals">
        <div class="subtotal">
          <span>SUBTOTAL</span>
          <span>${{ invoiceTotal.toFixed(2) }}</span>
        </div>
        <div class="tax">
          <span>TAX RATE</span>
          <span>$0.00</span>
        </div>
        <div class="total">
          <span>TOTAL</span>
          <span>${{ invoiceTotal.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import moment from 'moment';

@Component
export default class Invoice extends Vue {
  public projects = [];

  mounted() {
    if (this.$route.params.projects) {
      this.projects = JSON.parse(this.$route.params.projects);
    }
  }
  get today() {
    return moment().format('M/DD/YYYY');
  }
  get invoiceNumber() {
    const startDate = moment('06/15/2017', 'MM/DD/YYYY');
    return moment().diff(startDate, 'weeks');
  }
  get invoiceTotal() {
    let logs = [];
    
    Object.keys(this.projects).forEach((key, ind) => {
      this.projects[key].forEach((entry, ind) => {
        logs.push(entry);
      })
    });
    const hours = logs.reduce( (acc, cur) => { return acc + cur.duration; }, 0 )
    return hours * 25;
  }
}
</script>

<style lang="scss" scoped>
  $light-border: 1px solid rgba(0,0,0,0.1);
  @mixin flex-row-between() {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  .invoice {
    height: 100%;
    width: 100%;
  }
  .invoice-header {
    display: flex;
    flex-flow: row nowrap;
    height: 300px;
  }
  .address {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    
  }
  .address-wrapper {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: flex-start;
  }
  .name {
    font-size: 18px;
    font-weight: bold;
  }
  .info-wrapper {
    display: flex;
    flex-flow: column nowrap;
    margin-top: 50px;
    width: 275px;
  }
  .info-wrapper h3 {
    text-align: right;
    font-weight: bold;
  }
  .date {
    width: 100%;
    background: #999;
    color: #fff;
    font-weight: bold;
    text-align: left;
    padding: 2px 8px;
  }
  .customer,
  .number {
    @include flex-row-between();
    padding: 6px 8px;
    font-weight: bold;
    border: $light-border;
  }
  .customer {
    flex-flow: column nowrap;
  }
  .customer div {
    @include flex-row-between();
  }
  .customer span {
    text-align: left;
  }
  .invoice-body {
    display: flex;
    flex-flow: column;
    max-width: 80%;
    margin: 0 auto;
  }
  .invoice-body h4 {
    text-align: left;
    margin-left: 30px;
  }
  table {
    width: 100%;
    margin: 30px 24px;
    thead {
      background: #999;
      color: #fff;
      font-weight: bold;
      tr th {
        padding: 0 8px;
        border-right: 1px solid #fff;
      }
    }
    tbody {
      tr, tr td {
        border: $light-border;
      }
      tr td {
        padding: 6px 8px;
      }
    }
  }

  .project-name {
    text-align: left;
  }
  .unit-price {
    text-align: right;
  }
  .amount {
    text-align: right;
  }
  .totals {
    display: flex;
    flex-flow: column nowrap;
    align-self: flex-end;
    width: 30%;
  }
  .subtotal,
  .tax,
  .total {
    @include flex-row-between();
    font-weight: bold;
  }
  .subtotal {
    padding: 16px 4px;
    border-bottom: $light-border;
  }
  .tax {
    padding: 6px 4px;
    border-bottom: $light-border;
  }
  .total {
    padding: 6px 4px;
  }
</style>
