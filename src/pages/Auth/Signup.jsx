import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch } from 'react-redux'
import { register } from '@/store/Auth/action'

const Signup = () => {
  const dispatch = useDispatch();
  const form = useForm({
    resolver: "",
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  })
  const onSubmit = (data) => {
    console.log("data ", data);
    dispatch(register(data));
  }
  return (
    <div>
      <h1 className='text-xl font-bold text-center pb-4'> Sign Up</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    className="border w-full border-gray-700 p-5"
                    placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name="email"
            render={({field}) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      className="border w-full border-gray-700 p-5"
                      placeholder={"Enter Email"}
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
                      placeholder={"Enter Password"}
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

export default Signup;
