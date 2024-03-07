import moment from 'moment-timezone';

const defaultTimeZone = 'Europe/Istanbul';

moment.tz.setDefault(defaultTimeZone);

const nowDate = () => moment();

const nowDateWithToDate = () => moment().toDate();

export { nowDate, nowDateWithToDate };
