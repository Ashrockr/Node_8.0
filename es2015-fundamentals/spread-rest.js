var sample = function(a,b,...args){ //rest operator
    console.log(a);
    console.log(b);
    console.log(args);//array
}

let numbers = [7,8,9,10];
sample(4,5,...numbers); //Spread Operator (for destruct)