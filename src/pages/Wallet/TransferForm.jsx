import { Input } from '@/components/ui/input'
import React from 'react'

const TransferForm = () => {
  return (
    <div className='pt-10 space-y-5'>
      <div>
        <h1 className='pb-1'> Enter Amount </h1>
        <Input 
          name="amount"
          onChange={() => {}}
        />
      </div>
    </div>
  )
}

export default TransferForm
