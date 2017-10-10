<template>
  <v-menu
    class="time-wrapper"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    :nudge-left="40"
    :z-index="10"
    max-width="290px">
    <v-text-field
      slot="activator"
      label="Select Time"
      v-model="thisTime"
      prepend-icon="access_time"
      readonly
      :required='required'
      :rules="timeRules"
    ></v-text-field>
    <v-time-picker 
      v-model="thisTime"
      :allowed-minutes="[0, 30, 60]"
      format="24hr"
      autosave 
      no-title 
      scrollable></v-time-picker>
  </v-menu>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';
import moment from 'moment';

@Component
export default class AppTimePicker extends Vue {
  @Prop() required: boolean;
  thisTime: string = null;
  timeRules = [
    (v) => !!v || 'Time is required',
    (v) => moment(v, 'HH:mm').isValid() || 'Invalid Time'
  ]

  @Watch('thisTime')
  timeChange(val: string) {
    this.$emit('timeChange', val);
  }
}
</script>

<style lang="scss" scoped>
</style>
