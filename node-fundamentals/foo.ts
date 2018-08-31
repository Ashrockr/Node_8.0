//TypeScript is superset of ES2015

var str: string = 'Using TypeScript we can make JavaScript as Strongly Typed';

var add = (a: number, b: number): number => a + b;
console.log(`Result = ${add(5,8)}`);

class Employee{}
class Manager extends Employee{}