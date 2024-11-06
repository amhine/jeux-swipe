

// Initialiser les compteurs
let taskCounter = {
    todo: 0,
    doing: 0,
    done: 0
};

function affichercnt() {
    let div = document.getElementById("heden");
    div.style.display = "block";
}

function updateTaskCounters() {
    document.getElementById("todo-conteur").textContent = taskCounter.todo;
    document.getElementById("doing-conteur").textContent = taskCounter.doing;
    document.getElementById("done-conteur").textContent = taskCounter.done;
}

// Fonction pour changer le statut de la tâche
function changeTaskStatus(taskItem, currentStatus) {
    let statuses = ['todo', 'doing', 'done'];
    let currentIndex = statuses.indexOf(currentStatus);

    
    if (currentIndex === -1) {
        alert("Statut invalide.");
        return;
    }

    // Passer au statut suivant
    currentIndex = (currentIndex + 1) % statuses.length; // Boucle à la première position après "done"
    const newStatus = statuses[currentIndex]; 

    taskCounter[currentStatus]--;
    taskItem.dataset.status = newStatus; 
    taskCounter[newStatus]++;

    document.getElementById(newStatus).appendChild(taskItem);

    updateTaskCounters();
}

document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let date = document.getElementById('date').value;
    let status = document.getElementById('status').value; 
    let type = document.getElementById('type').value;

    if (title && description && date && status && type) {

        let taskItem = document.createElement('div');
        taskItem.className = 'col div bg-white';

        taskItem.dataset.status = status; // stocke le statut dans l'élément

        taskItem.innerHTML = `
            <div class="p-3 mt-3 contenu">
                <h3>${title}</h3>
              <p>Description: ${description}</p>
                <p>Date: ${date}</p>
                <div>
                    <button type="button" class="btn btn-success edit-contenu mt-2">Edit</button>
                    <button type="button" class="btn btn-warning mt-2 delet-contenu">Delete</button>
                </div>
            </div>
     `;

        document.getElementById(status).appendChild(taskItem);
        
        taskCounter[status]++;
        updateTaskCounters();

        document.getElementById('task-form').reset();

        let contenuDiv = taskItem.querySelector('.contenu');
        if (type === 'P1') {
            contenuDiv.style.border = "2px solid red";    
        } else if (type === 'P2') {
            contenuDiv.style.border = "2px solid orange"; 
        } else if (type === 'P3') {
            contenuDiv.style.border = "2px solid green";  
        }

       let deleteButton = contenuDiv.querySelector('.delet-contenu');
deleteButton.addEventListener('click', function() {
    const currentStatus = taskItem.dataset.status; // Récupérer le statut courant
    taskItem.remove(); 
    taskCounter[currentStatus]--; // Décrémenter le compteur du statut courant
    updateTaskCounters(); // Mettre à jour les compteurs affichés
});

let editButton = contenuDiv.querySelector('.edit-contenu');
editButton.addEventListener('click', function() {
    let currentStatus = taskItem.dataset.status; // Récupérer le statut courant
    changeTaskStatus(taskItem, currentStatus); // Appel de la fonction pour changer le statut
});

    } else {
        alert("Veuillez remplir tous les champs");
    }
});

document.getElementById('exit-button').addEventListener('click', function() {
    document.getElementById('task-form').style.visibility = 'hidden';
});

document.getElementById('add-button').addEventListener('click', function() {
    document.getElementById('task-form').style.visibility = 'visible'; 
});
