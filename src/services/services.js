async function comFetch (url, params) {
  let data = params;
  let list = await fetch(url, {
    method: 'POST',
    body: data,
    headers: {'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'application/json;charset=UTF-8'},
    credentials: 'same-origin'
  });
  let result = await list.json();
  return result
}

export function queryTimeChart (params) {
  return comFetch('/pmv-web/metric/querySimpleMetrics', params)
}
