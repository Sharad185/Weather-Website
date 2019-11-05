const weatherform=document.querySelector('form');
const search=document.querySelector('input');
const message1=document.querySelector('.message1');
const message2=document.querySelector('.message2');
weatherform.addEventListener('submit',(event)=>
{
event.preventDefault();
const input=search.value;
console.log(input);
message1.textContent="Loading Content......"
message2.textContent=" "
fetch('http://localhost:3000/weather?scope=' + input).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            message1.textContent=data.error;
           console.log(data.error);
        } else {
            message1.textContent=data.result;
            message2.textContent=data.forecast_data;
           
        }
    })
})
})