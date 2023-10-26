import * as Yup from 'yup'

let SignupSchema = Yup.object({
    username : Yup.string().required("Username is Required"),
    email : Yup.string().email("Invalid Email").required("Email is Required"),
    password : Yup.string().required('Password is Required'),
    confpass : Yup.string().required('Confirm Password is Required').oneOf([Yup.ref('password'), null], "Password and Confirm Password not match !")
})

export default SignupSchema