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
install it trough GitHub.

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
var user = await bf3.users.fetch( "Nefomemes");

console.log(user);

```

When running this code, it should print:

```js
User {
  gravatarEmailHash: '1f3a91144edb76fa883d94be70bd34cd',
  platoons: [
    Platoon {
      badge: [Object],
      website: '',
      memberCounter: 2,
      name: true,
      creatorId: '3307924356088947575',
      flag: '',
      game: 2,
      allowNewMembers: true,
      platform: 1,
      fans: [Array],
      tag: 'NATF',
      members: [Object],
      fanCounter: 1,
      blazeClubId: 1337,
      hidden: false,
      creationDate: 1613001600,
      presentation: 'Hi! Welcome to the No Anime Task Force. \r\n' +
        'This is a satirical platoon that basically, "No Anime".\r\n' +
        '\r\n' +
        "Well that's it, and remember guys- no anime.",
      id: '3307924585601482205',
      icon: ''
    }
  ],
  platoonFans: [
    Platoon {
      badge: [Object],
      website: '',
      memberCounter: 2,
      name: true,
      creatorId: '3307924356088947575',
      flag: '',
      game: 2,
      allowNewMembers: true,
      platform: 1,
      fans: [Array],
      tag: 'NATF',
      members: [Object],
      fanCounter: 1,
      blazeClubId: 1337,
      hidden: false,
      creationDate: 1613001600,
      presentation: 'Hi! Welcome to the No Anime Task Force. \r\n' +
        'This is a satirical platoon that basically, "No Anime".\r\n' +
        '\r\n' +
        "Well that's it, and remember guys- no anime.",
      id: '3307924585601482205',
      icon: ''
    }
  ],
  friends: [
    User {
      gravatarEmailHash: '94be45afafb1be267934a7f1e8c7b25b',
      platoons: BattlelogMap(0) [Map] {},
      platoonFans: BattlelogMap(0) [Map] {},
      friends: BattlelogMap(0) [Map] {},
      platoon: undefined,
      soldiers: [SoldiersManager],
      client: [GameClient],
      userId: '3370545246938073741',
      username: 'RealP3nguin',
      createdAt: 1609147362,
      presence: [Object]
    },
    User {
      gravatarEmailHash: undefined,
      platoons: BattlelogMap(0) [Map] {},
      platoonFans: BattlelogMap(0) [Map] {},
      friends: BattlelogMap(0) [Map] {},
      platoon: undefined,
      soldiers: [SoldiersManager],
      client: [GameClient],
      userId: '3307924270281690415',
      username: 'Rakhonshm',
      createdAt: 1607789245,
      presence: [Object]
    }
  ],
  platoon: undefined,
  soldiers: SoldiersManager { cache: BattlelogMap(0) [Map] {}, user: undefined },
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
