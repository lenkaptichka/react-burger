const checkResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  } else {
    return res.json()
      .then((err) => Promise.reject(err))
  }
}

export default checkResponse;