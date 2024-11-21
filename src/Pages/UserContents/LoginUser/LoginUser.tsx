import { useState } from 'react';
import { TextField, IconButton, InputAdornment, Typography, Box, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../Redux/app/hooks';
import { loginUser } from '../../../ApiGateways/users';
import { setUserState } from '../../../Redux/features/userSlice';
import { snackBarDataType } from '../../../utils/utils';
import GlobalSnackbar from '../../../component/GlobalSnackbar/GlobalSnackbar';

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

const LoginUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [snackbarState, setSnackbarState] = useState<snackBarDataType>({
        isActive: false,
        verticalPosition: 'top',
        horizontalPosition: 'center',
        message: '',
        alertType: 'success'
    });

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleLogin = (event: any) => {
        event.preventDefault();

        const body = {
            email: email,
            password: password
        }

        loginUser(body,
            (data) => {
                dispatch(setUserState(data?.user));
                localStorage.setItem('access-token', data.tokens?.access);
                localStorage.setItem('refresh-token', data.tokens?.refresh);

                setSnackbarState({
                    isActive: true,
                    verticalPosition: 'top',
                    horizontalPosition: 'center',
                    message: 'Login successful!',
                    alertType: 'success'
                });

                if (from === '/') navigate('/');
                else navigate(from, { replace: true });
            },
            (res) => {
                console.log(res);
                setSnackbarState({
                    isActive: true,
                    verticalPosition: "top",
                    horizontalPosition: "center",
                    message: res?.error,
                    alertType: "error"
                });
            }
        )
    };

    return (
        <form onSubmit={handleLogin}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                    <Box className="w-full max-w-lg p-8 mx-2 mt-[-2rem] bg-white bg-opacity-80 rounded-3xl shadow-xl backdrop-filter backdrop-blur-lg">
                        <Typography variant="h4" className="text-center font-bold text-gray-800 mb-6">
                            Welcome Back
                        </Typography>
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mb-4"
                            InputProps={{
                                classes: {
                                    root: 'rounded-lg',
                                },
                            }}
                        />
                        <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mb-6"
                            InputProps={{
                                classes: {
                                    root: 'rounded-lg',
                                },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowPassword} edge="end">
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
                            type='submit'
                        >
                            Log In
                        </Button>
                        <div className="flex justify-between mt-4 text-sm text-gray-600">
                            <Typography variant="body2" className="cursor-pointer hover:underline">
                                Forgot Password?
                            </Typography>
                            <Typography onClick={() => { navigate('/register') }} variant="body2" className="cursor-pointer hover:underline">
                                Sign Up
                            </Typography>
                        </div>
                    </Box>
                </Box>
            </ThemeProvider>

            {snackbarState.isActive && (
                <GlobalSnackbar
                    verticalPosition={snackbarState.verticalPosition}
                    horizontalPosition={snackbarState.horizontalPosition}
                    message={snackbarState.message}
                    alertType={snackbarState.alertType}
                    onfinish={() => {
                        setSnackbarState({ ...snackbarState, isActive: false });
                    }}

                />
            )}
        </form>
    );
};

export default LoginUser;
