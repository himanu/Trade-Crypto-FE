import { Button } from "@/components/ui/button";
import { useState } from "react";
import AssetTable from "./AssetTable";

const filterCategories = [
    {text: "All", name: "all"},
    {text: "Top 50", name: "top50"},
    {text: "Top Gainers", name: "topGainers"},
    {text: "Top Loosers", name: "topLoosers"},
]
const Home = () => {
    const [category, setCategory] = useState(filterCategories[0].name);

    return (
        <div>
           <div className="flex items-center gap-4 p-3">
                {filterCategories.map((item, idx) => (
                    <div key={item.name}>
                        <Button onClick={() => setCategory(item.name)} variant={category === item.name ? "default" : "outline"} className="rounded-full"> {item.text} </Button>
                    </div>
                ))}
            </div>  
            <AssetTable />
        </div>
    )
};
export default Home;