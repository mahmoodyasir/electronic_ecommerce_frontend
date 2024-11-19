import { TextField, InputAdornment } from "@mui/material"
import PhoneInput from "react-phone-number-input";
import { CountryCode, UserData } from "../../utils/utils";
import React from "react";


type BasicInfoProps = {
    userData: UserData;
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}


const BasicInfo = (props: BasicInfoProps) => {

    const { userData, setUserData } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <React.Fragment>

            <section className="flex gap-2 flex-col gap-y-3 md:flex-row">
                {/* First Name */}
                <TextField
                    fullWidth
                    label="First Name"
                    name="first_name"
                    value={userData.first_name}
                    onChange={handleChange}
                    variant="outlined"
                    required
                />

                {/* Last Name */}
                <TextField
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    value={userData.last_name}
                    onChange={handleChange}
                    variant="outlined"
                    required
                />
            </section>

            <section className="flex gap-2 flex-col space-y-4 md:space-y-0 md:flex-row">
                {/* Email */}
                <TextField
                    disabled
                    fullWidth
                    label="Email"
                    name="email"
                    value={userData.email}
                    // onChange={handleChange}
                    type="email"
                    variant="outlined"
                    required
                />

                {/* Phone Number */}
                <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    name="phone_number"
                    value={userData.phone_number}
                    onChange={handleChange}
                    className="mb-4"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PhoneInput
                                    international
                                    defaultCountry={userData?.countryInitial}
                                    value={userData?.countryCode}
                                    onChange={(value) => {
                                        setUserData({ ...userData, countryCode: value as string })
                                    }}
                                    onCountryChange={(country: CountryCode) => {
                                        console.log(country)
                                        setUserData({ ...userData, countryInitial: country })
                                    }}
                                    className="w-full"
                                />

                                <span>{userData?.countryCode}</span>
                            </InputAdornment>

                        ),
                    }}
                />

            </section>


            {/* Address */}
            <TextField
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={4}
                value={userData.address}
                onChange={handleChange}
                variant="outlined"
                required
            />
        </React.Fragment>
    )
}

export default BasicInfo
