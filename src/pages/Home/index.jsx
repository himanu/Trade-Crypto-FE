import { Button } from "@/components/ui/button";
import { useState } from "react";
import AssetTable from "./AssetTable";
import StockChart from "./StockChart";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { DotIcon, MessageCircle } from "lucide-react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";

const filterCategories = [
    { text: "All", name: "all" },
    { text: "Top 50", name: "top50" },
    { text: "Top Gainers", name: "topGainers" },
    { text: "Top Loosers", name: "topLoosers" },
]
const Home = () => {
    const [category, setCategory] = useState(filterCategories[0].name);
    const [inputValue, setInputValue] = useState("");
    const [isBotOpen, setIsBotOpen] = useState(false);
    const handleChatInptKeyPress = (e) => {
        if (e.key == "Enter") {
            console.log("inputValue", inputValue);
            setInputValue("");
        }
    }
    return (
        <div>
            <div className="flex border-t mt-4">
                <div className="max-w-[50%] flex-1 border-r">
                    <div className="flex items-center gap-4 p-3">
                        {filterCategories.map((item, idx) => (
                            <div key={item.name}>
                                <Button onClick={() => setCategory(item.name)} variant={category === item.name ? "default" : "outline"} className="rounded-full"> {item.text} </Button>
                            </div>
                        ))}
                    </div>
                    <AssetTable />
                </div>
                <div className="max-w-[50%] px-4 flex-1">
                    <StockChart />
                    <div className="flex gap-5 ml-3 items-center">
                        <div>
                            <Avatar>
                                <AvatarImage className="h-[50px]" src="https://assets.coingecko.com/coins/images/1/standard/bitcoin.png?1696501400"></AvatarImage>
                            </Avatar>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <p>
                                    BTC
                                </p>
                                <DotIcon className="text-gray-400" />
                                <p className="text-gray-400"> Bitcoin </p>
                            </div>
                            <div className="flex items-end gap-2">
                                <p className="text-lg font-bold">
                                    5464
                                </p>
                                <p className="text-red-600">
                                    <span>
                                        -1219049822.578
                                    </span>
                                    <span>
                                        (-0.29%)
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="absolute bottom-5 right-5 z-40 flex flex-col justify-end items-end gap-2">
                {isBotOpen && (
                    <div className="rounded-md w-[20rem] md:w-[25rem] lg:w-[25rem] 
                        h-[70vh] bg-slate-900"
                    >
                        <div className="flex justify-between items-center border-b px-6 h-[12%]">
                            <p> Chat Bot</p>
                            <Button variant="ghost" size="icon" onClick={() => setIsBotOpen(false)} >
                                <Cross1Icon />
                            </Button>
                        </div>
                        <div className="h-[80%] flex flex-col overflow-y-auto gap-5 px-5 py-2 scroll-container">
                            <div className="self-start text-left pb-5 w-auto">
                                <div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                                    <p> Hi, Raam Arora </p>
                                    <p> you can ask crypto related any question </p>
                                    <p> like price, market cap extra... </p>
                                </div>
                            </div>

                            <div className="self-end pb-5 text-right w-auto">
                                <div className="justify-end self-end px-5 py-2 rounded-md bg-slate-800 w-auto">
                                    <p> What is the price of Bitcoin?</p>
                                </div>
                            </div>

                        </div>
                        <div className="h-[8%] border-t">
                            <Input className="w-full h-full order-none outline-none"
                                placeholder="write prompt"
                                onChange={(e) => setInputValue(e.target.value)}
                                value={inputValue}
                                onKeyPress={handleChatInptKeyPress}
                            />
                        </div>
                    </div>
                )}

                <div onClick={() => setIsBotOpen(!isBotOpen)} className="relative w-[10rem] cursor-pointer group">
                    <Button className="w-full h-[3rem] gap-2 items-center">
                        <MessageCircle
                            size={30}
                            className="fill-[#1e293b] -rotate-90
                            stroke-none group-hover:fill-[#1a1a1a]"
                        />
                        <span className="text-2xl"> Chat Bot </span>
                    </Button>
                </div>
            </section>
        </div>
    )
};
export default Home;