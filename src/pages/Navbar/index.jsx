import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { logoutUser } from "@/store/Auth/action";
import { ActivityLogIcon, BookmarkIcon, DashboardIcon, DragHandleHorizontalIcon, ExitIcon, HomeIcon, MagnifyingGlassIcon, PersonIcon, ShuffleIcon } from "@radix-ui/react-icons";
import { CreditCardIcon, LandmarkIcon, WalletIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/constants";
import { useJWTToken } from "@/hooks/jwtToken";
import { logout } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";


const sideBarMenu = [
    { name: "Home", path: "/", icon: <HomeIcon className="h-6 w-6" /> },
    { name: "Portfolio", path: "/portfolio", icon: <DashboardIcon className="h-6 w-6" /> },
    { name: "Watchlist", path: "/watchlist", icon: <BookmarkIcon className="h-6 w-6" /> },
    { name: "Activity", path: "/activity", icon: <ActivityLogIcon className="h-6 w-6" /> },
    { name: "Wallet", path: "/wallet", icon: <WalletIcon className="h-6 w-6" /> },
    { name: "Payment Details", path: "/payment_details", icon: <LandmarkIcon className="h-6 w-6" /> },
    { name: "Withdrawal", path: "/withdrawal", icon: <CreditCardIcon className="h-6 w-6" /> },
    { name: "Profile", path: "/profile", icon: <PersonIcon className="h-6 w-6" /> },
    { name: "Logout", path: "/", icon: <ExitIcon className="h-6 w-6" /> }
]

const Loader = () => (
    <div className='absolute w-[100%] h-[100%] max-h-[100%] flex justify-center items-center backdrop-blur z-[50] overflow-hidden left-0 top-0'>
        <svg className='w-[40px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#FEFFF1" stroke="#FEFFF1" strokeWidth="3" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#FEFFF1" stroke="#FEFFF1" strokeWidth="3" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#FEFFF1" stroke="#FEFFF1" strokeWidth="3" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>
    </div>
)

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [emptyStateText, setEmptyText] = useState("Search Coin");
    const timeoutId = useRef(null);
    const auth = useSelector((store) => store.auth);
    const jwt = useJWTToken();
    const handleClick = (path, name) => {
        if (name === 'Logout') {
            dispatch(logoutUser(navigate));
            return;
        }
        navigate(path);
    }
    const fetchSearchedCoins = async (searchText) => {
        try {
            setLoading(true);
            const result = await axios.get(`${baseUrl}/coin/search?query=${searchText}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            if (result?.data?.coins.length === 0)
                setEmptyText(searchText ? "Your search didn't match any records !" : "Search Coins !")
            setCoins((result?.data?.coins ?? []));
        } catch (err) {
            if (err.status === 401)
                logout(navigate, dispatch);
        } finally {
            setLoading(false);
        }
    }
    const handleCoinSearch = (e) => {
        setSearchText(e?.target?.value);
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }
        let id = setTimeout(() => fetchSearchedCoins(e?.target?.value), 800)
        timeoutId.current = id;
    }

    useEffect(() => (() => clearTimeout(timeoutId.current)), [])

    return (
        <div className="flex justify-between items-center mb-4">
            <div className="flex gap-7 items-center">
                <Sheet>
                    <SheetTrigger>
                        <Button variant="ghost" size="icon" className="rounded-full h-11 w-11" >
                            <DragHandleHorizontalIcon className="h-7 w-7" />
                        </Button>

                    </SheetTrigger>
                    <SheetContent side="left" className="w-72 flex flex-col">
                        <SheetHeader>
                            <SheetTitle>
                                <div className="flex items-center">
                                    <Avatar className="h-[auto] w-[auto]">
                                        <AvatarImage className='w-[4rem] h-[3rem]' src="https://cdn.pixabay.com/photo/2020/03/08/16/03/bitcoin-4912864_1280.jpg" />
                                    </Avatar>
                                    <div>
                                        <span className="font-bold text-orange-700 mr-2">Trade</span>
                                        <span>Crypto</span>
                                    </div>
                                </div>
                            </SheetTitle>
                        </SheetHeader>
                        {sideBarMenu.map((item, idx) => (
                            <SheetClose key={item.path} onClick={() => handleClick(item.path, item.name)}>
                                <Button
                                    variant="outline"
                                    className="w-full  flex item-center py-6 gap-4"
                                >
                                    <span>{item.icon}</span>
                                    <span>
                                        {item.name}
                                    </span>
                                </Button>
                            </SheetClose>
                        ))}
                    </SheetContent>
                </Sheet>
                <div className="text-sm lg:text-base">
                    <span className="font-bold text-orange-700 mr-1">Trade</span>
                    <span>Crypto</span>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <MagnifyingGlassIcon />
                            <span className="ml-5"> Search </span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Search coins
                            </DialogTitle>
                            <DialogDescription>
                                Explore a diverse range of cryptocurrencies with the powerful search tool
                            </DialogDescription>
                        </DialogHeader>
                        <Input
                            className="focus-visible:shadow-none focus-visible:outline-none"
                            value={searchText}
                            onChange={handleCoinSearch}
                        />


                        <ScrollArea className="relative max-h-[300px] overflow-auto">
                            {coins.length === 0 ? (
                                <div className="text-center">
                                    { loading ? "Loading ..." : emptyStateText }
                                </div>
                                
                            ) : <>
                                {coins.map((item) => (
                                <DialogClose className="w-[100%]" key={item.id} onClick={() => navigate(`/market/${item.id}`)}>
                                    <Card className="cursor-pointer hover:opacity-100 opacity-80 px-5 flex justify-between items-center p-2">
                                        <div className="flex flex-1 items-center gap-5">
                                            <Avatar>
                                                <AvatarImage src={item?.thumb}></AvatarImage>
                                            </Avatar>
                                            <div className="flex-1 text-left space-y-1">
                                                <h1> {(item?.name ?? "").toUpperCase()} </h1>
                                                <p className="text-sm text-gray-500"> {(item?.symbol ?? "").toUpperCase()} </p>
                                            </div>
                                        </div>
                                    </Card>
                                </DialogClose>
                            ))}
                                {loading && <Loader />}
                            </>}
                        </ScrollArea>
                    </DialogContent>
                </Dialog>

            </div>
            <Avatar>
                <AvatarFallback>
                    {auth?.user?.username?.[0] ?? 'R'}
                </AvatarFallback>
            </Avatar>
        </div>
    )
};

export default Navbar;