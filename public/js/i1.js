function addNewField1() {
    let newNode = document.createElement('textarea');
    newNode.classList.add('form-control');
    newNode.classList.add('weField');
    newNode.setAttribute('rows', 3);
    newNode.classList.add('mt-2');

    let weOb = document.getElementById('we');
    let weAddButtonOb = document.getElementById('weAddButton');

    weOb.insertBefore(newNode, weAddButtonOb);
}

function addNewField2() {
    let newNode = document.createElement('textarea');
    newNode.classList.add('form-control');
    newNode.classList.add('edField');
    newNode.setAttribute('rows', 3);
    newNode.classList.add('mt-2');

    let edOb = document.getElementById('ed');
    let edAddButtonOb = document.getElementById('edAddButton');

    edOb.insertBefore(newNode, edAddButtonOb);
}

function addNewField3() {
    let newNode = document.createElement('textarea');
    newNode.classList.add('form-control');
    newNode.classList.add('ceField');
    newNode.setAttribute('rows', 3);
    newNode.classList.add('mt-2');

    let ceOb = document.getElementById('ce');
    let ceAddButtonOb = document.getElementById('ceAddButton');

    ceOb.insertBefore(newNode, ceAddButtonOb);
}

function generateCv() {
    // Capture the values from the form
    let nameField = document.getElementById("nameField").value;
    let contactField = document.getElementById("contactField").value;
    let emailField = document.getElementById("emailField").value;
    let addressField = document.getElementById("addressField").value;
  
    let linkedinField = document.getElementById("linkedinField").value;
    let gitField = document.getElementById("gitField").value;
    let fbField = document.getElementById("fbField").value;
    let stField = document.getElementById("stField").value;
  
    let education = document.getElementById("objField").value;
    let skills = document.querySelectorAll(".weField");
    let projects = document.querySelectorAll(".edField");
    let certifications = document.querySelectorAll(".ceField");
  
    // Populate the template dynamically
    document.getElementById("nameT1").innerText = nameField;
    document.getElementById("contactT").innerText = contactField;
    document.getElementById("emailT").innerText = emailField;
    document.getElementById("addT1").innerText = addressField;
  
    document.getElementById("lkT").href = linkedinField;
    document.getElementById("gitT").href = gitField;
    document.getElementById("fbT").href = fbField;
    document.getElementById("stT").href = stField;
  
    document.getElementById("objectiveT").innerText = education;
  
    // Populate Skills, Projects, and Certifications
    populateList(skills, "weT");
    populateList(projects, "edT");
    populateList(certifications, "cerT");
  
    // Switch to the CV template view
    document.getElementById("resume-form").style.display = "none";
    document.getElementById("resume-template").style.display = "block";
  }
  
  // Helper function to populate list items dynamically
  function populateList(fields, targetId) {
    let targetElement = document.getElementById(targetId);
    targetElement.innerHTML = "";
    fields.forEach((field) => {
      let value = field.value.trim();
      if (value) {
        let li = document.createElement("li");
        li.innerText = value;
        targetElement.appendChild(li);
      }
    });
  }
  
  function printCv() {
    window.print();
  }
  

