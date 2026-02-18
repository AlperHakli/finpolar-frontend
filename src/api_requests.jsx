const API_BASE_URL = import.meta.env.VITE_API_URL;

console.log({API_BASE_URL})

// fetch single ticker information
export const fetchSingleTickerInformation = async ({ticker}) => {

    const url = `${API_BASE_URL}/stocks/single-ticker?ticker=${ticker}`
try{

    const response = await fetch(url , {

        method:"GET",
        headers:{
            "Content-Type":"application/json"

        }
    })

    if(!response.ok) throw new Error(`HTTP error status: ${response.status}`);

    const data = await response.json();

    console.log(`Single ticker data: ${data}`)

    return data;


}
catch(error){
    console.error(`Some error occur when fetch single ticker information: ${error}`)
    return null;

}

}