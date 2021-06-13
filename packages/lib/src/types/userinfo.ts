export type UserInfoType = {
    twitchUsername: string
    privacyFeedAndGameActivity: number,
    userId: string,/*
     introSectionBitmask: 48,
      feedHidden: false,
      pushSettings: -1,
      showDetails: false,
      forumSignature: null,
      locality: null,
      location: null,
      icon: 0,*/
      presentation: string,
      /*profileBlocked: 0,*/
      allowFriendRequests: boolean,
      showFriendsUI: boolean,
      gravatarHidden: boolean,
   /*   presencePrivacy: 0,*/
      presentationHidden: boolean,
      loginCounter: number,
      privacyShowFriends: number,
      forumSignatureHidden: boolean,
      name: string,
      age: number,
      /*birthdate: null,*/
      feedActive: boolean,
      lastLogin: number/*,
      privacyDetails: 2*/
    
  };