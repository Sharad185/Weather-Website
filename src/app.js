const express = require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');
const app = express()
const port = process.env.PORT || 3000
console.log(__dirname);
console.log(__filename);
console.log(path.join(__dirname,'../public'));
app.set('view engine','hbs');
app.use(express.static(path.join(__dirname,'../public')));
app.set('views',path.join(__dirname,'../template/views'));

hbs.registerPartials(path.join(__dirname,'../template/partials'));

app.get('',(req,res)=>
{
    res.render('index',{
        title:'weather',
       
    });
})
app.get('/about',(req,res)=>
{
   
})

app.get('/weather',(req,res)=>
{   console.log(req.query.scope);
    if(!req.query.scope)
    {
    return  res.send({error:"Plese provide the good result"})
    }
      else
    {
        geocode(req.query.scope,(error,{latitude,longitude,location}={})=>{
                
             
            latitude=JSON.stringify(latitude);
            longitude=JSON.stringify(longitude);
            if(error)
            {
                   return res.send({error:error});
            }
            console.log(latitude+ " "+longitude);
            forecast(latitude,longitude,(error,forecast_data)=>{
                if(error)
                {
                       return res.send({error:error});
                }
                    
                res.send({result:JSON.stringify(location),
                forecast_data:JSON.stringify(forecast_data)})
          console.log(JSON.stringify(location));
          console.log(JSON.stringify(forecast_data));
        });
    });
    
    }

    // res.render('about',{
    //     title:'About',
    //     name:'My name is Sharad'
    // });
})
app.get('/help',(req,res)=>
{
    res.render('help',{
        title:'Help',
        name:'Some use ful keyword are given below'
    });
})


app.listen(port, () => console.log(`Example ap listening on port ${port}!`))