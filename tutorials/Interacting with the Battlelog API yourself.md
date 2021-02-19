

## How the API works
Alright, so basically it works like this, The API endpoints works parallel with the HTML pages we normaly see. So we need to add something to make the server return JSON output. 

Alright, let's try adding these headers.
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

And alright, we can rut it in RunKit. [Click here if you want to take a look](https://runkit.com/nefomemes/axios-battlelog-api-user). [You can run it in Replit aswell tho.](https://repl.it/@Nefomemes/axios-battlelog-api-user#index.js)

## Endpoints

This is not the scope of this tutorial. But in the future I will try to document Battlelog API and stuff.
