import * as Yup from "yup"

let msg = "Feild required!"
const SigninSchema = Yup.object({
    email : Yup.string().required(msg),
    password : Yup.string().required(msg)
})
export default SigninSchema