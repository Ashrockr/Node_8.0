var Calculator = require('../sut/calculator');

//Should based bdd assertions
var should = require('chai').should();

//expect based bdd assertions
var expect = require('chai').expect;

//Mocha Testing Framework
describe('Testing the Calculator Class Methods', () => {
    var calc;
    //Run before all the test cases
    before(() => {
        calc = new Calculator();
    });

    it('Should add Two numbers',()=>{
        var actual = calc.add(5,6);
        var expected = 11;
        expected.should.equal(actual);
    });

    it('Should multiply Two numbers',()=>{
        var actual = calc.multiply(5,6);
        var expected = 30;
        expect(expected).to.equal(actual);
    });
    
    //Run after all the test cases
    after(() => {
        calc = null;
    });
});