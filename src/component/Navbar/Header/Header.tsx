import React, { useContext, useState } from "react";

import { AiOutlineHome, AiOutlineMenu } from "react-icons/ai";
import { FiShoppingBag } from "react-icons/fi";
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Avatar, Badge, Button, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";
import { AccountCircle, ShoppingBasket, ShoppingCartOutlined } from "@mui/icons-material";
import SearchBar from "../SearchBar/SearchBar";
import { Context } from "../../../state/Provider";
import { useNavigate } from "react-router-dom";
import logo from '../../../static/images/cpu.png'
import { useAppDispatch, useAppSelector } from "../../../Redux/app/hooks";
import { stringToColor } from "../../../utils/utils";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LogoutIcon from '@mui/icons-material/Logout';
import { setLogOut } from "../../../Redux/features/userSlice";


const Header = () => {

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userState.user);
  const cartState = useAppSelector((state) => state.cartState);
  const isLoggedIn = useAppSelector((state) => state.userState.isLoggedIn);

  const { searchDrawer, setSearchDrawer, } = useContext(Context);

  const [isMenu, setIsMenu] = useState(false);
  const [isProfile, setIsProfile] = useState(false);

  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setSearchDrawer(newOpen);
  };

  const totalQuantity = Object.keys(cartState).reduce((total, key) => {
    const quantity = cartState[key]?.quantity || 0;
    return total + quantity;
  }, 0);

  const userMenuControl = () => {
    if (isLoggedIn) {
      setIsProfile(true)
    }
    else {
      navigate('/login')
    }
  }

  const handleLogOut = () => {
    localStorage.setItem('access-token', '');
    localStorage.setItem('refresh-token', '');
    dispatch(setLogOut())
    navigate('/login')
  }

  const tabBar = [
    { name: "HOME", icon: <AiOutlineHome />, url: "/" },
    { name: "PRODUCTS", icon: <FiShoppingBag />, url: "/products/all" },
    // { name: "PRODUCT MANAGEMENT", icon: <TfiWrite />, url: "/product_management" },
    { name: "ABOUT US", icon: <InfoIcon />, url: "/about_us" },
  ];

  const userBar = [
    { name: "My Account", icon: <AccountCircle />, url: "/user_profile" },
    { name: "My Orders", icon: <ShoppingBasket />, url: "/user_profile/my_orders" },
    { name: "My Wishlist", icon: <FavoriteIcon />, url: "/user_profile/my_wishlist" },
  ];

  return (
    <React.Fragment>
      <AppBar className="sticky">
        <section className="block md:hidden"></section>

        <Toolbar className="hidden sm:flex flex-row gap-12 justify-between content-center items-center bg-white">

          <section onClick={() => navigate('/')} className="flex gap-1 items-center ">
            <img className="w-10 h-10" src={logo} alt="E-shop logo" />
            <Typography className="text-black text-nowrap font-bold text-3xl cursor-pointer">E-Shop</Typography>

          </section>

          <SearchBar />

          <section className="flex gap-8 justify-center content-center items-center">
            <Badge badgeContent={totalQuantity} color="secondary" showZero>
              <ShoppingCartOutlined
                fontSize="large"
                className=" text-violet-700 hover:cursor-pointer"
                onClick={() => { Object.keys(cartState).length > 0 && navigate('/product_cart') }}
              />
            </Badge>

            <Avatar
              className="w-10 h-10 hover:cursor-pointer"
              onClick={(_event: any) => {
                userMenuControl();
              }}
              style={{
                backgroundColor: user?.email ? stringToColor(user?.email) : "#6d28d9",
              }}
            >
              {user?.image_url ? <img src={user?.image_url} /> : user.email ? user.email[0].toUpperCase() : <PersonIcon />}

            </Avatar>

          </section>
        </Toolbar>


        <Toolbar className="flex sm:hidden gap-1 items-center justify-between content-center bg-white">
          <Typography
            className="text-violet-700 text-2xl lg:text-3xl font-extrabold hover:cursor-pointer sm:hidden"
            onClick={() => setIsMenu(true)}
          >
            <AiOutlineMenu />
          </Typography>

          <section onClick={() => navigate('/')} className="flex gap-[0.1rem] min-[380px]:gap-1 items-center md:w-[20rem] lg:w-[15rem]">
            <img className="w-8 h-8" src={logo} alt="E-Shop logo" />
            <Typography className="text-black text-nowrap text-xl md:text-2xl font-bold cursor-pointer">E-Shop</Typography>
          </section>
          <section className=" flex gap-3 justify-between">

            <SearchIcon
              fontSize="large"
              className="text-violet-700"
              sx={{ padding: "0.25rem 0 0 0.5rem" }}

              onClick={() => setSearchDrawer(true)}
            />


            <div>
              <Badge badgeContent={totalQuantity} color="secondary" className="mt-1" showZero>
                <ShoppingCartOutlined
                  sx={{ fontSize: "1.8rem" }}
                  className="text-violet-700"
                  onClick={() => { Object.keys(cartState).length > 0 && navigate('/product_cart') }}
                />
              </Badge>
            </div>


            <Drawer
              anchor="top"
              open={searchDrawer}
              onClose={toggleDrawer(false)}
            >
              <div style={{ padding: "1rem 0.4rem 1rem 0.4rem" }}>
                <SearchBar />
              </div>
            </Drawer>


            <Avatar
              className="w-8 h-8 hover:cursor-pointer ml-2"
              onClick={(_event: any) => {
                userMenuControl();
              }}
              style={{
                backgroundColor: user?.email ? stringToColor(user?.email) : "#6d28d9",
              }}
            >

              {user?.image_url ? <img src={user?.image_url} /> : user.email ? user.email[0].toUpperCase() : <PersonIcon />}
            </Avatar>

          </section>
        </Toolbar>

        <section className="flex gap-2 bg-gray-700 pl-4 content-center items-center hidden sm:block">

          {tabBar?.map((item, i) => (
            <Button
              key={i}
              className="text-white text-md md:text-base"
              onClick={() => navigate(item?.url)}
            >
              {item?.name}
            </Button>
          ))}
        </section>

      </AppBar>

      <Drawer anchor="left" open={isMenu} onClose={() => setIsMenu(false)}>
        <section style={{ height: "3.5rem", backgroundColor: "rgb(55 65 81)" }}>
          <Typography style={{ color: "white", padding: "15px" }}>
            {" "}
            Hello User
          </Typography>
        </section>
        <List>

          {tabBar?.map((item, i) => (
            <ListItemButton
              onClick={() => [navigate(item?.url), setIsMenu(false)]}
              key={i}
            >
              {/* HERE */}
              <ListItemIcon>{item?.icon}</ListItemIcon>
              <ListItemText>{item?.name}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Drawer anchor="right" open={isProfile} onClose={() => setIsProfile(false)}>
        <div style={{ width: "250px" }}>
          <section style={{ height: "3.5rem", backgroundColor: "#6d28d9" }}>
            <Typography style={{ color: "white", padding: "15px" }}>
              {isLoggedIn ? user?.first_name + " " + user?.last_name : ""}
            </Typography>
          </section>
          <List>

            {userBar?.map((item, i) => (
              <ListItemButton
                onClick={() => [navigate(item?.url), setIsProfile(false)]}
                key={i}
              >
                {/* HERE */}
                <ListItemIcon>{item?.icon}</ListItemIcon>
                <ListItemText>{item?.name}</ListItemText>
              </ListItemButton>
            ))}

            <ListItemButton
              onClick={() => [handleLogOut(), setIsProfile(false)]}

            >
              {/* HERE */}
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItemButton>

          </List>
        </div>
      </Drawer>

    </React.Fragment>
  )
}

export default Header