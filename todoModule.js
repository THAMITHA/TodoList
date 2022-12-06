var TodoListApp=(function(){let tasks = [];
    const tasksList = document.getElementById('list');
    const addTaskInput = document.getElementById('add');
    const tasksCounter = document.getElementById('tasks-counter');
    var a=10;
    async function fetchTodos(){
    //     //GET request
        // fetch('https://jsonplaceholder.typicode.com/todos')
        // .then(function(response){
        //     // console.log(response);
        //     return response.json();
        // }).then(function(data){
        //     // console.log(data);
        //     tasks=data.slice(0,10);
        //     renderList();
        // }).catch(function(error){
        //     console.log('error',error);
        // })
    
        try{
            const response= await fetch('https://jsonplaceholder.typicode.com/todos');
            const data=await response.json();
            tasks=await data.slice(0,10);
            renderList();
        }
        
        catch(error){
            console.log(error);
        }
    }
    console.log('Working');
    function addTaskToDom(task){
        const li=document.createElement('li');
        li.innerHTML=`
        <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''}
        class="custom-checkbox">
        <label for="${task.id}">${task.title}</label>
        <img src="bin.png" class="delete" data-id="${task.id}" />
     `;
     tasksList.append(li);
    }
    function renderList () {
        tasksList.innerHTML='';
        for(let i=0;i<tasks.length;i++){
            addTaskToDom(tasks[i]);
        }
        tasksCounter.innerHTML=tasks.length;
    }
    function toggleTask(taskId){
        const task=tasks.filter(function(task){
            return task.id == Number(taskId)        
        });
        if(task.length>0){
            const currentTask=task[0];
            currentTask.completed=!currentTask.completed;
            renderList();
            showNotification('task toggled successfully');
            return;
        }
        showNotification('could not toggle the task');
    }
    
    function deleteTask (taskId) {
        const newTasks=tasks.filter(function(task){
            return task.id != Number(taskId)
        });
        tasks=newTasks;
        renderList();
        showNotification('task deleted successfully');
    
    }
    
    function addTask (task) {
        if(task){
            tasks.push(task);
            renderList();
            showNotification('task added successfully');
            return;
        }
        showNotification('task can not be added');
    }
    
    
    function showNotification(text) {
        alert(text);
    }
    
    function handleInputKeypress(e){
        if(e.key == 'Enter'){
            const text=e.target.value;
            console.log('text',text);
    
        
        if(!text){
            showNotification('task text cannot be empty');
            return;
        }
    
        const task={
            title:text,     //  text is shorthand for text:text
            id:Date.now(),
            completed:false
        }
    
        e.target.value='';
        addTask(task);
       }
    } 
    
    function handelClickListener(e){
        const target=e.target;
       
        if(target.className == 'delete'){
            const taskId = target.dataset.id;
            deleteTask(taskId);
            return;
        }
        else if(target.className == 'custom-checkbox') {
            const taskId = target.id;
            toggleTask(taskId);
            return; 
        }
    }
    
    function initializeApp () {
        fetchTodos();
        addTaskInput.addEventListener('keyup',handleInputKeypress);
        document.addEventListener('click',handelClickListener);
    }
    // initializeApp();
    return{
        initialize:initializeApp,
        a:a
    }
})()