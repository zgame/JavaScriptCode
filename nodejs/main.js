let currentTime = require('./currentTime');

function abc() {
    console.debug("test");
    let out = 'outzzzzz';
    console.debug("out:",out);

    let data ={};
    data["1"] = 1;
    


    let sttr = JSON.stringify(data,null,4);
    console.debug("data json:",sttr);

    console.debug("---------------------------------");

    let a = [];
    for(var i=0;i<10;i++){
        a[i] = function(){
            a[100]= ()=> {
                console.debug("100ss");
            };
            console.log(i);
        }
    }
    a[6]();
    a[100]();

    // let d1 = new Date();
    // d1.format("yyyy-MM-dd hh:mm:ss");
    // console.info("dddddd");
    console.info("",currentTime());

}



abc();