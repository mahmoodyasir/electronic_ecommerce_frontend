import { Outlet } from "react-router-dom"


const UserLayout = () => {
    return (
        <div>
            This is User Layout.

            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default UserLayout
