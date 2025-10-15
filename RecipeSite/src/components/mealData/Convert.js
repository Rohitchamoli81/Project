const meals  ={
    "East Asian":[
        "Chinese", "Japanese", "Vietnamese", "Filipino"
    ],
    "South Asian":[
        " Indian", "Thai", "Malaysian"
    ],
    "Western European":[
        "Italian", "French", "Spanish","Portuguese"
    ],
    "Northern European":[
        " British", "Irish", "Dutch", "Polish", "Russian"
    ],
    "Americas":[
        "American", "Canadian", "Mexican", "Jamaican"
    ],
    "Africa & Middle East":[
        "Turkish", "Greek", "Croatian", "Moroccan", "Egyptian", "Tunisian", "Kenyan"
    ]
}

export function determineMainCategory(apiCategory){
const categories = Array.isArray(apiCategory)?apiCategory:[apiCategory]
if(categories.length==0) return 'Uncategorized'

for (const [mainCategories,subCategories] of Object.entries(meals)) {
    const match = categories.some((apiCat) =>
    subCategories.some((subCat) => 
    subCat.trim().toLowerCase() === apiCat.trim().toLowerCase()
    )
);
    if(match) return mainCategories

}
return "Uncategorized";
}


export function groupMealsByCategory(meals){
    return meals.reduce((acc, meal) => {
    const category = determineMainCategory(meal.area);
    
    if (!acc[category]) acc[category] = [];
    acc[category].push(meal);
    return acc;
    }, {});
}