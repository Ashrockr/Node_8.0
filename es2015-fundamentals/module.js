//JAVA : Package, .NET : Namespace, JS : Module
//1. To avoid Naming Collisions
//2. To organize the logically relates stuff together.
/*It is a Feaute of JavaScript not only for ES2015 */

//IIFE : Immediately invoking Function Expression
/*var i = (function(){
    return 5;
})();*/

/*Module Revealing Pattern */
var Calculator = (function () {
    var _add = (a, b) => a + b;
    var _multiply = (a, b) => a * b;
    return {
        add:_add,
        multiply:_multiply
    }
})();
console.log(Calculator.add(4,5));
console.log(Calculator.multiply(4,5));

