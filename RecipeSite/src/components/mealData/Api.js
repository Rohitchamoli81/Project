import axios from "axios"

export const  Api = async(pageNumber)=>{
    try {
        const res = await axios.get(`https://api.freeapi.app/api/v1/public/meals?page=${pageNumber}`)

        const {data:mealdata} = res.data;
        console.log(res.data.message);
        
        return mealdata.data;
    } catch (error) {
        console.log("Api fetch error ",error);    
    }
    
}
