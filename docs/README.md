## Installation

<details>

<summary><bold>Node.js</bold></summary>
<br/>

If you are installing battlelog.js in a Node.js environment:


If you want to install this trough the NPM registry.

```bash
npm i battlelog.js
```

Or if you use Yarn:

```bash
yarn add battlelog.js
```

You can even install it from GitHub:

```bash
npm i Nefomemes/battlelog.js
```

Or if you use Yarn:

```
yarn add https://github.com/Nefomemes/battlelog.js.git
```

</details>
<details>
<summary>Browser</summary>

<br/>

First of all, you will need to get a CDN link. You can find a CDN link for this library in pretty much any major CDN services, like [JSDelivr](https://www.jsdelivr.com/package/npm/battlelog.js), [UnPKG](https://unpkg.com/), and [GitCDN](https://gitcdn.link)

You can use two bundles, one is the Production bundle (dist/bundle.js) and the minified Production bundle (dist/bundle.min.js)

Note that due to [#67](https://github.com/Nefomemes/battlelog.js/issues/67), the production bundle is unusable. Please uae the development bundle instead.

</details>

## Running it

```js
const bl = require("battlelog.js");
var blClient = bl();

var bf3 = client.game("bf3");
var user = await bf3.users.fetch("Nefomemes");

console.log(user);
```
