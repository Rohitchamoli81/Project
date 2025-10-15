import React, { useEffect ,useState } from 'react'
import Card from '../Home/Card'
import { ScrollArea, ScrollBar } from '../ui/scroll-area'
import {Beef,  Drumstick, Cake, Ham, Fish, Star, Leaf, Salad,Vegan ,CookingPot} from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Slide({cat}) {
    console.log(String(cat).trim());
    
    const loading = useSelector((state)=>state.meals.loading);
    const recipes = useSelector((state)=>state.meals.meals);
    const navigate = useNavigate();
    const [categoryCount, setCategoryCount] = useState({});
    // console.log(recipes);

    useEffect(()=>{
        if(recipes.length > 0){
            const newCount = {
                "Beef": 0,
                "Breakfast": 0,
                "Coffee": 0,
                "Chicken": 0,
                "Dessert": 0,
                "Starter": 0,
                "Pork": 0,
                "Seafood": 0,
                "Vegan": 0,
                "Side": 0,
                "Vegetarian": 0,
                "Lamb": 0,
                "Miscellaneous": 0,
                "Goat": 0
            }
            recipes.forEach(meal=>{
                if(meal.category in newCount){
                    newCount[meal.category] += 1;
                }
            })
            setCategoryCount(newCount);
        }
    },[recipes])

    const cardData = [
        { Icon: Beef, heading: "Beef", content: categoryCount.Beef + " Recipes" },
        { Icon: Vegan, heading: "Goat", content: categoryCount.Goat + " Recipes" },
        { Icon: CookingPot, heading: "Breakfast", content: categoryCount.Breakfast + " Recipes" },
        { Icon: Drumstick, heading: "Chicken", content: categoryCount.Chicken + " Recipes" },
        { Icon: Cake, heading: "Dessert", content: categoryCount.Dessert + " Recipes" },
        { Icon: Salad, heading: "Starter", content: categoryCount.Starter + " Recipes" },
        { Icon: Ham, heading: "Pork", content: categoryCount.Pork + " Recipes" },
        { Icon: Fish, heading: "Seafood", content: categoryCount.Seafood + " Recipes" },
        { Icon: Vegan, heading: "Vegan", content: categoryCount.Vegan + " Recipes" },
        { Icon: Star, heading: "Side", content: categoryCount.Side + " Recipes" },
        { Icon: Leaf, heading: "Vegetarian", content: categoryCount.Vegetarian + " Recipes" },
        { Icon: Beef, heading: "Lamb", content: categoryCount.Lamb + " Recipes" },
        { Icon: CookingPot, heading: "Miscellaneous", content: categoryCount.Miscellaneous + " Recipes" },
    ];


    return loading ? <div>Loading...</div> : 

        <div className="w-full px-8 py-6 cursor-pointer">
            <ScrollArea className="w-full rounded-md border">
                <div className='flex gap-4 p-4'>
                    {cardData.map((logo) => (
                        <Card
                            key={logo.heading}
                            Icon={logo.Icon}
                            heading={logo.heading}
                            content={logo.content}
                            textColor={cat === logo.heading ? "text-red-600" : "text-gray-800"}
                            onClick={() =>navigate(`/meal/${logo.heading.trim()}`)}
                        />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    
}

export default Slide