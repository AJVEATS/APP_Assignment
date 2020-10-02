
/**
 *
 * This function sends an GET API request to the back end python flask server using the http method GET and
 * the API path '/api/users?page=' + the number of the page that the user is requesting.
 *
 * The if statement gets the status response from the backend. If the status is an error code it sends an
 * alert with the response code status. If the response status code is between 200 and 300 or 4 it creates an
 * object from JSON from the back end. It then calls the function renderUsers() with a parameter of the created
 * object. If the response status code is not in the range an alert is triggered which displays the error code.
 *
 *   @param pageNumber  the current page number of the table
 *
 */

function getUsers(pageNumber) {

    //console.log("getUsers() initiated");

    'use strict';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/users?page=' + String(pageNumber), true);
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
            const objUsers = JSON.parse(xhr.responseText);
            renderUsers(objUsers);
            //console.log("This is what JSON.parse(xhr.responseText)) returns: " + JSON.parse(xhr.responseText));
            //console.log("This is the value of objUsers: " + objUsers);
        } else {
            alert("Error " + xhr.status);
        }
    };
    xhr.send();
}

/**
 *
 * This function is used to render the data in the object objectUsers which has the data of the users from the
 * back end. It then loops through the object and then places the data into the hollow table in users.html.
 * The function also get the page number from the users.html and then replaces it with the current page number
 * so it display what page the user is on.
 *
 * @param objUsers  object of the users data from the back end server
 *
 */

function renderUsers(objUsers) {

    //console.log("renderUsers() initiated");

    const pageNo = document.getElementById('pageNumber');
    pageNo.innerText = objUsers.page;

    for (let i = 0; i < objUsers.data.length; i++) {
        let userNumber = document.getElementById("number" + i);
        let userEmail = document.getElementById("email" + i);
        let userName = document.getElementById("firstName" + i);
        let userSurname = document.getElementById("surname" + i);
        let userImage = document.getElementById("image" + i).src = objUsers.data[i].avatar;

        userNumber.textContent = objUsers.data[i].id;
        userEmail.textContent = objUsers.data[i].email;
        userName.textContent = objUsers.data[i].first_name;
        userSurname.textContent = objUsers.data[i].last_name;
    }
}

/**
 *
 * This function sends an GET API request to the back end python flask server using the http method GET and
 * the API path '/api/users/' + the id of the user that the user is requesting to see.
 * This function also changes the userID depending on whether the user is on page 1 or 2, and increasing the id by
 * 6 if the user is on page 2.
 *
 * The if statement gets the status response from the backend. If the status is an error code it sends an
 * alert with the response code status. If the response status code is between 200 and 300 or 4 it creates an
 * object from JSON from the back end. It then calls the function renderUser() with a parameter of the created
 * object. If the response status code is not in the range an alert is triggered which displays the error code.
 *
 *   @param userID  The id of the user that the user has select by clicking on their row from the table
 *
 */

function getUser(userID) {
    //console.log("getUser() initiated");
    const pageNumber = document.getElementById('pageNumber').textContent;
    if (pageNumber === "2") {
        userID = userID + 6;
    }
    //console.log("The users page number is " + document.getElementById('pageNumber').textContent);
    //console.log("UserId is: " + userID);
    'use strict';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/users/' + String(userID), true);
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
            //console.log("if statement initiated");
            const objUser = JSON.parse(xhr.responseText);
            //console.log("This is what JSON.parse(xhr.responseText)) returns: " + JSON.parse(xhr.responseText));
            //console.log("This is the value of objUser: " + objUser);
            renderUser(objUser);
        } else {
            alert("Error " + xhr.status);
        }
    };
    xhr.send();
}

/**
 *
 * This function is used to render the data in the object objectUser which has the data of the users from the
 * back end. It then loops through the object and then places the data into the corresponding input boxes in the update
 * or delete a user section in users.html.
 * The function also get the page number from the users.html and then replaces it with the current page number
 * so it display what page the user is on.
 *
 * @param objUser       object of the user's data from the back end server
 *
 */

function renderUser(objUser) {
    //console.log("renderUsers() initiated");
    let userNumber = document.getElementById("updateUserID");
    let userEmail = document.getElementById("updateUserEmail");
    let userName = document.getElementById("updateUserFirstName");
    let userSurname = document.getElementById("updateUserLastName");
    let userImage = document.getElementById("updateUserAvatar").src = objUser.data.avatar;

    userNumber.value = objUser.data.id;
    userEmail.value = objUser.data.email;
    userName.value = objUser.data.first_name;
    userSurname.value = objUser.data.last_name;
}

/**
 *
 * This function gets the value inputted into the input boxes from the update
 * or delete a user section of web page.
 *
 * It then validates the data inputted to ensure that the data fields are not empty, if they are empty an alert
 * is triggered with a message tell the user to fill in the field.
 *
 * It then places the inputted data into an object with the same properties that the back end list dictionaries uses.
 * The object created is then turned into a JSON string using JSON.stringify()
 *
 * The function then creates a PUT API request to the python flask back end server with the API path
 * '/api/user/' + the new JSON version of the object which contains the updated data of the user
 *
 * The if statement gets the status response from the backend. If the status is an error code it sends an
 * alert with the response code status. If the response status code is between 200 and 300 or 4 it end the statement.
 * But if the response status code is not in the range an alert is triggered which displays the error code.
 *
 */

function updateUserInfo() {
    //console.log("update user initiated");
    const updatedUserID = parseInt(document.getElementById("updateUserID").value);
    const updatedUserEmail = document.getElementById("updateUserEmail").value;
    const updatedUserFirstName = document.getElementById("updateUserFirstName").value;
    const updatedUserLastName = document.getElementById("updateUserLastName").value;

    if (updatedUserID !== parseInt(updatedUserID, 10)) {
        alert("User ID must be filled in");
    } else if (updatedUserEmail === "") {
        alert("Email must be filled in");
    } else if (updatedUserFirstName === "") {
        alert("First name must be filled in");
    } else if (updatedUserLastName === "") {
        alert("Last name must be filled in");
    }

    let updatedUser = {
        'id': updatedUserID,
        "email": updatedUserEmail,
        "first_name": updatedUserFirstName,
        "last_name": updatedUserLastName
    };

    let updatedUserJSON = JSON.stringify(updatedUser);
    /*
    console.log(updatedUser);
    console.log(updatedUserJSON);
    */
    'use strict';
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', '/api/user/' + updatedUserJSON, true);
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {

        } else {
            alert("Error " + xhr.status);
        }
    };
    xhr.send();
}

/**
 *
 * This function get the id of the user which is currently being displayed in the update
 * or delete a user section of the web page.
 *
 * The function then creates a DELETE API request to the python flask back end server with the API path
 * '/api/user/' + the id of the user that the user wants deleted
 *
 * The if statement gets the status response from the backend. If the status is an error code it sends an
 * alert with the response code status. If the response status code is between 200 and 300 or 4 it end the statement.
 * But if the response status code is not in the range an alert is triggered which displays the error code.
 *
 * @param userID   The id of the user that the user want to delete
 *
 */

function deleteUser(userID) {
    //console.log("deleteUser() initiated");
    userID = document.getElementById("updateUserID").value;
    //console.log("The usersID is: " + userID);
    'use strict';
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/api/user/' + String(userID), true);
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {

        } else {
            alert("Error " + xhr.status);
        }
    };
    xhr.send();
}

/**
 *
 * This function gets the value inputted into the input boxes from the create a user section of the web page.
 * It then validates the data inputted to ensure that the data fields are not empty, if they are empty an alert
 * is triggered with a message tell the user to fill in the field.
 *
 * It then places the inputted data into an object with the same properties that the back end list dictionaries uses.
 * The object created is then turned into a JSON string using JSON.stringify()
 *
 * The function then creates a PUT API request to the python flask back end server with the API path
 * '/api/user/' + the new JSON version of the object which contains the data of the new user
 *
 * The if statement gets the status response from the backend. If the status is an error code it sends an
 * alert with the response code status. If the response status code is between 200 and 300 or 4 it end the statement.
 * But if the response status code is not in the range an alert is triggered which displays the error code.
 *
 */

function newUser() {
    //console.log("newUser() initiated");
    const newUserEmail = document.getElementById("newUserEmail").value;
    const newUserFirstName = document.getElementById("newUserFirstName").value;
    const newUserLastName = document.getElementById("newUserLastName").value;

    if (newUserEmail === "") {
        alert("Email address must be filled in");
    } else if (newUserFirstName === "") {
        alert("First name must be filled in");
    } else if (newUserLastName === "") {
        alert("Last name must be filled in");
    }

    /*
    console.log(newUserEmail);
    console.log(newUserFirstName);
    console.log(newUserLastName);
    console.log(newUserAvatar);
     */

    let newUser = {
        'id': 1,
        "email": newUserEmail,
        "first_name": newUserFirstName,
        "last_name": newUserLastName
    };

    let newUserJSON = JSON.stringify(newUser);

    'use strict';
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/user/' + newUserJSON, true);
    xhr.onload = function () {
        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {

        } else {
            alert("Error " + xhr.status);
        }
    };
    xhr.send();
}

/**
 *
 * This function disables the previous page button if the user is on the first page
 *
 */

function nextPage() {
    const previousButton = document.getElementById('btnPrevious');
    const nextButton = document.getElementById('btnNext');
    previousButton.disabled = false;
    nextButton.disabled = true;
}

/**
 *
 * This function disables the next page button if the user is on the second page
 *
 */

function previousPage() {
    const previousButton = document.getElementById('btnPrevious');
    const nextButton = document.getElementById('btnNext');
    previousButton.disabled = true;
    nextButton.disabled = false;
}

