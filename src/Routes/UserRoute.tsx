import { useEffect, useState } from "react";
import { useAppDispatch } from "../Redux/app/hooks";
import { Navigate, useLocation } from "react-router-dom";
import { getUser, refreahAccessToken } from "../ApiGateways/users";
import { setLogOut, setUserState } from "../Redux/features/userSlice";
import { Box, CircularProgress, Typography } from "@mui/material";


const UserRoute = ({ children }: any) => {

    const dispatch = useAppDispatch();
    const location = useLocation();
    const [userLoaded, setUserLoaded] = useState(false);
    const [userData, setUserData] = useState<any>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [reset, setReset] = useState<boolean>(false);
    const [token, setToken] = useState<string>("");
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        const body = {
            refresh: localStorage.getItem('refresh-token')
        }
        refreahAccessToken(body,
            (data) => {
                setToken(data?.access);
            },
            res => console.log(res)
        )
    }, [reset])


    useEffect(() => {
        getUser(
            (data) => {

                dispatch(setUserState(data?.user));
                setUserData(data?.user);

                setUserLoaded(true);
            },
            (error) => {
                console.error(error);

                if (token !== '' && count < 5) {
                    localStorage.setItem('access-token', token);
                    setReset(!reset);
                    setToken("");
                }

                else if (token === '' && count < 5) {
                    setReset(!reset);
                }

                else {
                    setFetchError('No Internet, Please check connection');
                    setUserLoaded(true);
                }

                setCount(count + 1);

            }
        );
    }, [dispatch, children, reset]);


    if (fetchError) {
        dispatch(setLogOut());

        return (
            <div>
                <Typography variant="body1" color="error">
                    {fetchError}
                </Typography>
                <Navigate to="/login" state={{ from: location }} replace />;
            </div>
        );
    }

    if (!userLoaded) {
        return <Box sx={{ display: 'flex' }}>
            <div className=" w-full flex justify-center mt-[15vh]">
                <CircularProgress />
            </div>
        </Box>;
    }

    if (!userData?.email) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default UserRoute
