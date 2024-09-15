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
import { ActivityLogIcon, BookmarkIcon, DashboardIcon, DragHandleHorizontalIcon, ExitIcon, HomeIcon, MagnifyingGlassIcon, PersonIcon } from "@radix-ui/react-icons";
import { CreditCardIcon, LandmarkIcon, WalletIcon } from "lucide-react";

const sideBarMenu = [
    { name: "Home", path: "/", icon: <HomeIcon className="h-6 w-6" /> },
    { name: "Portfolio", path: "/portfolio", icon: <DashboardIcon className="h-6 w-6" /> },
    { name: "Watchlist", path: "/watchlist", icon: <BookmarkIcon className="h-6 w-6" /> },
    { name: "Activity", path: "/activity", icon: <ActivityLogIcon className="h-6 w-6" /> },
    { name: "Wallet", path: "/wallet", icon: <WalletIcon className="h-6 w-6" /> },
    { name: "Payment Details", path: "/payment-details", icon: <LandmarkIcon className="h-6 w-6" /> },
    { name: "Withdrawl", path: "/withdrawl", icon: <CreditCardIcon className="h-6 w-6" /> },
    { name: "Profile", path: "/profile", icon: <PersonIcon className="h-6 w-6" /> },
    { name: "Logout", path: "/", icon: <ExitIcon className="h-6 w-6" /> }
]

const Navbar = () => {
    return (
        <div className="flex justify-between items-center">
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
                            <SheetClose className="">
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
                        {/* </SheetHeader> */}
                    </SheetContent>
                </Sheet>
                <div className="text-sm lg:text-base">
                    <span className="font-bold text-orange-700 mr-1">Trade</span>
                    <span>Crypto</span>
                </div>
                <Button variant="outline">
                    <MagnifyingGlassIcon />
                    <span className="ml-5"> Search </span>
                </Button>
            </div>
            <Avatar>
                <AvatarFallback>
                    H
                </AvatarFallback>
            </Avatar>
        </div>
    )
};

export default Navbar;