import cookie from 'js-cookie';

export function setUserInfo(userInfo) {
  const arrUsers = Object.entries(userInfo);
  arrUsers.forEach((arritem) => {
    cookie.set(arritem[0], arritem[1]);
  });
  return true;
}

export function getUserInfo() {
  return {
    username: cookie.get('username'),
    appkey: cookie.get('appkey'),
    role: cookie.get('role'),
    email: cookie.get('email'),
  };
}

export function removeUserInfo() {
  cookie.remove('username');
  cookie.remove('appkey');
  cookie.remove('role');
  cookie.remove('email');
}
