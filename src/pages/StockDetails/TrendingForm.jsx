import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DotIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'

const TrendingForm = () => {
    const [orderType, setOrderType] = useState("BUY");
    return (
        <div className='space-y-10 p-5'>
            <div>
                <div className='flex gap-4 items-center justify-between'>
                    <Input
                        className="py-7 focus:outline-none"
                        placeholder="Enter Amount..."
                        onChange={{}}
                        type="number"
                        name="amount"
                    />
                    <div>
                        <p className='border text-2xl flex justify-center items-center w-35 h-14 rounded-md'> 4563 </p>
                    </div>
                </div>
                {true && (
                    <h1 className='text-red-600 text-center pt-4'>
                        Insufficient Balance
                    </h1>
                )}
            </div>
            <div className="flex gap-5 items-center">
                <div>
                    <Avatar>
                        <AvatarImage src="https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400"></AvatarImage>
                    </Avatar>
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <p> BTC </p>
                        <DotIcon className="text-gray-400" />
                        <p className="text-gray-400"> Bitcoin </p>
                    </div>
                    <div className="flex items-end gap-2">
                        <p className="text-xl font-bold"> $65743</p>
                        <p>
                            <span className="text-red-600">
                                <span> -13190423344</span>
                                <span> (-1.04%)</span>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <p>Order Type</p>
                <p>Market Order</p>
            </div>
            <div className='flex items-center justify-between'>
                <p>{orderType == "BUY" ? "Available Cash" : "Available Quantity"}</p>
                <p>{orderType == "BUY" ? "90000" : "12345"}</p>

            </div>
            <div>
                <Button className={`w-full py-6 
                    ${orderType == "SELL" ? "bg-red-600 text-white" : ""}
                    `}>
                    {orderType}
                </Button>
                <Button 
                    variant="link"
                    className="w-full mt-5"
                    onClick={() => setOrderType(orderType == "BUY" ? "SELL" : "BUY")}>
                    {orderType === "BUY" ? "Or Sell" : "Or Buy"}
                </Button>
            </div>
        </div>
    )
}

export default TrendingForm
