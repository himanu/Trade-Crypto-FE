import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { baseUrl } from '@/constants'
import { loaderContext } from '@/context'
import { useJWTToken } from '@/hooks/jwtToken'
import { logout } from '@/lib/utils'
import { fetchPortfolio } from '@/store/Portfolio/action'
import { WITHDRAW_MONEY_SUCCESS } from '@/store/Wallet/actionTypes'
import { DotIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const TradingForm = ({ holding }) => {
    const [amount, setAmount] = useState("");
    const {setLoading, loading} = useContext(loaderContext);
    const jwt = useJWTToken();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyOrder = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${baseUrl}/order/sell?coinId=${holding?.holding?.coinId}&qty=${amount}`, null, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            dispatch(fetchPortfolio(jwt, navigate));
            toast.success("Order Successfully executed!")
            setLoading(false);
        } catch(error) {
            setLoading(false);
            toast.error("Order failed, Insufficient Qty to sell!")
            if (error?.status === 401)
                logout(navigate, dispatch);
        } 
    }
    return (
        <div className='space-y-10 p-5'>

            <div className="flex gap-5 items-center">
                <div>
                    <Avatar>
                        <AvatarImage src={holding?.coinUrl}></AvatarImage>
                    </Avatar>
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <p onClick={() => navigate(`/market/${holding?.holding?.coinId}`)} className=" font-medium cursor-pointer flex items-center gap-3 hover:text-slate-200 hover:underline"> {(holding?.coinSymbol ?? "").toUpperCase()} </p>
                        <DotIcon className="text-gray-400" />
                        <p className="text-gray-400"> {holding?.coinName} </p>
                    </div>
                    <div className="flex items-end gap-2">
                        <p className="text-xl font-bold"> ${holding?.coinPrice}</p>
                        <p>
                            <span className={holding?.coinPriceChange < 0 ? "text-red-600" : "text-green-600"}>
                                <span> {(holding?.coinPriceChange >= 0 ? "+" : "") + holding?.coinPriceChange.toFixed(2)}</span>
                                <span> ({holding?.coinPriceChangePercentage.toFixed(2)}%)</span>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <div className='flex flex-col gap-4 items-center justify-between'>
                    <div className='flex items-center w-[100%] justify-between'>
                        <Label htmlFor="amount_input">
                            Qty
                        </Label>
                        <Input
                            className="px-4  py-4 w-[40%] focus:outline-none"
                            placeholder="Enter Qty to sell..."
                            type="number"
                            id="amount_input"
                            name="amount"
                            value={amount}
                            onChange={(e) => {
                                const value = e?.target?.value;
                                console.log("value ", value, "  ", !value);
                                if (!value) {
                                    setAmount("");
                                    return;
                                }
                                if (isNaN(value))
                                    return;
                                setAmount(Number(value));
                            }}
                            onKeyDown={(e) => console.log("key ", e.key)}
                        />
                    </div>
                    <div className='flex py-4 items-center w-[100%] justify-between'>
                        <p>Order Type</p>
                        <p>Market Order</p>
                    </div>
                    <div className='flex items-center w-[100%] justify-between'>
                        <p>Available Qty</p>
                        <p>{holding?.holding?.qty}</p>

                    </div>
                </div>
            </div>
            <div>
                <DialogClose className='w-full'>
                    <Button disabled={!amount || (amount > (holding?.holding?.qty ?? 0))} onClick={handleBuyOrder} className={`markDepositTxnSuccessfulw-full w-[100%] py-6`}>
                        SELL
                    </Button>
                </DialogClose>
                {amount > (holding?.holding?.qty ?? 0) && (
                    <h1 className='absolute w-[100%] left-0 pb-4 text-red-600 text-center pt-2'>
                        Insufficient Quantity!
                    </h1>
                )}
            </div>
        </div>
    )
}

export default TradingForm
