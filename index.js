(async function() {
  const axios = require("axios");
  const fs = require("fs");
  /*
  const params = new URLSearchParams();
          params.append('redirect', '');
          params.append('submit', 'Sign in');
          params.append('email', process.env.EMAIL);
          params.append('password', process.env.PASSWORD);

          var res = await
  axios.post('https://battlelog.battlefield.com/bf3/gate', { params, headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

          delete res.data;

          console.log(res);

  */

  var authRes = await axios.get("http://battlelog.battlefield.com/bf3/forums", {
    headers : {
      "X-Requested-With" : "XMLHttpRequest",
      "X-AjaxNavigation" : "1",
    },
  });

  console.log(authRes.data);
})();

// .icon-danger
