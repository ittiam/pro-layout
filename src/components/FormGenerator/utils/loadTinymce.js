import loadScript from "./loadScript";

let tinymceObj;

export default function loadTinymce(url, cb) {
  if (tinymceObj) {
    cb(tinymceObj);
    return;
  }

  loadScript(url, () => {
    // eslint-disable-next-line no-undef
    tinymceObj = tinymce;
    cb(tinymceObj);
  });
}
