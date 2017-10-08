<template>
  <v-layout class="log-entry" row nowrap>
    <v-flex class="entry-button" d-flex justify-center align-center>
      <v-btn fab dark small color="warning" v-if="log._id" class="col-1 remove-button" @click="deleteEntry()"><v-icon>remove</v-icon></v-btn>
      <v-btn fab dark small color="primary" v-if="!log._id" class="col-1 add-button" @click="addEntry()"><v-icon>add</v-icon></v-btn>
    </v-flex>
    <v-flex>
      <v-layout column nowrap>
        <v-layout row nowrap justify-space-between>
          <v-menu
            class="picker-input"
            lazy
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            v-model="dateMenu"
            :nudge-left="40"
            max-width="290px">
            <v-text-field
              slot="activator"
              label="Date"
              v-model="formattedDate"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="formattedDate" no-title scrollable actions>
                <template scope="{ save, cancel }">
                  <v-card-actions>
                    <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                    <v-btn flat primary @click.native="editEntry()">Save</v-btn>
                  </v-card-actions>
                </template>
              </v-date-picker>
          </v-menu>
          
          <v-menu
            class="picker-input"
            lazy
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            :nudge-left="40"
            @deactivated="editEntry()"
            v-model="startMenu"
          >
            <v-text-field
              slot="activator"
              label="Start Time"
              v-model="log.startTime"
              prepend-icon="access_time"
              readonly
              ref="startPicker"
              @focus="()=>$refs.startPicker.blur()"
            ></v-text-field>
            <v-time-picker v-model="log.startTime" autosave :allowed-minutes="[0,30,60]" format="24hr"></v-time-picker>
          </v-menu>

          <v-menu
            class="picker-input"
            lazy
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            :nudge-left="40"
            @deactivated="editEntry()"
            v-model="endMenu"
          >
            <v-text-field
              slot="activator"
              label="End time"
              v-model="log.endTime"
              prepend-icon="access_time"
              readonly
              ref="endPicker"
              @focus="()=>$refs.endPicker.blur()"
            ></v-text-field>
            <v-time-picker v-model="log.endTime" autosave :allowed-minutes="[0,30,60]" format="24hr"></v-time-picker>
          </v-menu>

          <v-flex class="duration-wrapper" d-flex justify-center align-center>
            <v-icon>timelapse</v-icon>
            <span>{{ log.duration || tempDuration || 0 }}</span>
          </v-flex>

        </v-layout>
        <v-layout row nowrap justify-start align-start>
            <v-text-field class="project-input" type="text" v-model="log.project" @change="editEntry()" placeholder="Project" prepend-icon="assignment"></v-text-field>
            <v-text-field class="ml-1" type="text" v-model="log.note" @change="editEntry()" placeholder="Note" prepend-icon="edit"></v-text-field>
        </v-layout>

      </v-layout>
      
    </v-flex>
    <!-- <v-divider light inset></v-divider> -->
  </v-layout>
</template>
<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';
  import { ILog } from '../../interfaces/log';
  import * as moment from 'moment';

  @Component
  export default class LogEntryItem extends Vue {
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
      this.actions.deleteLog(this.log);
    }

    addEntry() {
      this.actions.addLog(this.log).then(() => {
        this.$emit('newEntry');
      });
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
    padding: 6px 16px;
  }
  .add-button,
  .remove-button {
    height: 40px;
    max-width: 40px;
    margin-right: 4px;
  }
  .entry-button {
    width: 120px;
    margin-right: 16px;
  }
  .input-row {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 4px;
  }
  .form-control {
    margin-right: 8px;
  }
  .picker-input {
    margin-right: 20px;
  }
  .project-input {
    max-width: 208px;
    margin-right: 16px;
  }
  .duration-wrapper {
    min-width: 45px;
    & span {
      margin-left: 2px;
    }
  }
</style>