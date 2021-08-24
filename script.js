import http from 'k6/http';
import { sleep } from 'k6';

var generateRandomNumber = function() {
  var number = Math.random() * 3000000;
  return Math.ceil(number);
}

var generateRandomPostNumber = function() {
  var number = Math.random() * 1000000;
  return Math.ceil(number);
}
export let options = {
  vus: 1000,
  duration: '1s',
};

// export default function () {
//   var randomNumber = generateRandomNumber();
//   http.get(`http://3.101.59.23:80/api/qa/questions/${randomNumber}`);
//   sleep(1);
// }

// export default function () {
//   var randomNumber = generateRandomNumber();
//   http.put(`http://3.101.59.23:80/api/qa/questions/${randomNumber}/helpful`);
//   sleep(1);
// }

export default function () {
  var randomNumber = generateRandomPostNumber();
  var url = 'http://3.101.59.23:80/api/qa/questions/';
  var payload = JSON.stringify({
    body: 'aaa',
    name: 'bbb',
    email: 'test@test.com',
    product_id: randomNumber
  });

  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
}