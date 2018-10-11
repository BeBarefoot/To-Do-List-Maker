function init() {
    createTodos();
    render();
}

function render() {
    renderTodos();
    renderStats();
}

function renderTodos() {
    var todos = getTodos()
    var strHtmls = todos.map(function(todo) {
        return `<li class="task-line" >  
               <span class="importance-level">${getLevel(todo.importance)}</span>
                  <span class="todo-text ${(todo.isDone) ? 'done' : ''}" onclick="onTodoClicked('${todo.id}')"> ${todo.txt} </span>  
                  <span class="date">${todo.createdAt}</span>
                   <button type="button" class="close" aria-label="Close" onclick="onDeleteTodo('${todo.id}', event)">
                     <span aria-hidden="true">&times;</span>
                     </button>
                                </li>`;

    })
    document.querySelector('.todo-list').innerHTML = strHtmls.join('')
}

function renderStats() {
    document.querySelector('.todo-count').innerHTML = getTodoCount();
    document.querySelector('.active-count').innerHTML = getActiveCount();
}

function onTodoClicked(todoId) {
    toggleTodo(todoId)
    render()
}

function onSetFilter(statusFilter) {
    setFilter(statusFilter)
    render()
}

function todoAdd() {
    var elNewTodoTxt = document.querySelector('#newTodoTxt')
    var newTodoTxt = elNewTodoTxt.value
    var elImportance = document.querySelector('.importance');
    var newImportance = elImportance.value;
    if (newTodoTxt.length === 0) return
    addTodo(newTodoTxt, newImportance)
    elNewTodoTxt.value = '';
    render()
}

function onDeleteTodo(todoId, ev) {
    ev.stopPropagation();
    if (!window.confirm("Delete Task?")) return
    deleteTodo(todoId);
    render();
}

function select(ev) {}

function sortBy(sortValue) {

    sort(sortValue.innerText)
    render()
}