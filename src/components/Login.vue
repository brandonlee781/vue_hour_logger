<template>
  <div class="login-wrapper">
    <b-card title="Login"
          tag="article"
          style="max-width: 20rem;"
          class="login-card">
      <p class="card-text">
        {{ text }}
      </p>
      <b-button variant="primary" @click="login()">Login</b-button>
    </b-card>
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
      baseURL: 'https://www.branlee.me/api/v1',
    })
  }

  mounted() {
    const accessCode = window.location.href.split('accessCode=')[1];
    if (accessCode) {
      this.api.get('/login', {
        params: {
          accessCode: accessCode
        }
      })
      .then(res => {
        Cookies.set('hourLoggerAuth', res.data);
        this.text = 'You are now logged in.';
      })
      .catch(err => {
        window.location.href = 'https://www.branlee.me/work/#/login';
      })
    } 
  }
  login() {
    this.api.get('/access')
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
</script>

<style lang="scss" scoped>
  .login-wrapper {
    height: 100%;
    width: 100%;
    .login-card {
      margin: 0 auto;
    }
  }
</style>
