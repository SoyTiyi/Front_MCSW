
export const setHeaderOptions = (body) => {

  const options = {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: body
  }
  return options;
}
