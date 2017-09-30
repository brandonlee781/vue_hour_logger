import moment from 'moment';

export default function time(val: string) {
  return moment(val, 'HH:mm:ss').format('hh:mm a');
}