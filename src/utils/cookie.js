export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    // console.log('exp && exp.toUTCString', exp, exp.toUTCString);
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  // console.log('updatedCookie', updatedCookie);
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    // console.log('propValue', propValue);
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
      // console.log('updatedCookie  propValue', updatedCookie += '=' + propValue);
    }
  }
  document.cookie = updatedCookie;
  // console.log('updatedCookie111', updatedCookie);

};

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}
