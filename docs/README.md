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

First of all, you will need to get a CDN link. You can find a CDN link for this
library in pretty much any major CDN services, like
[JSDelivr](https://www.jsdelivr.com/package/npm/battlelog.js),
[UnPKG](https://unpkg.com/), and [GitCDN](https://gitcdn.link)

You can use two bundles, one is the development bundle (dist/bundle.dev.js) and the
minified production bundle (dist/bundle.prod.min.js)

Then you can of course paste the CDN link to your HTML file.

```html
<script src="Battlelog.js config file"></script>
```

Secondly, Battlelog.js expects users to install Axios as well. When you install Battlelog.js on NPM, you also automatically install Axios as well. But this isn't the case for browsers. You will have to add 

</details>

## Running it

```js
const bl = require("battlelog.js");
var blClient = bl();

var bf3 = client.game("bf3");
var user = await bf3.users.fetch("Nefomemes");

console.log(user);
```
