type TProps = {
  expires?: Date | string | number
}

export function setCookie(name: string, value: string | null, props: TProps): void {
  props = props || {};
  let exp = props.expires;
  if (exp && typeof exp === 'number') {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && typeof exp !== 'number' && typeof exp !== 'string' &&  exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  if (value) {
    value = encodeURIComponent(value);
  }
  let updatedCookie = name + '=' + value;
  
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName as keyof TProps];
    if (Boolean(propValue) !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
};

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    // TODO Это стандартная функция для работы с куки
    // eslint-disable-next-line
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export function deleteCookie(name: string): void {
  setCookie(name, null, { expires: -1 });
}
