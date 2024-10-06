import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { useJWTToken } from '@/hooks/jwtToken';
import { withdrawMoney } from '@/store/Wallet/action';
import { DialogClose } from '@radix-ui/react-dialog';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const WithdrawalForm = ({balance}) => {
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const jwt = useJWTToken();
  const navigate = useNavigate();
  const handleWithdraw = () => {
    dispatch(withdrawMoney(amount, jwt, navigate));
  }
  return (
    <div className='pt-10 space-y-5'>
      <div className='flex justify-between items-center rounded-md bg-slate-900 text-2xl font-bold px-5 py-4'>
        <p> Available Balance </p>
        <p> ${balance} </p>
      </div>
      <div className='flex flex-col items-center'>
        <h1> Enter Withdrawal Amount </h1>
        <div className='flex items-center justify-center'>
          <Input 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="withdrawalInput py-7 mt-4 border-none outline-none focus:outline-none px-0 text-2xl text-center"
            placeholder="$0"
            type="number"
          />
        </div>
        {amount > balance && <div className='text-red-600 mt-4'> Insufficient Balance! </div>}
      </div>
      <DialogClose className='w-full'>
        <Button disabled={!(!Number.isNaN(amount) && amount > 0 && amount <= balance)} onClick={handleWithdraw} className="w-full py-7 text-xl">
          Withdraw
        </Button>

      </DialogClose>
      
    </div>
  )
}

export default WithdrawalForm
