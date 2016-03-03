var moment = require('moment');

var now = moment();

// console.log(now.format());
// console.log(now.format('X'));
console.log(now.valueOf());
console.log(now.format('h:mm a'));

var timestampMoment = moment.utc(now.valueOf());
console.log(timestampMoment.format('h:mm a'));
console.log(timestampMoment.local().format('h:mm a'));