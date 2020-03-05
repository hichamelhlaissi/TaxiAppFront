


export const APIURL = "https://a5e94252.ngrok.io";

export function geocode(){
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=34.066645,-6.762011&key=AIzaSyCoIzI4JvkT0MjvaBXH-OSt6d6pYuU1dMg'
           )
           .then((response) => response.json())
           .then(
                (data)=>{
                    console.log(data.results[1].formatted_address)
                } 
            ).catch(e=>{
                console.log(e)
            }) 
}

export function alltaxis(){
    return fetch(APIURL+'/api/taxies')

}




