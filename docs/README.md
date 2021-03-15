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

</details>
<details>
<summary>GitHub</summary>
<br/>

```bash
npm i Nefomemes/battlelog.js
```

Or if you use Yarn:

```
yarn add https://github.com/Nefomemes/battlelog.js.git
```

</details>
</details>

<details>

<summary>Browser</summary>

<br/>

First of all, you will need to get a CDN link. You can find a CDN link for this library in pretty much any major CDN services, like [JSDelivr](https://www.jsdelivr.com/package/npm/battlelog.js)

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

When running this code, it should print:

```js
User {
  gravatarEmailHash: '1f3a91144edb76fa883d94be70bd34cd',
  platoons: [[Platoon]],
  platoonFans: [[Platoon]],
  friends: [
   [User],
    [User]
  ],
  platoon: undefined,
  soldiers: SoldiersManager { cache: BattlelogMap(1) [Map] {'' => [Platoon]}, user: undefined },
  client: [GameClient],
  name: 'Nefomemes',
  friendCount: 2,
  veteranStatus: { status: 0, games: null },
  club: null,
  mutualFriends: [],
  blazeClubs: [],
  profiletab: 'view',
  blazeClubsLoaded: true,
  mutualFriendCount: null,
  friendStatus: 'NONE',
  usergames: [],
  isChatDisabled: false,
  userStatusMessage: {
    statusMessageChanged: 1607318234,
    preview: null,
    userId: '3307924356088947575',
    statusMessage: 'Hello there'
  },
  userinfo: {
    privacyFeedAndGameActivity: 2,
    twitchUsername: null,
    userId: '3307924356088947575',
    introSectionBitmask: 48,
    feedHidden: false,
    pushSettings: -1,
    showDetails: false,
    forumSignature: null,
    locality: null,
    location: null,
    icon: 0,
    presentation: '',
    profileBlocked: 0,
    allowFriendRequests: true,
    showFriendsUI: false,
    gravatarHidden: false,
    presencePrivacy: 0,
    presentationHidden: false,
    loginCounter: 140,
    privacyShowFriends: 2,
    forumSignatureHidden: false,
    name: null,
    age: null,
    birthdate: null,
    feedActive: false,
    lastLogin: 1614320260,
    privacyDetails: 2
  },
  username: 'Nefomemes',
  userId: '3307924356088947575',
  createdAt: 1604901587,
  presence: {
    userId: '3307924356088947575',
    updatedAt: 1614399204,
    presenceStates: '0'
  },
  activities: undefined
}
```
