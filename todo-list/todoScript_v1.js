// 할일 목록 저장하는 배열
let todos = []
let todoId = 0

let todoInput = document.getElementById("todoInput")
let category = document.querySelector('#category')
let endDate = document.querySelector('#endDate')
let priority = document.getElementById('priority')
const addTodo = function() {
    let todoInput = document.getElementById("todoInput")
    let category = document.querySelector('#category')
    let endDate = document.querySelector('#endDate')
    let priority = document.getElementById('priority')
    // 할일
    let text = todoInput.value

    if(text === '') {
        alert('할일을 입력하세요')
        todoInput.focus()
        return
    }

    let todo = {
        //id: new Date(),
        id: ++todoId,
        text, 
        category: category.value,
        priority: priority.value,
        date: endDate.value,
        completed: false
    }
    todos.push(todo)
    
    // 입력폼 clear
    todoInput.value = ''
    category.value = ''
    priority.value = ''
    
    //  <div id="todolist"></div> todos 내용으로 업데이트(render)
    renderTodos()
}

const updateTodo = function() {
    let todoInput = document.getElementById("todoInput")
    let category = document.querySelector('#category')
    let endDate = document.querySelector('#endDate')
    let priority = document.getElementById('priority')
    let todoId = document.querySelector('#todoId')
    let todoComplete = document.querySelector('#todoComplete')

    if(todoInput.value === '') {
        alert('할일을 입력하세요')
        todoInput.focus()
        return
    }
    
    todos = todos.map(function(todo){
        if(todo.id == todoId.value){
            todo.text = todoInput.value
            todo.category = category.value
            todo.priority = priority.value
            todo.date = endDate.value
            todo.completed = todoComplete.value
        }
        return todo
    })
    
    renderTodos()
}


const toggleTodo = function(id) {
    todos = todos.map(function(todo) {
        if(todo.id == id)
            todo.completed = !todo.completed
        return todo
    })

    renderTodos()
}

const upTodo = function(id) {
    let todoInput = document.getElementById("todoInput")
    let category = document.querySelector('#category')
    let endDate = document.querySelector('#endDate')
    let priority = document.getElementById('priority')
    let todoId = document.querySelector('#todoId')
    let todoComplete = document.querySelector('#todoComplete')
    todos.map(function(todo){
        if(todo.id == id){
            todoId.value = todo.id
            todoInput.value = todo.text
            category.value = todo.category
            priority.value = todo.priority
            endDate.value = todo.date
            todoComplete.value = todo.completed
        }
    })
}

const renderTodos = function() {
    const todoList = document.getElementById('todolist')

    let filterTodos = [...todos]
    // 진행중...
    filterTodos = filterTodos.filter(function(todo){
        return todo.completed == false
    })

    todoList.innerHTML = ''
    todos.forEach(function(todo) {
        const liTag = document.createElement('li')
        liTag.classList.add('list-group-item')
        liTag.classList.add('border')
        const colorArr = ['border-danger', 'border-success', 'border-warning']
        
        // class='complate' 추가
        if(todo.completed)
            liTag.classList.add('complete')

        /*  todo만든날짜 : todo.id
        const text = `<h3>${todo.text}</h3>
        <button onclick='toggleTodo("${todo.id}")'>${ !todo.completed ? '완료' : '취소'}</button>
        `
        */
       // todo만든날짜를 따로 기억
        const text = `<h3>${todo.text}</h3>
        <p>카테고리 : ${todo.category}</p>
        <p>우선순위 : ${todo.priority}</p>
        <p>마감일 : ${todo.date}</p>
        <button onclick='toggleTodo(${todo.id})' class='btn btn-outline-warning btn-sm'>${ !todo.completed ? '완료' : '취소'}</button>
        <button onclick='upTodo(${todo.id})' class='btn btn-outline-warning btn-sm'>수정</button>
        <button class='btn btn-outline-warning btn-sm'>삭제</button>
        `
        liTag.innerHTML = text
        todoList.appendChild(liTag)
    })


}

window.onload = function() {

    let addBtn = document.getElementById('addBtn')
    let updateBtn = document.getElementById('updateBtn')
    addBtn.addEventListener('click', addTodo)
    updateBtn.addEventListener('click', updateTodo)
}