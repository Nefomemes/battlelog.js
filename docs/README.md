## Installation

<details>

<summary><bold>Node.js</bold></summary>
<br/>

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
npm i https://gitlab.com/BLThunderstorm/battlelog.js.git
```

Or if you use Yarn:

```bash
yarn add https://gitlab.com/BLThunderstorm/battlelog.js.git
```

</details>
<details>
<summary>Browser</summary>

<br/>

First of all, you will need to get a CDN link. You can find a CDN link for this
library in pretty much any major CDN services, like
[JSDelivr](https://www.jsdelivr.com/package/npm/battlelog.js),
[UnPKG](https://unpkg.com/), and [GitCDN](https://gitcdn.link)

You can use two bundles, one is the development bundle (dist/bundle.dev.js) and
the minified production bundle (dist/bundle.prod.min.js)

Then you can of course paste the CDN link to your HTML app.

```html
<script src="Battlelog.js CDN link"></script>
```

For example using GitCDN:

```html
<script src="gitcdn.link/cdn/BLThunderstorm/battlelog.js/master/dist/bundle.prod.min.js"></script>
```

Secondly, Battlelog.js expects users install Axios as well. When you install Battlelog.js for Node.js environments (NPM/Yarn), Axios should get automatically installed. And of course `querystring` is a pre-installed library. But this isn't the case for browsers. You will have to manually add Axios into your HTML app.
| |
| ------- |
| If you are still developing the software/app taht uses this library. Do *not* use the production library.  |

Also, make sure Axios is loaded **before** BattlelogJS.

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<script src="Battlelog.js CDN link"></script>
```

</details>

## Running it

```js
const bl = require("battlelog.js");
var blClient = bl();

var bf3 = client.game("bf3");
var user = await bf3.users.fetch("Nefomemes");

console.log(user);
```
