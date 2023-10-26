import * as Yup from "yup"

const SigninSchema = Yup.object({
    username : Yup.string().required("Username required!"),
    password : Yup.string().required("Password required!")
})
export default SigninSchema