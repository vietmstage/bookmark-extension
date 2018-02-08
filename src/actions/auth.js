import axios from 'axios'
export const login = (email, password) => {
  return axios({
    method: 'POST',
    url: 'http://userkit-identity-stg.ap-southeast-1.elasticbeanstalk.com/v1/auth/signin',
    headers: {
      'Content-Type': 'application/json',
      'X-USERKIT-TOKEN': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0X2lkIjoiNTllMDNhYWEwYmY1Y2MxNTIwODJkY2E4In0.qgCtZ9FA7bPUCRpG4HR8ql0cF1tPssgzaJkMFjkac9U'
    },
    data: {
      email,
      password
    }
  }).then(result => {
    return result
  })
}