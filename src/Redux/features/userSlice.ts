import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../utils/utils";


type UserState = {
    isLoggedIn: boolean;
    user: User
}

const initialState: UserState = {
    isLoggedIn: false,
    user: {
        id: '',
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        countryCode: '',
        countryInitial: 'BD',
        address: '',
        image_url: '',
        is_staff: false,
        is_superuser: false,
    }
}

const userSlice = createSlice({
    name: 'userState',
    initialState,
    reducers: {
        setUserState: (state, action) => {
            const data = action.payload;
            if (data.id) {
                state.isLoggedIn = true;
            }
            state.user.username = data.username;
            state.user.email = data.email;
            state.user.first_name = data.first_name;
            state.user.last_name = data.last_name;
            state.user.phone_number = data.phone_number;
            state.user.countryCode = data.countryCode;
            state.user.countryInitial = data.countryInitial;
            state.user.address = data.address;
            state.user.image_url = data.image_url;
            state.user.is_staff = data.is_staff;
            state.user.is_superuser = data.is_superuser;
        },
        setLogOut: () => {
            return initialState;
        }
    }
})

export const { setUserState, setLogOut } = userSlice.actions;

export default userSlice.reducer