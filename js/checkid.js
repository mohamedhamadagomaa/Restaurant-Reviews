console.log('work');
var xhr = new XMLHttpRequest();
xhr.open('GET','./data/restaurants.json');
xhr.onload = function(){
    let xhrdata = JSON.parse(xhr.responseText);
    let submit = document.querySelector('#submit');
    let resid = document.querySelector('#resid');
    let modellink = document.querySelector('#modelopen');
    let modellink2 = document.querySelector('#modelopen2');
    let restaurannid=0;
   
submit.addEventListener('click',function(e){
            for(let e = 0 ; e < xhrdata.restaurants.length ; e++){
        
                if(xhrdata.restaurants[e].id == resid.value){
                        console.log(e);
                        restaurannid = xhrdata.restaurants[e].id;
                        //  modellink.click(); 
                         console.log(restaurannid);       
                }
                else {
                    console.log(' ID not found');
                    // modellink2.click();
                }  
            }
            if(restaurannid == resid.value){
                modellink.click();
            }
            else{
                modellink2.click();
            }
        })
}
xhr.send();