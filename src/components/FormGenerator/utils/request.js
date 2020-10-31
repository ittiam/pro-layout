function formatParams(object) {
  if (!object) {
    return "";
  }

  if (typeof object === "string") {
    return encodeURI(object);
  }

  var pieces = [];

  for (i in object) {
    if (object.hasOwnProperty(i)) {
      pieces.push(encodeURIComponent(i) + "=" + encodeURIComponent(object[i]));
    }
  }

  return pieces.join("&");
}

export default function requiest(params) {
  var _async = params.async;
  var method = params.method || "GET";

  if (_async === undefined) {
    _async = true;
  }

  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open(method, params.url, _async);
    xhr.onreadystatechange = function() {
      if (x.readyState == 4) {
        var status = x.status;
        if (status >= 200 && status < 300) {
          resolve(x.responseText, x.responseXML);
        } else {
          reject(status);
        }
      }
    };
    if (params.method == "POST") {
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    }
    xhr.send(params.data);
  });
}

export function get(params) {
  var query = formatParams(params.data);
  var sip = params.url.indexOf("?") > -1 ? "&" : "?";
  params.method = "GET";
  params.data = null;

  params.url = params.url + (query.length ? sip + query : "");
  ajax.send(params);
}

export function post(params) {
  var query = formatParams(params.data);
  params.method = "POST";
  params.data = query.join("&");
  ajax.send(params);
}
