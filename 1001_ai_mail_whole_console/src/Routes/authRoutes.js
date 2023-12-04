import ClientId from '../Components/Pages/Admin/ClientId/ClientId'
import CreateAccount from '../Components/Pages/User/CreateAccount/CreateAccount'
import Email from '../Components/Pages/User/Email/Email'
import EmailOpened from '../Components/Pages/User/EmailOpened/EmailOpened'
import Pricing from '../Components/Pages/User/Pricing/Pricing'
import Setting from '../Components/Pages/User/Setting/Setting'

const authRoutes = [
    {
        path : "create/account",
        element : <CreateAccount />
    },
    {
        path : "skmail",
        element : <Email />
    },
    {
        path : "skmail/user/emailid",
        element : <EmailOpened />
    },
    {
        path : "setting",
        element : <Setting />
    },
    {
        path : "pricing",
        element : <Pricing />
    },
    {
        path : "credentials/me",
        element : <ClientId />
    },
]

export default authRoutes