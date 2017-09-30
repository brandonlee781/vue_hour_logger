import * as moment from 'moment';

export default function date(val: string) {
  return moment(val).format('MM/DD/YYYY');
}