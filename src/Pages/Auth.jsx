import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { loginAPI, registerAPI, resendOTPAPI, verifyOTPAPI } from '../services/allAPI';

function Auth({register}) {

    const isRegisterForm = register?true:false

    const navigate = useNavigate()

    const [showResendButton, setShowResendButton] = useState(false);
    const [timer, setTimer] = useState(30); 


    const[userData,setUserData] = useState({
        name:"",phone:"",email:"",password:"",role:"user"
    })

    const [otp, setOtp] = useState(""); 
    const [userId, setUserId] = useState(null); 
    const [showOtpField, setShowOtpField] = useState(false); 

    const startResendTimer = () => {
        setShowResendButton(false); 
        setTimer(30); 
    
        let countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown);
                    setShowResendButton(true); 
                    return 0;
                }
                return prev - 1;
            });
        }, 1000); 
    };

    const handleRegister=async(e)=>{
        e.preventDefault()
        const{name,phone,email,password,role} = userData

        if(!name || !phone || !email || !password){
            toast.warning("please fill missing fields")
        }
        else{
            // const reqBody = new FormData()
            // reqBody.append("name",name)
            // reqBody.append("phone",phone)
            // reqBody.append("email",email)
            // reqBody.append("password",password)
            // reqBody.append("role",role)
            
            //api call
            const result = await registerAPI(userData)
            console.log(result);
            if(result.status==200){
                toast.success(`${result.data.name} has successfully registered`)
                navigate('/')
                setUserData({name:"",phone:"",email:"",password:""})
            }
            else{
                toast.warning(result.response.data)
            }
            
        }
    }


    const handleLogin=async(e)=>{
        e.preventDefault()
        const{email,password,role}=userData
        if(!email || !password){
            toast.warning("please fill missing fields")
        }
        else{
            try{
                //proceed to api call
                const result = await loginAPI({email,password,role})
                console.log(result);
                
                if(result.status==200){
                    // console.log(result.data);
                    
                    // sessionStorage.setItem("name",result.data.existingUser.name)
                    // sessionStorage.setItem("token",result.data.token)
                    
                    // if(result.data.role == "user"){
                    //     navigate('/tenant-home')
                    // }
                    // else{
                    //     navigate('/admin-dashboard')
                    // }
                    // setUserData({email:"",password:""})
                    if(result.data.user.role == "admin"){
                        sessionStorage.setItem("token", result.data.token);
                        console.log(sessionStorage.getItem("token"));
                        
                        sessionStorage.setItem("name", result.data.user.name);
                        
                        navigate('/admin-dashboard')
                        toast.success("Login successful");
                    }

                    else{
                        toast.success("OTP sent to your email")
                        setUserId(result.data.userId)
                        setShowOtpField(true);
                        startResendTimer();
                    }
                }else{
                    toast.warning(result.response.data)
                }
            }catch(err){
                console.log(err);
                
            }
        }
    }


    const handleVerifyOtp = async (e) => {
        e.preventDefault()
        if (!otp || !userId) {
            toast.warning("Enter OTP");
            return;
        }

        try {
            const result = await verifyOTPAPI({ userId, otp });
            console.log("after verification ",result);
            
            if (result.status == 200) {
                sessionStorage.setItem("token", result.data.token);
                console.log(sessionStorage.getItem("token"));
                
                sessionStorage.setItem("name", result.data.name);
                toast.success("Login successful");

                navigate('/tenant-home') 
            } else {
                toast.warning("Invalid OTP");
            }
        } catch (err) {
            console.log("API Error:", err);
            toast.error("Something went wrong, please try again.");
        }
    };

    const handleResendOtp = async (e) => {
        e.preventDefault()
        if (!userId) {
            toast.warning("User ID is missing. Please login again.");
            return;
        }
    
        try {
            const result = await resendOTPAPI(userId);
            console.log("Resend OTP result:", result);
    
            if (result.status === 200) {
                toast.success("New OTP has been sent to your email.");
                setShowOtpField(true)
                startResendTimer()
            } else {
                toast.warning(result.data);
            }
        } catch (err) {
            console.log("Error in Resend OTP:", err);
            toast.error("Failed to resend OTP. Try again.");
        }
    };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center p-5">
        <div className="w-75 container">
            <div className="card shadow p-5 " style={{backgroundColor:'#F0F4DA'}}>
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="d-flex align-items-center flex-column">
                            <h1 className='fw-bolder text-dark mt-2'><i className='fa-solid fa-list-check me-2'></i>Dwellio</h1>
                            <h5 className='text-dark fw-bolder text-center'>
                                {
                                    isRegisterForm?'Sign-Up to your Account':'Sign-In to your Account'
                                }
                            </h5>
                            <Form className='text-dark w-100'>
                                {
                                    isRegisterForm&&
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInputName">
                                        <Form.Control type="text" placeholder="Enter your name" onChange={e=>setUserData({...userData,name:e.target.value})} value={userData.name}/>
                                    </Form.Group>
                                }
                                {
                                    isRegisterForm&&
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInputNumber">
                                        <Form.Control type="text" placeholder="Enter your phone number" onChange={e=>setUserData({...userData,phone:e.target.value})} value={userData.phone}/>
                                    </Form.Group>
                                }
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInputemail">
                                    <Form.Control type="email" placeholder="Enter your email" onChange={e=>setUserData({...userData,email:e.target.value})} value={userData.email}/>
                                </Form.Group>
                                {/* {
                                    isRegisterForm&&
                                    
                                    <label className='mb-3'>
                                        <p>choose a profile photo</p>
                                        <input type="file" style={{display:'none'}} />
                                        <img height={"100px"} width={"100%"} src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg" alt="" />
                                    </label>
                                } */}

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInputpswd">
                                    <Form.Control type="password" placeholder="Enter your password" onChange={e=>setUserData({...userData,password:e.target.value})} value={userData.password}/>
                                </Form.Group>
                                {/* {
                                    isRegisterForm&&
                                    <div className="d-flex flex-row">
                                        <div class="form-check me-3">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked/>
                                            <label class="form-check-label" for="flexRadioDefault2">Tenant</label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                            <label class="form-check-label" for="flexRadioDefault2">Landlord</label>
                                        </div>
                                    </div>
                                } */}
                                {showOtpField ? (
                                            <>
                                                <Form.Group className="mb-3">
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Enter OTP"
                                                        onChange={(e) => setOtp(e.target.value)}
                                                        value={otp}
                                                    />
                                                </Form.Group>
                                                <button className="btn text-dark" style={{ backgroundColor: "#C5D976" }} onClick={handleVerifyOtp}>
                                                    Verify OTP & Login
                                                </button>

                                                {!showResendButton ? (
                                                    <p className="text-danger mt-2">Resend OTP in {timer} seconds</p>
                                                ) : (
                                                    <button
                                                        className="btn btn-link mt-2"
                                                        onClick={handleResendOtp}
                                                        style={{ color: "blue", textDecoration: "none" }}
                                                    >
                                                        Resend OTP
                                                    </button>
                                                )}
                                            </>
                                        ) : isRegisterForm ? (
                                            <div className="mt-3">
                                                <button className="btn text-dark" style={{ backgroundColor: "#C5D976" }} onClick={handleRegister}>
                                                    Register
                                                </button>
                                                <p className="mt-2 fw-bolder">
                                                    Already Have An Account? Click Here to{" "}
                                                    <Link to={"/"} style={{ textDecoration: "none", color: "blue" }}>
                                                        Login
                                                    </Link>
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="mt-3">
                                                <button className="btn text-dark" style={{ backgroundColor: "#C5D976" }} onClick={handleLogin}>
                                                    Login
                                                </button>
                                                <p className="mt-2 fw-bolder">
                                                    New User? Click here to{" "}
                                                    <Link to={"/register"} style={{ textDecoration: "none", color: "red" }}>
                                                        Register
                                                    </Link>
                                                </p>
                                            </div>
                                        )}
                            </Form>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        
                        <img width={"100%"} className='rounded-start' src="./src/assets/loginPic.jpg" alt="" />
                    </div>
                </div>
            </div>
        </div>
      </div>



      <ToastContainer theme="colored"/>
    </>
  )
}

export default Auth
