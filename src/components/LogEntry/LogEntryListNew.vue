<template>
  <v-form v-model="valid" ref="form" class="text-xs-center">
    <v-menu
      content-class="new-entry-menu"
      lazy
      offset-x
      :close-on-content-click="false"
      :nudge-top="10"
      v-model="menu"
      :z-index="5"
    >
      <v-btn class="entry-list-new" icon large light slot="activator">+</v-btn>
      <v-card class="new-entry-card">

        <v-list class="blue lighten-1">
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title class="white--text">NEW LOG ENTRY</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs-12 sm6>
                <v-select
                  v-bind:items="projects"
                  v-model="newProject"
                  label="Projects"
                  single-line
                  prepend-icon="folder_open"
                  required
                  :rules="projectRules"
                ></v-select>
              </v-flex>
              <v-flex xs-12 sm6>
                <app-date-picker :required="true" :date="entry.date" @dateChange="dateChange"/>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs-12 sm6>
                <app-time-picker :required="true" @timeChange="startTime"/>
              </v-flex>
              <v-flex xs-12 sm6>
                <app-time-picker :required="true" @timeChange="endTime"/>
              </v-flex>
            </v-layout>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="entry.note" placeholder="Notes" prepend-icon="description" required :rules="notesRules"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="menu = false">Cancel</v-btn>
          <v-btn color="primary" flat @click="saveEntry()">Save</v-btn>
        </v-card-actions>

      </v-card>

    </v-menu>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';
import VForm from 'vuetify/es5/components/VForm';
import moment from 'moment';
import AppDatePicker from '../AppDatePicker.vue';
import AppTimePicker from '../AppTimePicker.vue';

@Component({
  components: {
    'app-date-picker': AppDatePicker,
    'app-time-picker': AppTimePicker,
  }
})
export default class LogEntryListNew extends Vue {
  @Prop() selectedItem;
  menu: boolean = false;
  valid: boolean = false;
  entry = {
    project: null,
    date: null,
    startTime: null,
    endTime: null,
    note: null,
  };
  $refs: {
    form: VForm
  }
  projectRules = [
    (v) => !!v || 'Project is required'
  ]
  notesRules = [
    (v) => !!v || 'Notes are required'
  ]

  get newProject() {
    if (this.selectedItem.title !== 'Recent Log Entries') {
      return this.selectedItem.title;
    } else {
      return '';
    }
  }
  set newProject(val) {
    this.entry.project = val;
  }
  get projects() {
    return this.$store.getters['project/getProjects'].map(p => p.name);
  }

  dateChange(val) {
    this.entry.date = moment(val, 'YYYY-MM-DD').format('MM/DD/YYYY');
  }
  startTime(val) {
    this.entry.startTime = val;
  }
  endTime(val) {
    this.entry.endTime = val;
  }
  saveEntry() {
    this.entry.project = this.entry.project === '' ? this.newProject : this.entry.project;

    if (this.$refs.form.validate()) {
      this.$store.dispatch('log/ADD_NEW_LOG', this.entry).then((data) => {
        this.menu = false;
      })
    }

  }
  @Watch('menu')
  menuToggle() {
    this.entry = { project: '', date: '', startTime: null, endTime: null, note: '' };
  }
  @Watch('selectedItem')
  log() {
    console.log(this.selectedItem)
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/app-colors.scss';
$arrowSize: 32px;
.entry-list-new {
  color: #000 !important;
  font-size: 5em;
  font-weight: 100;
}
.new-entry-menu {
  overflow: auto !important;
}
.new-entry-card:after {
  content:"";
  position:absolute;
  top: 0;
  right: -32px;
  border-top: $arrowSize solid transparent;
  border-bottom: $arrowSize solid transparent;
  border-left: $arrowSize solid #42a5f5;
  z-index: 4;
}
</style>
