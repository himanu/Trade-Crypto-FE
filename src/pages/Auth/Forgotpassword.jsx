import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'


const ForgotPassword = () => {
  const form = useForm({
    resolver: "",
    defaultValues: {
      fullName: "",
      email: "",
      password: ""
    }
  })
  const onSubmit = () => {}
  return (
    <div>
      <h1 className='text-xl font-bold text-center pb-4'> Forgot Password</h1>
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

export default ForgotPassword;
