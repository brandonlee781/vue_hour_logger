<template>
  <!-- <b-button variant="primary">Login</b-button> -->
  <div>
    {{ text }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import axios, { AxiosInstance } from 'axios';
import * as Cookies from 'js-cookie';

@Component
export default class Login extends Vue {
  private api: AxiosInstance;
  public text: string = '';

  constructor() {
    super();
    this.api = axios.create({
      baseURL: 'https://www.branlee.me',
    })
  }

  mounted() {
    const query = new URLSearchParams(window.location.search)
    const accessCode = query.get('accessCode');
    if (accessCode) {
      this.api.get('login', {
        params: {
          accessCode: accessCode
        }
      })
      .then(res => {
        Cookies.set('hourLoggerAuth', res.data);
        this.text = 'You are now logged in.';
      })
      .catch(err => {
        window.location.href = 'http://localhost:8080/login';
      })
    } else {
      this.api.get('access')
        .then(res => {
          if (res.status === 200) {
            this.text = 'Check your email.';
          }
        })
        .catch(err => {
          console.error(err);
        })
    }
  }
}
</script>

<style scoped>

</style>
