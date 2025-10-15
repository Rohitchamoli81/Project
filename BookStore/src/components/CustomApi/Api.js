
export const Api  = async (pageNumber) =>{
    try {

        const response = await fetch(`http://localhost:8080/api/v1/public/books?page=${pageNumber}&limit=10&inc=id,volumeInfo,saleInfo`);

        if(!response.ok){
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        const books =  data.data.data;


        return  books;
        
        
    } catch (error) {
        console.log("Api fetch error ",error);
        
    }
}   


