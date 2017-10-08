import * as moment from 'moment';

export default function date(val: string) {
  return moment(val, 'YYYY-MM-DD').format('MM/DD/YYYY');
}