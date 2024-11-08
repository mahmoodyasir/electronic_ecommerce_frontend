import { useState } from "react";
import { TextField, Button, Typography, Box, InputAdornment, IconButton, CssBaseline, createTheme } from "@mui/material";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import './RegisterUser.css'
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
    palette: {
        primary: {
            main: '#4f46e5', // Tailwind 'indigo-600'
        },
        secondary: {
            main: '#f43f5e', // Tailwind 'rose-500'
        },
    },
});

const RegisterUser = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [countryCode, setCountryCode] = useState('+880')
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = (event: any) => {
        event.preventDefault();
        const final_phone = countryCode + phone
        console.log("Registering with:", { firstName, lastName, final_phone, email, password });
    };


    return (
        <form onSubmit={handleRegister}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                    <Box className="w-full max-w-lg p-8 mx-2 mt-[-2rem] bg-white bg-opacity-80 rounded-3xl shadow-xl backdrop-filter backdrop-blur-lg">
                        <Typography variant="h4" className="text-center font-bold text-gray-800 mb-6">
                            Create Account
                        </Typography>


                        <TextField
                            required
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="mb-4"
                        />


                        <TextField
                            required
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="mb-4"
                        />


                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="mb-4"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneInput
                                            international
                                            defaultCountry="BD"
                                            value={countryCode}
                                            onChange={(value) => {
                                                setCountryCode(value as string);
                                            }}
                                            className="w-full"
                                        />

                                        <span>{countryCode}</span>
                                    </InputAdornment>

                                ),
                            }}
                        />


                        <TextField
                            required
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mb-4"
                        />


                        <TextField
                            required
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mb-6"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />


                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            className="py-3 font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 ease-in-out"
                            type="submit"
                        >
                            Sign Up
                        </Button>

                        <div className="flex justify-between mt-4 text-sm text-gray-600">
                            <Typography onClick={() => { navigate('/login') }} variant="body2" className="cursor-pointer hover:underline">
                                Already have an account? Log In
                            </Typography>
                        </div>
                    </Box>
                </Box>
            </ThemeProvider>
        </form>
    );
};

export default RegisterUser;
