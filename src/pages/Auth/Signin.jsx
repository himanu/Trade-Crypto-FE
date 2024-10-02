import React, { useEffect } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDispatch, useSelector } from 'react-redux'
import  { login } from "../../store/Auth/action";
import { useNavigate } from 'react-router-dom'


const SignIn = () => {

  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();

  const form = useForm({
    resolver: "",
    defaultValues: {
      email: "",
      password: ""
    }
  })
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(login(data));
  }
  console.log("auth ", auth);
  useEffect(() => {
    if (!auth.loading && auth.user) {
      console.log("navigating to home")
      navigate("/");
    }
  }, [auth.user])
  return (
    <div>
      <h1 className='text-xl font-bold text-center pb-4'> Sign In</h1>
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
    </div>
  )
}

export default SignIn;
