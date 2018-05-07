import axios from 'axios'
export const login = (email, password) => {
  return axios({
    method: 'POST',
    url: 'https://userkit-identity.mstage.io/v1/auth/signin',
    headers: {
      'Content-Type': 'application/json',
      'X-USERKIT-TOKEN': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0X2lkIjoiNWFkODU4MjRiM2NlYzM0MTUzMDRhZWI2IiwiaWF0IjoxNTI0MTI5MTI2fQ.4HywQhdO-7LEEYcwrAsybLqBArgzHbD0sy2yScU2Rjk'
    },
    data: {
      email,
      password
    }
  }).then(result => {
    return result
  })
}

export const bookmark = (data) => {
  return axios({
    method: 'POST',
    url: 'http://hasbrain-api.mstage.io/bookmark',
    headers: {
      'Content-Type': 'application/json',
      'x-hasbrain-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhYjMzNzI1ZTZlOTFlMGNlMDk4OWRlNCIsImlhdCI6MTUxNjIzOTAyMn0.anJXLAhnRxz37NxmiKtzk76KBZCH1RQXV1DuQCy1wMc'
    },
    data
  }).then(result => {
    return result
  })
}