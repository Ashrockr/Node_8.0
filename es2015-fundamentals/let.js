(function(){
    let i = 10;
    if(true){
        let i = 100;
        console.log(`Inside the block I = ${i}`);
    }
    console.log(`Outside the block I = ${i}`);
})(); 

//let keyword will maintain the scope
//Variable hoisting