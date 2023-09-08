const Employee = require('./employee')

class Manager extends Employee {
    constructor(name, salary, title, manager = null) {
        super(name, salary, title, manager)
        this.employees = [];
    }
    addEmployee(employee){
        this.employees.push(employee);
    }

    _totalSubSalary(){
        let sum = 0;
        for (let employee of this.employees){
            sum += employee.salary;
            if (employee instanceof Manager) {
                sum += employee._totalSubSalary()
            }
        }
        return sum;
    }

    calculateBonus(multiplier){
        let totalSalary = this._totalSubSalary() + this.salary;
        return totalSalary * multiplier;
    }
}

const splinter = new Manager('Splinter', 100000, 'Sensei');
const leo = new Manager('Leonardo', 90000, 'Ninja', splinter);
const raph = new Manager('Raphael', 90000, 'Ninja', leo);
const mikey = new Employee('Michelangelo', 85000, 'Grasshopper', raph);
const donnie = new Employee('Donatello', 85000, 'Grasshopper', raph);

console.log(splinter.calculateBonus(0.05)); // => 22500

///////////////////////////////////
module.exports = Manager;
