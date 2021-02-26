## Installation

<details>

<summary><bold>Node.js</bold></summary>
<br/>

If you are installing battlelog.js in a Node.js environment:

<details>

  <summary>NPM (not yet available)</summary>
<br/>
If you want to install this trough the NPM registry.

```bash
npm i battlelog.js
```

Or if you use Yarn:

```bash
yarn add battlelog.js
```

Note that this library isn't available on NPM yet. But in the mean time, you can
install it trought GitHub.

</details>
<details>
<summary>Installing trough GitHub</summary>
<br/>
  
```bash
npm i Nefomemes/battlelog.js
```

Or if you use Yarn:

```
yarn add https://github.com/Nefomemes/battlelog.js.git
```

(I'm not quite sure whether this is right lol)

</details>
</details>

<details>

<summary>Browser</summary>

</details>


## Running it

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
}
```
