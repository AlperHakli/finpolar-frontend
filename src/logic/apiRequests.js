import { apiConfig } from "../config";



// fetch single ticker information
export const fetchSingleTickerInformation = async ({ticker}) => {

    const url = `${apiConfig.apiURL}/stocks/single-ticker?ticker=${ticker}`
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

export const fetchChatApi = async ({apiUrl= apiConfig.apiURL , sessionID , query}) => {


 const response = await fetch(`${apiUrl}/analysis/chat`, {
        method: "POST",
        body: JSON.stringify({ message: query , session_id: sessionID}),
        headers: { "Content-Type": "application/json" },
      });


      if(!response.ok){
        const error = {
            status: response.status,
            message: "Internal Server Error"
        }

        throw error;

      }

      return response;

}