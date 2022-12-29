const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  console.log(res);
  return Promise.reject(`Ошибка ${res.status}`);
}

export default checkResponse;