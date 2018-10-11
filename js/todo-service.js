const KEY_TODOS = 'todos';

var gTodos;
var gTodosFilter = 'all';

function createTodos() {
    var todos = getFromStorage(KEY_TODOS);
    gTodos = (todos) ? todos : []
}

function createTodo(txt, importanceLvl) {
    return {
        id: createIdx(),
        txt: txt,
        isDone: false,
        importance: importanceLvl,
        createdAt: createdAt()
    }
}

function getTodos() {
    return gTodos.filter(function(todo) {
        return gTodosFilter === 'all' ||
            (gTodosFilter === 'done' && todo.isDone) ||
            (gTodosFilter === 'active' && !todo.isDone)
    });
}

function addTodo(todoTxt, importanceLvl) {
    gTodos.unshift(createTodo(todoTxt, importanceLvl));
    saveToStorage(KEY_TODOS, gTodos);
}

function toggleTodo(todoId) {
    var todo = gTodos.find(function(todo) {
        return todo.id === todoId
    });
    todo.isDone = !todo.isDone;
    saveToStorage(KEY_TODOS, gTodos);
}

function setFilter(statusFilter) {
    console.log(gTodosFilter)
    gTodosFilter = statusFilter

}

function deleteTodo(todoId) {
    var todoIdx = gTodos.findIndex(function(todo) {
        return todo.id === todoId;
    })
    gTodos.splice(todoIdx, 1);
    saveToStorage(KEY_TODOS, gTodos);
}

function getTodoCount() {
    if (gTodos.length === 0) {
        document.querySelector('.no-tasks').classList.remove('hide')
    } else document.querySelector('.no-tasks').classList.add('hide')
    return gTodos.length;
}

function getActiveCount() {
    return gTodos.filter(function(todo) {
        return !todo.isDone
    }).length
}

function createdAt() {
    var today = new Date();
    return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
}


function sort(sortBy) {
    if (sortBy == 'Date') {
        gTodos.sort((a, b) => {
            return b.createdAt - a.createdAt
        })
    } else if (sortBy == "Importance")
        gTodos.sort((a, b) => {
            return b.importance - a.importance
        })
    else if (sortBy == "Name")
        gTodos.sort((a, b) => {
            if (a.txt.toLowerCase() < b.txt.toLowerCase()) return -1;
            if (a.txt.toLowerCase() > b.txt.toLowerCase()) return 1;
            return 0;
        })

    saveToStorage(KEY_TODOS, gTodos);
}