const API_URL = "/api/users";

document.addEventListener("DOMContentLoaded", fetchUsers);

function fetchUsers() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const userTable = document.getElementById("userTable");
            userTable.innerHTML = "";
            data.users.forEach(user => {
                userTable.innerHTML += `
                    <tr data-id="${user.id}">
                        <td>${user.id}</td>
                        <td class="name">${user.name}</td>
                        <td class="email">${user.email}</td>
                        <td>
                            <button onclick="update(${user.id})" class="btn-icon btn-edit">✏️</button>
                            <button onclick="deleteUser(${user.id})" class="btn-icon btn-delete">🗑️</button>
                        </td>
                    </tr>
                `;
            });
        });
}

document.getElementById("addUserForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById("addUserForm").reset();
        fetchUsers();
        showNotification('User added successfully!', 'success');
    });
});

function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        }).then(() => {
            fetchUsers();
            showNotification('User deleted successfully!', 'success');
        });
    }
}

function update(id) {
    const row = document.querySelector(`tr[data-id='${id}']`);
    const nameCell = row.querySelector(".name");
    const emailCell = row.querySelector(".email");
    const currentName = nameCell.textContent;
    const currentEmail = emailCell.textContent;

    nameCell.innerHTML = `
        <input type="text" class="form-control editName" value="${currentName}" />
    `;
    emailCell.innerHTML = `
        <input type="email" class="form-control editEmail" value="${currentEmail}" />
    `;

    const actionsCell = row.querySelector("td:last-child");
    actionsCell.innerHTML = `
        <button onclick="submitUpdate(${id})" class="btn-icon btn-save">✓</button>
        <button onclick="cancelUpdate(${id})" class="btn-icon btn-cancel">✗</button>
    `;
}

function submitUpdate(id) {
    const row = document.querySelector(`tr[data-id='${id}']`);
    const name = row.querySelector(".editName").value;
    const email = row.querySelector(".editEmail").value;

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name, email })
    })
    .then(response => response.json())
    .then(() => {
        fetchUsers();
        showNotification('User updated successfully!', 'success');
    });
}

function cancelUpdate(id) {
    fetchUsers();
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}
