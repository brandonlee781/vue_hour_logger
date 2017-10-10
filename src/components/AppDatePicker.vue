<template>
  <v-menu
    class="date-wrapper"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    :nudge-left="40"
    :z-index="10"
    max-width="290px">
    <v-text-field
      slot="activator"
      label="Select Date"
      v-model="thisDate"
      prepend-icon="event"
      readonly
      :required="required"
      :rules="dateRules"
    ></v-text-field>
    <v-date-picker v-model="thisDate" autosave no-title scrollable></v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';
import moment from 'moment';

@Component
export default class AppDatePicker extends Vue {
  @Prop() required: boolean;
  @Prop() date: string | Date;
  thisDate: string | Date = null;
  dateRules = [
    (v) => !!v || 'Date is required',
    (v) => moment(v, 'YYYY-MM-DD').isValid() || 'Invalid Date'
  ]

  @Watch('thisDate')
  dateChange(val: string) {
    this.$emit('dateChange', val);
  }

  mounted() {
    if (this.date) {
      this.thisDate = this.date;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
