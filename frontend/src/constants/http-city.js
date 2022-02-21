import axios from "axios";
import queryString from 'query-string';
import * as api from "./../constants/api";

export default function callApiCity(url, method = "GET", body) {
  return axios({
    method: method,
    url: url,
    data: body,
    headers: {
      "token": "f2459fa6-873f-11ec-913f-a2241d5a8154",
    },
  });
}

export function callQueryString(url, param) {
  return queryString.stringifyUrl({
    url,
    query: param,
    headers: {
      "token": "f2459fa6-873f-11ec-913f-a2241d5a8154",
    },
  });
}
