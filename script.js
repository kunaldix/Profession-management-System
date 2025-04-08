let users = [];
let idCount = 0;

function handleSubmit() {
  const name = document.getElementById("name").value.trim();
  const profession = document.getElementById("profession").value.trim();
  const age = document.getElementById("age").value.trim();
  const message = document.getElementById("message");
  const list = document.querySelector(".list-container");
  const notFound = document.querySelector(".data-not-found");

  // Clear previous messages
  message.style.display = "none";

  // Validate inputs
  if (name === "" || profession === "" || age === "") {
    message.style.display = "block";
    message.className = "message-error";
    message.innerHTML = `<p>Error: Please fill in all fields before adding an employee</p>`;
    return;
  }

  // Create new user
  const user = {
    id: ++idCount,
    name: name,
    profession: profession,
    age: age,
  };

  // Add to array
  users.push(user);

  // Show success message
  message.style.display = "block";
  message.className = "message-success";
  message.innerHTML = `<p>Success: Employee Added</p>`;

  // Clear form
  document.getElementById("name").value = "";
  document.getElementById("profession").value = "";
  document.getElementById("age").value = "";

  // Update employee list
  displayEmployees();
}

function displayEmployees() {
  const list = document.querySelector(".list-container");
  const notFound = document.querySelector(".data-not-found");
  const itemContainer = document.querySelector(".item-container");

  // Clear previous entries
  itemContainer.innerHTML = "";

  if (users.length === 0) {
    notFound.style.display = "flex";
    list.style.display = "none";
  } else {
    notFound.style.display = "none";
    list.style.display = "block";

    // Create new entries
    users.forEach((user) => {
      const employeeDiv = document.createElement("div");
      employeeDiv.className = "employee-entry";
      employeeDiv.innerHTML = `
        <div class="para-container">
          <p class="name">${user.name}</p>
          <p>${user.profession}</p>
          <p>${user.age}</p>
        </div>
        <button onclick="deleteEmployee(${user.id})" id="delete-record">Delete</button>
      `;
      itemContainer.appendChild(employeeDiv);
    });
  }
}

function deleteEmployee(id) {
  // Remove employee from array
  users = users.filter((user) => user.id !== id);

  // Update display
  displayEmployees();

  // Show success message
  const message = document.getElementById("message");
  message.style.display = "block";
  message.className = "message-success";
  message.innerHTML = `<p>Success: Employee Deleted</p>`;

  // Hide message after 2 seconds
  setTimeout(() => {
    message.style.display = "none";
  }, 2000);
}
