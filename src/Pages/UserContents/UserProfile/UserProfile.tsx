import { useState } from "react";
import { TextField, Button, Typography, Avatar, IconButton, InputAdornment } from "@mui/material";
import { Cancel, PhotoCamera } from "@mui/icons-material";
import PhoneInput from "react-phone-number-input";
import { useAppDispatch, useAppSelector } from "../../../Redux/app/hooks";
import { CountryCode } from "../../../utils/utils";
import { updateUser } from "../../../ApiGateways/users";
import { setUserState } from "../../../Redux/features/userSlice";


type UserData = {
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    countryCode: string;
    countryInitial: CountryCode;
    address: string;
    image_url: string | null;
}


const UserProfile = () => {

    const user = useAppSelector((state) => state.userState.user);
    const dispatch = useAppDispatch();

    const [userData, setUserData] = useState<UserData>({
        email: user?.email || "",
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        phone_number: user?.phone_number || "",
        countryCode: user?.countryCode || "+880",
        countryInitial: user?.countryInitial || "BD",
        address: user?.address || "",
        image_url: user?.image_url || null,
    });


    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };


    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            console.log(file)
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();

        Object.entries(userData).forEach(([key, value]) => {
            if (value !== null) {
                formData.append(key, value);
            }
        });

        if (selectedFile) {
            formData.append("image", selectedFile);
        }

        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        updateUser(formData,
            (data) => {
                if (selectedFile) {
                    setUserData({ ...userData, image_url: URL.createObjectURL(selectedFile) || null });
                    dispatch(setUserState({ ...data?.data, image_url: URL.createObjectURL(selectedFile) || null }));
                }
                else {
                    dispatch(setUserState(data?.data));
                }
            },
            (res) => console.log(res)
        )
    };



    return (
        <div className="flex justify-center items-cente py-2">
            <div className=" bg-transparent p-8 w-full ">
                <Typography variant="h5" className="text-center mb-6 font-bold">
                    Edit Profile
                </Typography>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Profile Picture */}
                    <div className="flex justify-center mb-4">
                        <Avatar
                            src={userData?.image_url || "https://via.placeholder.com/150"}
                            alt="Profile Picture"
                            className="w-24 h-24"
                        />
                    </div>
                    <div className="flex items-center justify-center mb-4">
                        <input
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="profile-image-upload"
                            type="file"
                            onChange={handleImageUpload}
                        />
                        <label htmlFor="profile-image-upload">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>

                        {
                            selectedFile &&
                            <section className="flex items-center gap-2">
                                <Typography>{selectedFile?.name || ""}</Typography>
                                <span id="temp-image-user">
                                    <img
                                        src={URL.createObjectURL(selectedFile)}
                                        alt="Selected"
                                        className="w-8 h-8"
                                    />
                                </span>
                                <IconButton
                                    onClick={() => setSelectedFile(null)}
                                    className=" text-red-500 hover:bg-red-200"><Cancel /></IconButton>
                            </section>
                        }
                    </div>

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
                                                console.log(value)
                                                // setCountryCode(value as string);
                                                setUserData({ ...userData, countryCode: value as string })
                                            }}
                                            onCountryChange={(country) => {
                                                console.log(country)
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

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className="mt-4"
                    >
                        Save Changes
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default UserProfile;
