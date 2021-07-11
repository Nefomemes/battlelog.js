<div>
  <h1 align=center>BattlelogJS</h1>
  <p align=center>The leading API library for Battlefield Battlelog</p>
  
</div>

---

<div><b>
  <p align=center>✅ Written in Typescript</p>
  <p align=center>✅ Cache support</p>
  <p align=center>✅ Cross-platform (excluding Deno)</p>
  </b>
  </div>
  
---

## Example usage

```ts
import { BattlelogClient } from "battlelog.js";

let battlelog = new BattlelogClient();
// Can be 'bf3', 'bf4', 'bfh', or 'mohw'
let bf3 = battlelog.game("bf3");

let user = await bf3.fetchUser("Nefomemes");

console.log(user); // Logs the User to the console.
```

<br/> <div> <p align="center">Made with ❤ by <a href="https://github.com/Nefomemes">Nefomemes</p></p> </div>
