export const mainUrl = "http://127.0.0.1:8083";



// fetch single ticker information
export const fetchSingleTickerInformation = async ({ticker}) => {

    const url = `${mainUrl}/stocks/single-ticker?ticker=${ticker}`
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