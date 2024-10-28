import React, { useContext, useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDispatch } from 'react-redux'
import  { login } from "../../store/Auth/action";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import axios from 'axios'
import { baseUrl } from '@/constants'
import { loaderContext } from '@/context'
import { toast } from 'react-toastify'
import { LOGIN_SUCCESS } from '@/store/Auth/actionTypes'
import { Edit2Icon, EditIcon } from 'lucide-react'



const OTPScreen = ({email, setOtpScreen}) => {
  const [value, setValue] = React.useState("")

  const {loading, setLoading} = useContext(loaderContext);
  const dispatch = useDispatch();

  const verifyOTP = async () => {
    try {
      toast.dismiss();
      setLoading(true);
      const response = await axios.post(`${baseUrl}/opt_verify?otp=${value}&email=${email}`, null);
      const {user, token} = response?.data;
      localStorage.setItem("token", token)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: token,
          user
        }
      })
    } catch (err) {
      if (err.status == 401) {
        if (err.response.data !== "Incorrect OTP") {
          toast.error("Please login again. " + err?.response?.data);
          setOtpScreen(false);
        } else {
          toast.error("Incorrect OTP");
          setValue("");
        }
      } else {
        toast.error(err.message);
      }

    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (value.length === 6) {
      verifyOTP();
    }
  }, [value]);

  useEffect(() => () => toast.dismiss())

  return (
    <>
      <h1 className='text-2xl font-bold text-center pb-2'> Verify OTP</h1>
      <div className='text-center justify-center mb-4 flex'>
        <span> An OTP has been sent to Email </span>
        <span className='text-blue-500 ml-[3px]'> {email} </span> 
        <span className='italic underline cursor-pointer ml-[2px]' onClick={() => setOtpScreen(false)}> <EditIcon className='text-blue-500 hover:text-blue-600 underline' width={"20px"}/> </span>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <InputOTP maxLength={6} className="mb-6"
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot className="border-slate-300" index={0} />
            <InputOTPSlot className="border-slate-300"  index={1} />
            <InputOTPSlot className="border-slate-300" index={2} />
            <InputOTPSlot className="border-slate-300" index={3} />
            <InputOTPSlot className="border-slate-300" index={4} />
            <InputOTPSlot className="border-slate-300" index={5} />
          </InputOTPGroup>
        </InputOTP>
        {/* <Button type="submit" className="mt-6 lg:w-[20%] py-5">
          Verify OTP
        </Button> */}
      </div>

    </>
  )
}
const SignIn = () => {

  const [showOTPScreen, setOtpScreen] = useState(false);
  const form = useForm({
    resolver: "",
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(login(data, setOtpScreen));
  }
  useEffect(() => {
    // return () => toast.dismiss();
  }, [])

  return (
    <div>
      {showOTPScreen ? <OTPScreen email={form.getValues("email")} setOtpScreen={setOtpScreen} /> : (
        <>
          <h1 className='text-2xl font-bold text-center pb-4'> Sign In</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-6'
            >
              <FormField 
                control={form.control}
                name="email"
                render={({field}) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="border w-full border-gray-700 p-5"
                          placeholder={"Your Email"}
                          {...field}
                          
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )

                }}
              /> 
              <FormField 
                control={form.control}
                name="password"
                render={({field}) => {
                  return (
                    <FormItem>

                      <FormControl>
                        <Input
                          className="border w-full border-gray-700 p-5"
                          placeholder={"Your Password"}
                          {...field}
                          
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )

                }}
              />

              <Button type="submit" className="w-full py-5">
                Submit
              </Button>
            </form>
          </Form>
        </>
      )}
      
    </div>
  )
}

export default SignIn;
