import {atom} from "recoil"

const userDataAtom = atom({
    key: "userData",
    default: {
        username: null,
        isLoggedIn: false,
        token: null
    }
})

export default userDataAtom