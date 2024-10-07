import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DotIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'

const TrendingForm = ({ coinDetail, wallet }) => {
    const [amount, setAmount] = useState("");
    return (
        <div className='space-y-10 p-5'>

            <div className="flex gap-5 items-center">
                <div>
                    <Avatar>
                        <AvatarImage src={coinDetail?.image?.small}></AvatarImage>
                    </Avatar>
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <p> {(coinDetail?.symbol ?? "").toUpperCase()} </p>
                        <DotIcon className="text-gray-400" />
                        <p className="text-gray-400"> {coinDetail?.name} </p>
                    </div>
                    <div className="flex items-end gap-2">
                        <p className="text-xl font-bold"> ${coinDetail?.market_data?.current_price?.usd}</p>
                        <p>
                            <span className={coinDetail?.market_data?.price_change_24h < 0 ? "text-red-600" : "text-green-600"}>
                                <span> {(coinDetail?.market_data?.price_change_24h >= 0 ? "+" : "") + coinDetail?.market_data?.price_change_24h.toFixed(2)}</span>
                                <span> ({coinDetail?.market_data?.price_change_percentage_24h.toFixed(2)}%)</span>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <div className='flex flex-col gap-4 items-center justify-between'>
                    <div className='flex items-center w-[100%] justify-between'>
                        <Label htmlFor="amount_input">
                            Amount
                        </Label>
                        <Input
                            className="px-4  py-4 w-[40%] focus:outline-none"
                            placeholder="Enter Amount..."
                            type="number"
                            id="amount_input"
                            name="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center w-[100%] justify-between'>
                        <Label htmlFor="qty_input">
                            Qty
                        </Label>
                        <Input
                            className="px-4 cursor-not-allowed text-center py-4 w-[40%] focus:outline-none"
                            value={(amount/coinDetail?.market_data?.current_price?.usd).toFixed(8)}
                            onChange={{}}
                            type="text"
                            id="qty_input"
                            name="amount"
                            disabled={true}
                        />
                    </div>
                    <div className='flex py-4 items-center w-[100%] justify-between'>
                        <p>Order Type</p>
                        <p>Market Order</p>
                    </div>
                    <div className='flex items-center w-[100%] justify-between'>
                        <p>Available Cash</p>
                        <p>{wallet?.balance}</p>

                    </div>
                </div>
            </div>
            <div>
                <Button disabled={amount > (wallet?.balance ?? 0) || !amount} onClick={() => console.log("Clicked")} className={`markDepositTxnSuccessfulw-full w-[100%] py-6`}>
                    BUY
                </Button>
                {amount > (wallet?.balance ?? 0) && (
                    <h1 className='absolute w-[100%] left-0 pb-4 text-red-600 text-center pt-2'>
                        Insufficient Balance!
                    </h1>
                )}
            </div>
        </div>
    )
}

export default TrendingForm
