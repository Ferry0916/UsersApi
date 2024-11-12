const uri = "api/Users";
let users = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    const addUsernameTextbox = document.getElementById('add-username');
    const addFirstNameTextbox = document.getElementById('add-firstName');
    const addLastNameTextbox = document.getElementById('add-lastName');
    const addEmailTextbox = document.getElementById('add-email');
    const addPasswordTextbox = document.getElementById('add-password');
    const addPhoneTextbox = document.getElementById('add-phone');
    const addUserStatusTextbox = document.getElementById('add-userStatus');

    const item = {
        username: addUsernameTextbox.value.trim(),
        firstName: addFirstNameTextbox.value.trim(),
        lastName: addLastNameTextbox.value.trim(),
        email: addEmailTextbox.value.trim(),
        password: addPasswordTextbox.value.trim(),
        phone: addPhoneTextbox.value.trim(),
        userStatus: addUserStatusTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addUsernameTextbox.value = '';
            addFirstNameTextbox.value = '';
            addLastNameTextbox.value = '';
            addEmailTextbox.value = '';
            addPasswordTextbox.value = '';
            addPhoneTextbox.value = '';
            addUserStatusTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}



//// BACK TICK





function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = users.find(item => item.id === id);

    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-username').value = item.username;
    document.getElementById('edit-firstName').value = item.firstName;
    document.getElementById('edit-lastName').value = item.lastName;
    document.getElementById('edit-email').value = item.email;
    document.getElementById('edit-password').value = item.password;
    document.getElementById('edit-phone').value = item.phone;
    document.getElementById('edit-userStatus').value = item.userStatus;

    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        username: document.getElementById('edit-username').value.trim(),
        firstName: document.getElementById('edit-firstName').value.trim(),
        lastName: document.getElementById('edit-lastName').value.trim(),
        email: document.getElementById('edit-email').value.trim(),
        password: document.getElementById('edit-password').value.trim(),
        phone: document.getElementById('edit-phone').value.trim(),
        userStatus: document.getElementById('edit-userStatus').value.trim()
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();
    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const username = (itemCount === 1) ? 'user' : 'users';
    document.getElementById('counter').innerText = `${itemCount} ${username}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('users');
    tBody.innerHTML = '';

    _displayCount(data.length);

    data.forEach(item => {
        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let usernameNode = document.createTextNode(item.username);
        td1.appendChild(usernameNode);

        let td2 = tr.insertCell(1);
        let firstNameNode = document.createTextNode(item.firstName);
        td2.appendChild(firstNameNode);

        let td3 = tr.insertCell(2);
        let lastNameNode = document.createTextNode(item.lastName);
        td3.appendChild(lastNameNode);

        let td4 = tr.insertCell(3);
        let emailNode = document.createTextNode(item.email);
        td4.appendChild(emailNode);

        let td5 = tr.insertCell(4);
        let passwordNode = document.createTextNode(item.password);
        td5.appendChild(passwordNode);

        let td6 = tr.insertCell(5);
        let phoneNode = document.createTextNode(item.phone);
        td6.appendChild(phoneNode);

        let td7 = tr.insertCell(6);
        let userStatusNode = document.createTextNode(item.userStatus);
        td7.appendChild(userStatusNode);

        let td8 = tr.insertCell(7);
        let editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', () => displayEditForm(item.id));
        td8.appendChild(editButton);

        let td9 = tr.insertCell(8);
        let deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => deleteItem(item.id));
        td9.appendChild(deleteButton);
    });

    users = data;
}