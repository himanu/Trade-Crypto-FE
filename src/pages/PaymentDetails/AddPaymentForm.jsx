import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'

const AddPaymentForm = () => {
  const form = useForm({
    resolver: "",
    defaultValues: {
      accoutHolderName: "",
      ifsc: "",
      accountNumber: "",
      bankName: ""
    }
  })
  const onSubmit = (data) => {
    console.log("data ", data);
  }
  return (
    <div className='px-10 py-2'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <FormField
            control={form.control}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Acount Holder Name</FormLabel>
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
            name="ifsc"
            render={({field}) => {
              return (
                <FormItem>
                  <FormLabel> IFSC Code </FormLabel>
                  <FormControl>
                    <Input
                      className="border w-full border-gray-700 p-5"
                      placeholder={"Enter IFSC Code"}
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
            name="accountNumber"
            render={({field}) => {
              return (
                <FormItem>
                  <FormLabel> Account Number </FormLabel>
                  <FormControl>
                    <Input
                      className="border w-full border-gray-700 p-5"
                      placeholder={"Enter Account Number"}
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
            name="confirmAccountNumber"
            render={({field}) => {
              return (
                <FormItem>
                  <FormLabel>Confirm Account Number </FormLabel>
                  <FormControl>
                    <Input
                      className="border w-full border-gray-700 p-5"
                      placeholder={"Reenter Account Number"}
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
            name="bankName"
            render={({field}) => {
              return (
                <FormItem>
                  <FormLabel> Bank Name </FormLabel>
                  <FormControl>
                    <Input
                      className="border w-full border-gray-700 p-5"
                      placeholder={"Enter Bank Name"}
                      {...field}
                      
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )

            }}
          /> 
          <DialogClose className="w-full">
            <Button type="submit" className="w-full py-5">
              Submit
            </Button>
          </DialogClose>
        </form>
      </Form>
    </div>
  )
}

export default AddPaymentForm
