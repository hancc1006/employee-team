const inquirer = require("inquirer");
const fs = require("fs");
let renderFile = require("./lib/htmlRenderer");
const Manager = renderFile.createManager;
const Engineer = renderFile.createEngineer;
const Intern = renderFile.createIntern;
const renderHTML = renderFile.renderMain;


function teamMembers(){
    inquirer.prompt([{
        
        type: "input",
        message: "What is your name?",
        name: "name",
        validate: function(answer){
           if (answer.length < 1) {
            return console.log("A valid name is required.")
        } else{
           return true;
           }
       }
      },
      {
          type: "number",
          message:"What is your ID?",
          name: "id",
          validate: function(answer){
            if (answer.length < 1) {
               return console.log("An ID is required.")
            }  
           else{
              return true;
            }
          }
      },
      {
        type: "email",
        message: "What is your email address?",
        name: "email",
        validate: function(answer){
            if (answer.length < 1) {
               return console.log("An email is required.")
           } 
           else{
              return true;
            }
        }
      },
      {
        type: "list",
        message:"What is your role?",
        name:"role",
        choices: ["Manager", "Engineer", "Intern" ],
        validate: function(answer){
            if (answer.length < 1) {
                return console.log("A role must be selected.");
            } 
           else{
              return true;
            }
          }
      },
    ]).then(function({name,id,email,role}){
        console.log("This is working");
        switch(role){
            case "Manager":
                inquirer.prompt({
                    type:"input",
                    message:"Enter an office number: ",
                    name: "officeNumber"
                }).then(function({officeNumber}){
                    Manager(name, id, email, officeNumber);
                    addPerson();
                    
                })
                break;
            case "Engineer":
                inquirer.prompt({
                    type:"input",
                    message:"Enter your Github username: ",
                    name: "github"
                }).then(function(github){
                    Engineer(name,id,email,github);
                    addPerson();
                })
                break;
            case "Intern":
                inquirer.prompt({
                    type:"input",
                    message:"Enter school: ",
                    name:"school"
                }).then(function(school){
                    Intern(name,id,email,school);
                    addPerson();
                })
                break;
        }
    }).catch(error =>{
        console.log("WHERE IS THE ERROR?");
    })
}

function addPerson(){
    inquirer.prompt({
        type:"confirm",
        message: "Add more team members?",
        name:"addPerson"
    }).then(
        function({addPerson}) {
            console.log("Add member", addPerson)
            if(addPerson) {
                teamMembers();
            } else {
                renderHTML();
            }
        }
    )
    .catch(error => {
        console.log("Error adding member", error)
        throw error;
    })
}
teamMembers();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
