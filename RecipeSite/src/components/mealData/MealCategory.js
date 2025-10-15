export function determineMealCategrory(meals){
    return meals.reduce((acc, meal) => {
        const cat = meal.category;
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(meal);
        return acc;
    }, {});
}