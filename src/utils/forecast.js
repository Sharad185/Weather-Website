const request=require('request');
const forecast=(latitude,longitude,Callback)=>
{
    debugger

    const url="https://api.darksky.net/forecast/3344585949d3d33329f53be728f51048/"+latitude +","+longitude;
    
    request({url:url,json:true},  (error, response)=> {
        if(error)
        {
            Callback("unable to connect to Internet",undefined);
        }
        else if(response.body.error)
        {
            Callback("unable to find location",undefined);
           
        } else {
            Callback(undefined, response.body.hourly.summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }

        });
    }
    module.exports=forecast;