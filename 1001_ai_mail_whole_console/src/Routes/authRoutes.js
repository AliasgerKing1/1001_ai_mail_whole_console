import CreateAccount from '../Components/Pages/User/CreateAccount/CreateAccount'
import Email from '../Components/Pages/User/Email/Email'
const authRoutes = [
    {
        path : "create/account",
        element : <CreateAccount />
    },
    {
        path : "skmail",
        element : <Email />
    },
]

export default authRoutes