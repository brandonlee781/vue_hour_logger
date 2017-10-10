<template>
  <div>
    <v-menu
      content-class="new-entry-menu"
      lazy
      offset-x
      :close-on-content-click="false"
      :nudge-top="10"

      v-model="menu"
      :z-index="5"
    >
      <v-btn class="filter-btn" icon large light slot="activator"><v-icon>filter_list</v-icon></v-btn>
      
      <v-card class="filter-card">

        <v-card-text class="filter-card-text">
          <v-layout row nowrap>
            <v-layout class="startDate-picker" column nowrap>
              <v-text-field readonly v-model="fromDate" label="Start Date"></v-text-field>
              <v-date-picker class="startDate-picker" v-model="fromDate" no-title></v-date-picker>
            </v-layout>
            <v-layout class="endDate-picker" column nowrap>
              <v-text-field readonly v-model="toDate" label="End Date"></v-text-field>
              <v-date-picker v-model="toDate" no-title></v-date-picker>
            </v-layout>
          </v-layout>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="menu = false">Cancel</v-btn>
          <v-btn color="primary" flat @click="filterLogs()">Save</v-btn>
        </v-card-actions>

      </v-card>

    </v-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';
import moment from 'moment';
import AppDatePicker from '../AppDatePicker.vue';

@Component({
  components: {
    'app-date-picker': AppDatePicker,
  }
})
export default class InvoiceBodyFilter extends Vue {
  menu: boolean = false;
  fromDate: Date | string = null;
  toDate: Date | string = null;

  filterLogs() {
    this.$emit('filterLogs', { startDate: this.fromDate, endDate: this.toDate });
    this.menu = false;
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/app-colors.scss';
$arrowSize: 32px;
.filter-btn{
  color: #000 !important;
  font-size: 5em;
  font-weight: 100;
}
.new-entry-menu {
  overflow: auto !important;
}
.filter-card:after {
  content:"";
  position:absolute;
  top: 0;
  right: -32px;
  border-top: $arrowSize solid transparent;
  border-bottom: $arrowSize solid transparent;
  border-left: $arrowSize solid #42a5f5;
  z-index: 4;
}
.startDate-picker {
  margin-right: 8px;
}
</style>