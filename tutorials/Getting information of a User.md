```js

const bl = require("battlelog.js");
var blClient = bl();

var bf3 = client.game('bf3');
var user = await bf3.users.fetch( "DANNYonPC");

console.log(user);

```

When running this code, it should print:

```js
User {
      userId: '',
      username: '',
      platoons: [],
      platoonFans: [],
      friends: []
    }
```
