import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input'
import { DialogClose } from '@radix-ui/react-dialog';
import { BuildingIcon } from 'lucide-react';
import React, { useState } from 'react'

const WithdrawalForm = () => {
  const [amount, setAmount] = useState("");
  const handleWithdraw = () => {

  }
  return (
    <div className='pt-10 space-y-5'>
      <div className='flex justify-between items-center rounded-md bg-slate-900 text-2xl font-bold px-5 py-4'>
        <p> Available Balance </p>
        <p> $9000 </p>
      </div>
      <div className='flex flex-col items-center'>
        <h1> Enter Withdrawal Amount </h1>
        <div className='flex items-center justify-center'>
          <Input 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="withdrawalInput py-7 border-none outline-none focus:outline-none px-0 text-2xl text-center"
            placeholder="$9999"
            type="number"
          />
        </div>
      </div>
      <div className=''>
        <p className='pb-2'> Transfer to </p>
        <div className='flex items-center gap-5 border px-5 py-2 rounded-md'>
          <BuildingIcon />
          <div>
            <p className='font-bold'> YES BANK</p>
            <p className='text-sm'> *********1651 </p>
          </div>
        </div>
      </div>
      <DialogClose className='w-full'>
        <Button onClick={handleWithdraw} className="w-full py-7 text-xl">
          Withdraw
        </Button>

      </DialogClose>
      
    </div>
  )
}

export default WithdrawalForm
