const contentContainer = document.getElementsByClassName('content-container')[0];

let tasks = getTasksFromLS();
    

contentContainer.innerHTML = `     
    <h1 class="page-title">Tasks List</h1>

    <div class="task-add">
        <input class="task-add__title" type="text" placeholder="Task title">
    
        <button class="task-add__btn-add button none">Add Task</button>
        <input type = "checkbox" class="task-checkbox">Readonly

    </div>       
  
    <div class="tasks">
        <div class="tasks__list">
            ${(tasks !== null)? tasks.map(task => this.getTaskHTML(task)).join('\n '): ""}
        </div>
    </div>            
    `;

const addTaskTitle = document.getElementsByClassName('task-add__title')[0],
    addTaskBtn = document.getElementsByClassName('task-add__btn-add')[0],
    tasksContainer = document.getElementsByClassName('tasks')[0],
    tasksList = document.getElementsByClassName('tasks__list')[0],
    checkReadonly = document.getElementsByClassName('task-checkbox')[0];

    addTaskTitle.addEventListener('keyup', () => (!addTaskTitle.value.trim() || checkReadonly.checked)? addTaskBtn.classList.add("none") : addTaskBtn.classList.remove("none"));
    addTaskBtn.addEventListener('click', () => addTask(addTaskTitle, addTaskBtn, tasksList));
    checkReadonly.addEventListener('click', () => disableAll(addTaskTitle, addTaskBtn));

    tasksContainer.addEventListener('click', event => {
        const target = event.target,
            targetClassList = target.classList;

        switch(true) {
                case targetClassList.contains('task__btn-remove'):
                this.removeTask(target.parentNode.parentNode);
                break;
        }
    });

function addTask(addTaskTitle, addTaskBtn, tasksList) {
	const newTask = {
		id: generateID(),
		title: addTaskTitle.value.trim(),
	};
    if (tasks === null) tasks = []; 
    tasks.push(newTask);
    setTasksToLS(tasks);

	clearAddTask(addTaskTitle, addTaskBtn);

    tasksList.insertAdjacentHTML('beforeEnd', getTaskHTML(newTask));
}

function getTaskHTML(task) {
    return `
        <div class="task" data-id="${task.id}">
            <a class="task__title" data-id="${task.id}">${task.title}</a>
                
            <div class="task__buttons">
                <a class="task__btn-remove button">X</a>   
            </div>                            
        </div>
    `;
}

function clearAddTask(addTaskTitle, addTaskBtn) {
	addTaskTitle.value = '';
    addTaskBtn.classList.add("none")
}

function removeTask(taskContainer) {
    if (confirm('Are you sure?')) {
        tasks = tasks.filter(task => task.id !== taskContainer.dataset.id);
        setTasksToLS(tasks);

        taskContainer.remove();
    }
}

function disableAll(addTaskTitle, addTaskBtn) {
    const buttunsDelete = document.getElementsByClassName('task__btn-remove');

    for (let i = 0; i < buttunsDelete.length; i++){
        buttunsDelete[i].classList.toggle('none');
    }

    (checkReadonly.checked  || !addTaskTitle.value.trim())? addTaskBtn.classList.add("none") : addTaskBtn.classList.remove("none");
            
}

function getTasksFromLS() {
    return JSON.parse(localStorage.getItem('tasks'));
}

function setTasksToLS(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const generateID = () => {
    return Math.random().toString(36).substr(2, 10);
};