const inputTask = document.querySelector('#task');
const form = document.querySelector('#task-form');
const ul = document.querySelector('.collection');
const clear = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

form.addEventListener('submit', addTask);
ul.addEventListener('click', removeTask);
clear.addEventListener('click', clearTasks);
filter.addEventListener('keyup', filterTask);

// Showlist Function
function showList(){

    // Empty The List
    ul.innerHTML = null;

    let arr = JSON.parse(localStorage.getItem('tasks'));
    if(arr === null){
        document.querySelector('h5').textContent = 'NO TASK';
    }
    else if(arr.length === 0){
        document.querySelector('h5').textContent = 'NO TASK';
    }
    else{

        document.querySelector('h5').textContent = ` TASKS = ${arr.length}`;

        let tasks = JSON.parse(localStorage.getItem('tasks'));
        for(let k=0; k<tasks.length; k++){

            // create li
            let li = document.createElement('li');
            li.className = 'collection-item';

            // Add input value to li
            li.textContent = tasks[k];

            // create link
            let a = document.createElement('a');
            a.setAttribute('href', '#');
            a.classList = 'delete-item secondary-content';
            
            // create icon
            let i = document.createElement('i');
            i.classList = 'fa fa-remove';

            // append icon to link
            a.appendChild(i);

            // append link to li
            li.appendChild(a);

            // append li to ul
            ul.appendChild(li);

        }

    }
}

showList();

// Add Task Function
function addTask(e){

    if(inputTask.value != ''){
        let task = inputTask.value.toUpperCase();

        let tasks;

        if(localStorage.getItem('tasks') === null){
            tasks = [];
        }
        else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        tasks.push(task);
        
        localStorage.setItem('tasks', JSON.stringify(tasks));

        inputTask.value = '';
    }
    else{
        alert('Input Field is empty!');
    }
    showList();
    e.preventDefault();
}

// Filter Task Function
function filterTask(e){
    let task = e.target.value.toUpperCase();

    for(let i=0; i<ul.children.length; i++){
        if(ul.children[i].textContent.indexOf(task) != -1){
            ul.children[i].style.display = 'block';
        }
        else{
            ul.children[i].style.display = 'none';
        }
    }
}

// Remove Task Function
function removeTask(e){

    if(e.target.parentElement.classList.contains('delete-item')){
        let removeItem = e.target.parentElement.parentElement.textContent;
        tasks = JSON.parse(localStorage.getItem('tasks'));

        for(let j=0; j<tasks.length; j++){
            if(removeItem === tasks[j]){
                tasks.splice(j,1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        }
        alert(`${removeItem} is removed`);
        showList();
    }
    e.preventDefault();
}

// Clear All Tasks Function
function clearTasks(e){
    let arr = JSON.parse(localStorage.getItem('tasks'));
    if(arr !== null  && arr.length !== 0){

        if(confirm('Do you want to clear all tasks?'))
        localStorage.removeItem('tasks');

        showList();

    }
    else{
        alert('No Task to remove');
    }

    e.preventDefault();
}


