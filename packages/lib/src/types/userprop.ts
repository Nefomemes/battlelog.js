export type UserPropType = {
    username: string,
    userId: string,
    presence: {
        userId: string,
        updatedAt: number,
        presenceStates: boolean // 0
    },
    gravatarMd5: string
}