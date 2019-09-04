export default function ({ $axios, redirect }) {
  let token = localStorage.getItem('authentication');

    $axios.onRequest(config => {
        config.headers.common['Authorization'] = `Bearer ${token}`;
    })
  
    $axios.onError(error => {
      const code = parseInt(error.response && error.response.status)
      if (code === 400) {
        redirect('/400')
      }
    });
  }