const API_URL = "/api/users";
//or
//const API_URL = "http://localhost:3000/api/users";
function fetchUser() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            if (!data || !Array.isArray(data)) {
                console.error('Expected array of users, but got:', data);
                return;
            }

            const userTable = document.getElementById('table');
            userTable.innerHTML = "";

            data.forEach(user => {
                const formattedDate = user.date ? new Date(user.date).toISOString().split("T")[0] : "";
                userTable.innerHTML += `
                    <tr data-id="${user.id}">
                        <td class="name-cell">${user.name}</td>
                        <td class="email-cell">${user.email}</td>
                        <td class="date-cell">${formattedDate}</td>
                        <td class="actions">
                            <button onclick="update(${user.id})" class="btn-icon btn-edit">✏️</button>
                            <button onclick="deleteUser(${user.id})" class="btn-icon btn-delete">🗑️</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error('Error fetching users:', error));
}

document.addEventListener('DOMContentLoaded', fetchUser);

document.getElementById('user').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.querySelector('.email').value.trim();
    const date = document.querySelector('.date').value;

    if (!name || !email || !date) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    fetch(API_URL, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, date })
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('user').reset();
        fetchUser();
        showNotification('User added successfully', 'success');
    })
    .catch(error => console.error('Error adding user:', error));
});


function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        .then(() => {
            fetchUser();
            showNotification('User deleted successfully', 'success');
        })
        .catch(error => console.error('Error deleting user:', error));
    }
}

function update(id) {
    const row = document.querySelector(`tr[data-id="${id}"]`);
    const nameCell = row.querySelector('.name-cell');
    const emailCell = row.querySelector('.email-cell');
    const dateCell = row.querySelector('.date-cell');

    const currentName = nameCell.textContent;
    const currentEmail = emailCell.textContent;
    const currentDate = dateCell.textContent;

    nameCell.innerHTML = `<input type="text" class="edit-input editName" value="${currentName}" />`;
    emailCell.innerHTML = `<input type="email" class="edit-input editEmail" value="${currentEmail}" />`;
    dateCell.innerHTML = `<input type="date" class="edit-input editDate" value="${new Date(currentDate).toISOString().split("T")[0]}" />`;

    row.querySelector(".actions").innerHTML = `
        <button onclick="saveUpdate(${id})" class="btn-icon btn-save">💾</button>
        <button onclick="fetchUser()" class="btn-icon btn-cancel">❌</button>
    `;
}

function saveUpdate(id) {
    const row = document.querySelector(`tr[data-id="${id}"]`);
    const name = row.querySelector('.editName').value.trim();
    const email = row.querySelector('.editEmail').value.trim();
    const date = row.querySelector('.editDate').value;

    if (!name || !email || !date) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, date })
    })
    .then(response => response.json())
    .then(() => {
        fetchUser();
        showNotification('User updated successfully', 'success');
    })
    .catch(error => console.error('Error updating user:', error));
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}
