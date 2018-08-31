const app = require('./helpers/app');

const should = require('chai').should();

//HTTP assertions can be tested
const supertest = require('supertest');

describe('Test-Suite contains test cases for my trainees to understand Mocha & Chai',()=>{
  
	it('should add 1+1 synchronously', ()=> {
		var onePlusOne = 1 + 1;
		onePlusOne.should.equal(2);
	});

     it('should add 1+1 asynchronously', (done)=> {
		var onePlusOne = 1 + 1;
		onePlusOne.should.equal(2);
        done(); //This will make this test case to wait till this test case completes
	});

    it('number, string and object', function (done) {
		var name = "Karthik";
		var age = 30;
		var foo = {fooVar : 'FooVariable'};
		name.should.be.a('string');
		name.should.have.length(7);
		age.should.be.below(40);
		age.should.be.within(25,35);
		foo.should.be.an('object');
		foo.should.have.property('fooVar')
		done();
	});

    it('Regular Expression', function (done) {
		var pincode = 560066;
		pincode.should.match(/^\d{6}$/);
		var email = "karthik.muthkrishnan@capgemini.com";
		email.should.match(/^\w+(\.\w+)?@\w+(\.[a-z]{2,3}){1,2}$/);
		done();
	});
	
    it('Should Satisy', function (done) {
		var pincode = 560066;
		pincode.should.satisfy(function(){
			var regex = /^\d{6}$/;
			return regex.test(pincode);
		});
		done();
	});

    it('Show throw error', function (done) {
		var errFn = function (){
			throw new Error('Custom Error');
		}
		errFn.should.throw(Error);
		errFn.should.throw(Error,/Custom Error/);
		done();
	});
	
	/*supertest http assertions without opening the browser and passing the endpoint we can test our code*/
	//Supertest test cases are Asynchronous so pass callback
    it('should access home page', function (callback) {
		supertest(app)
		.get('/')
		.expect(200)
		.end(function(err,res){
			res.status.should.equal(200);
		});
		callback();
	});

    it('should send a json response', function (callback) {
		supertest(app)
		.post('/')
		.expect('Content-Type', 'application/json; charset=utf-8',callback);
	});
	
   it('should return karthik as name in json format', function (callback) {
		supertest(app)
		.post('/')
		.expect({name:'Karthik'},callback);
	});
	
    it('should return 404', function (callback) {
		supertest(app)
		.get('/notfound')
		.expect(404)
		.end(function(err,res){
			res.status.should.equal(404);
		});
		callback();
	});
});