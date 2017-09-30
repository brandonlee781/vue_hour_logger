import Vue from 'vue';
import Component from 'vue-class-component';
import * as moment from 'moment';
import Cookies, { CookiesStatic } from 'js-cookie';
import axios, { AxiosInstance } from 'axios';

import { IAuthCookie } from '../interfaces/authCookie';

@Component
export class BaseComponent extends Vue {
  api: AxiosInstance;
  cookie: IAuthCookie;

  constructor() {
    super();
    this.cookie = JSON.parse(Cookies.get('hourLoggerAuth'));
    this.api = axios.create({
      baseURL: 'https://www.branlee.me/api/v1',
      headers: { 'Authorization': 'Basic ' + this.cookie.code }
    })
  }
}