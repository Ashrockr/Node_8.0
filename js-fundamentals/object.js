var foo = {}; //Associative Arrays(Key(string) - Value(any))
//Attaching Property to Object Dot Notation
foo.id = 108331;
//Attaching Property to Object using Square bracket Notation 
foo['name'] = 'Karthik';
console.log(foo);//{ id: 108331, name: 'Karthik' }
//Iterate the Properties of an object for ..in loop
for (var prop in foo) {
   console.log(prop,foo[prop]); //Access Key and Value use Square bracket Notation 
}


