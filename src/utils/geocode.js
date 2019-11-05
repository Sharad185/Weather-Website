const request=require('request');
const geocode=(address,Callback)=>
{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2hhcmFkMTg1IiwiYSI6ImNrMGUxbjlsZjBkOXUzcG4wZnBteWc5aGoifQ.bvoUuVWtWqgJbpizzKaKzQ';
    
    request({url:url,json:true},  (error, response)=> {
        if(error)
        {
            Callback("unable to connect to Internet",undefined);
        }
        else if(response.body.features.length===0)
        {
            Callback("unable to find direction with longitude and latitude",undefined);
           
        }else
        {
            Callback(undefined,{
                latitude:response.body.features[0].center[0],
                longitude:response.body.features[0].center[1],
                location:response.body.features[0].place_name
            })
           
        }
          
        });
    }

 

    module.exports=geocode;