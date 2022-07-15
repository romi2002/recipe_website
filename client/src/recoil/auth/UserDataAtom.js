import {atom} from "recoil"
import Auth from "../../api/auth"

const localStorageEffect = key => ({setSelf, onSet}) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
        const userData = JSON.parse(savedValue)
        Auth.validateToken(userData.token).then((ret) => {
            if(ret.data.validToken){
                setSelf(userData);
            }
        })
    }

    onSet((newValue, _, isReset) => {
        isReset
            ? localStorage.removeItem(key)
            : localStorage.setItem(key, JSON.stringify(newValue));
    });
};


const userDataAtom = atom({
    key: "userData",
    default: {
        username: null,
        isLoggedIn: false,
        token: null
    },
    effects: [
        localStorageEffect('user_data')
    ]
})

export default userDataAtom