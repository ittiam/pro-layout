/* eslint-disable max-params */
export function exportFile(data, filename, ext = 'xlsx', type = 'application/vnd.ms-excel') {
  let blob = new Blob([data], { type });
  if (window.navigator.msSaveBlob) {
    try {
      // ie浏览器自带下载文件的方法
      window.navigator.msSaveBlob(data, filename);
    } catch (e) {}
  } else {
    let elink = document.createElement('a');
    elink.download = filename + '.' + ext;
    elink.style.display = 'none';
    let href = window.URL.createObjectURL(blob);
    elink.href = href;
    document.body.appendChild(elink);
    elink.click();
    document.body.removeChild(elink);
    window.URL.revokeObjectURL(href); // 释放掉blob对象
  }
}
