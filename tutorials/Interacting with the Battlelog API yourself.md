## How the API works
Alright, so basically it works like this, The API endpoints works parallel with the HTML pages we normaly see. We need to add something to make the server return JSON output. 

Alright, Add these headers.
```
X-Requested-With: XMLHttpRequest
X-AjaxNavigation: 1
```

So it would be like this:
```js
const axios = require('axios');

const res = await axios.get('https://battlelog.battlefield.com/bf3/user/Nefomemes',
{headers: {"X-Requested-With":"XMLHttpRequest", "X-AjaxNavigation":"1"}})

console.log(res)
```
