import Home from '../Components/Pages/Admin/Home/Home'
import EmailApi from '../Components/Pages/Admin/Api/EmailApi'
const adminRoutes = [
    {
        path : "home",
        element : <Home />
    },
    {
        path : "api/email",
        element : <EmailApi />
    },
]

export default adminRoutes