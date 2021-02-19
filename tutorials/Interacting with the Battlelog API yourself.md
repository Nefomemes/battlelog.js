## How the API works
Alright, so basically it works like this, The API endpoints works parallel with the HTML pages we normaly see. We need to add something to make the server return JSON output. 

Alright, add these headers.
```
X-Requested-With: XMLHttpRequest
X-AjaxNavigation: 1
```

Alright, so if I want to fetch my profile, it would be like this:
```js
const axios = require('axios');

const res = await axios.get('https://battlelog.battlefield.com/bf3/user/Nefomemes',
{headers: {"X-Requested-With":"XMLHttpRequest", "X-AjaxNavigation":"1"}})

console.log(res.data)
```

