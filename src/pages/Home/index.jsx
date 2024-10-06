import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import AssetTable from "./AssetTable";
import { MessageCircle } from "lucide-react";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { getCoinList, getTop50Coins } from "@/store/Coin/action";
import { jwtTokenStr } from "@/constants";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { useNavigate } from "react-router-dom";
  

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
    const {coins, top50Coins} = useSelector(store => store.coin);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChatInptKeyPress = (e) => {
        if (e.key == "Enter") {
            setInputValue("");
        }
    }

    useEffect(() => {
        category === "all" && dispatch(getCoinList(page, localStorage.getItem(jwtTokenStr), navigate));
        category === "top50" && top50Coins.length === 0 && dispatch(getTop50Coins(localStorage.getItem(jwtTokenStr), navigate));
    }, [category, page]);
    return (
        <div>
            <div className="flex border-t">
                <div className=" flex-1 border-r">
                    <div className="flex items-center gap-4 p-3">
                        {filterCategories.map((item, idx) => (
                            <div key={item.name}>
                                <Button onClick={() => setCategory(item.name)} variant={category === item.name ? "default" : "outline"} className="rounded-full"> {item.text} </Button>
                            </div>
                        ))}
                    </div>
                    <AssetTable coins={category === "all" ? coins : top50Coins} />
                    {category === "all" && 
                        <Pagination className="mt-4">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious className={page === 1 && "cursor-not-allowed"} onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}/>
                                </PaginationItem>
                                <PaginationItem className="ml-2">
                                    <PaginationLink onClick={() => setPage(1)} isActive={page === 1}>1</PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                {page != 1 &&
                                    <PaginationItem className="mr-2">
                                        <PaginationLink isActive={true}>{page}</PaginationLink>
                                    </PaginationItem>
                                }
                                <PaginationItem className="cursor-pointer" onClick={() => setPage(page + 1)}>
                                    <PaginationNext />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    }
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