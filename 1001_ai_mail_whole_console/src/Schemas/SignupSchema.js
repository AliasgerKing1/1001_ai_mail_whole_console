import * as Yup from 'yup'

let msg = "Feild required!"
let SignupSchema = Yup.object({
    username : Yup.string().required(msg),
    email : Yup.string().email("Invalid Email").required(msg),
    password : Yup.string().required(msg),
    confpass : Yup.string().required(msg).oneOf([Yup.ref('password'), null], "Password and Confirm Password not match !")
})

export default SignupSchema