document.addEventListener("DOMContentLoaded", function() {
    showData();
});

function openUserForm() {
    document.getElementById('myForm').reset();
    var modal1 = new bootstrap.Modal(document.getElementById('userForm'));
    modal1.show();
}

function validateForm() {
    var name = document.getElementById('name').value;
    var lastName = document.getElementById('lastName').value;
    var age = document.getElementById('age').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var city = document.getElementById('city').value;

    if (name.trim() === "") {
        alert("Name is required");
        return false;
    }

    if (lastName.trim() === "") {
        alert("Last Name is required");
        return false;
    }

    if (age < 1) {
        alert("Age must be greater than 0");
        return false;
    }

    if (email.trim() === "" || !email.includes("@")) {
        alert("Invalid email address");
        return false;
    }

    if (phone.trim() === "") {
        alert("Phone number is required");
        return false;
    }

    if (city.trim() === "") {
        alert("City is required");
        return false;
    }

    return true;
}

function showData() {
    var peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];
    var html = "";

    peopleList.forEach(function(element, index) {
        html += "<tr>";
        html += `<td>${element.name}</td>`;
        html += `<td>${element.lastName}</td>`;
        html += `<td>${element.age}</td>`;
        html += `<td>${element.email}</td>`;
        html += `<td>${element.phone}</td>`;
        html += `<td>${element.city}</td>`;
        html += `<td><button onclick="deleteUserData(${index})" class="btn btn-danger">Delete</button><button onclick="editUserData(${index})" class="btn btn-warning m-2">Edit</button></td>`;
        html += "</tr>";
    });

    document.getElementById('dataBody').innerHTML = html;
}

function addUserData(event) {
    event.preventDefault();

    if (validateForm()) {
        var name = document.getElementById('name').value;
        var lastName = document.getElementById('lastName').value;
        var age = document.getElementById('age').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var city = document.getElementById('city').value;

        var userData = {
            name: name,
            lastName: lastName,
            age: age,
            email: email,
            phone: phone,
            city: city
        };

        var peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];
        peopleList.push(userData);
        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();

        var modal1 = new bootstrap.Modal(document.getElementById('userForm'));
        modal1.hide();
        document.querySelector('#userForm').style.display = 'none';
        window,location.reload();
    }
}


function deleteUserData(index) {
    var peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];
    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

function editUserData(index) {
    var peopleList = JSON.parse(localStorage.getItem("peopleList")) || [];
    var userData = peopleList[index];

    document.getElementById('name').value = userData.name;
    document.getElementById('lastName').value = userData.lastName;
    document.getElementById('age').value = userData.age;
    document.getElementById('email').value = userData.email;
    document.getElementById('phone').value = userData.phone;
    document.getElementById('city').value = userData.city;

    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));

    var modal = new bootstrap.Modal(document.getElementById('userForm'));
    modal.show();
}
