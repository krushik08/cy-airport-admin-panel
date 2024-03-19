import axios from 'axios';
const BASE_URL = 'http://localhost:3001';
function encodeQueryString(obj) {
  var str = [];
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  }
}
const ApiService = {
  request(url, method, params, header) {
    let apiUrl = `${url}`;
    if (method.toLowerCase() === 'get') {
      if (params) {
        apiUrl = `${url}?${encodeQueryString(params)}`;
      } else {
        apiUrl = `${url}`;
      }
    }
    let reqOptions = {
      method: method,
      url: `${BASE_URL}/${apiUrl}`,
      data: params,
      header: {
        ...header,
      },
    };
    return axios(reqOptions)
      .then((response) => {
        return response.data;
      })
      .catch(function (err) {
        console.log('error', err);
      });
  },
};
export default ApiService;
