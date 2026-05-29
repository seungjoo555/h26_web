// 할일 목록 저장하는 배열
let todos = [];
let todoId = 0;

// 상태 저장 변수들
let searchKeyword = '';
let currentFilter = 'all';
let currentSort = 'new'; 

const addTodo = function() {
    // 함수가 실행될 때 현재 input 창에 적힌 값을 정확하게 실시간으로 가져옵니다.
    let todoInput = document.getElementById("todoInput");
    let category = document.querySelector('#category');
    let endDate = document.querySelector('#endDate');
    let priority = document.getElementById('priority');
    
    let text = todoInput.value.trim();

    if(text === '') {
        alert('🪄 할 일을 입력해주세요!');
        todoInput.focus();
        return;
    }

    let todo = {
        id: ++todoId,
        text: text, 
        category: category.value,
        priority: priority.value,
        date: endDate.value,
        completed: false
    };
    
    todos.push(todo);
    
    // 입력창 초기화
    todoInput.value = '';
    category.value = '공부';
    priority.value = '높음';
    endDate.value = '';
    
    renderTodos();
};

const updateTodo = function() {
    let todoInput = document.getElementById("todoInput");
    let category = document.querySelector('#category');
    let endDate = document.querySelector('#endDate');
    let priority = document.getElementById('priority');
    let todoId = document.querySelector('#todoId');
    let todoComplete = document.querySelector('#todoComplete');

    if(todoInput.value.trim() === '') {
        alert('🪄 할 일을 입력해주세요!');
        todoInput.focus();
        return;
    }
    
    todos = todos.map(function(todo){
        if(todo.id == todoId.value){
            todo.text = todoInput.value;
            todo.category = category.value;
            todo.priority = priority.value;
            todo.date = endDate.value;
            todo.completed = (todoComplete.value === 'true');
        }
        return todo;
    });
    
    // 초기화 및 버튼 복구
    todoInput.value = '';
    category.value = '공부';
    priority.value = '높음';
    endDate.value = '';
    todoId.value = '';
    todoComplete.value = '';

    document.getElementById('addBtn').classList.remove('d-none');
    document.getElementById('updateBtn').classList.add('d-none');

    renderTodos();
};

const toggleTodo = function(id) {
    todos = todos.map(function(todo) {
        if(todo.id == id) todo.completed = !todo.completed;
        return todo;
    });
    renderTodos();
};

const upTodo = function(id) {
    let todoInput = document.getElementById("todoInput");
    let category = document.querySelector('#category');
    let endDate = document.querySelector('#endDate');
    let priority = document.getElementById('priority');
    let todoId = document.querySelector('#todoId');
    let todoComplete = document.querySelector('#todoComplete');
    
    todos.forEach(function(todo){
        if(todo.id == id){
            todoId.value = todo.id;
            todoInput.value = todo.text;
            category.value = todo.category;
            priority.value = todo.priority;
            endDate.value = todo.date;
            todoComplete.value = todo.completed;

            // 추가 버튼 숨기고 수정 완료 버튼 보여주기
            document.getElementById('addBtn').classList.add('d-none');
            document.getElementById('updateBtn').classList.remove('d-none');
            todoInput.focus();
        }
    });
};

const deleteTodo = function(id) {
    if(confirm('정말 이 할 일을 삭제할까요? 🎈')) {
        todos = todos.filter(function(todo) {
            return todo.id != id;
        });
        renderTodos();
    }
};

const renderTodos = function() {
    const todoList = document.getElementById('todolist');
    let filterTodos = [...todos];

    // 1. 상태 필터링
    if (currentFilter === 'active') {
        filterTodos = filterTodos.filter(todo => !todo.completed);
    } else if (currentFilter === 'completed') {
        filterTodos = filterTodos.filter(todo => todo.completed);
    } 

    // 2. 검색어 필터링
    if (searchKeyword !== '') {
        filterTodos = filterTodos.filter(todo => todo.text.includes(searchKeyword));
    }

    // 3. 정렬 로직
    filterTodos.sort(function(a, b) {
        if (currentSort === 'new') return b.id - a.id;
        if (currentSort === 'priority') {
            const priorityMap = { '높음': 1, '중간': 2, '낮음': 3 };
            return priorityMap[a.priority] - priorityMap[b.priority] || b.id - a.id;
        } 
        if (currentSort === 'endDay') {
            if (!a.date && !b.date) return b.id - a.id;
            if (!a.date) return 1;
            if (!b.date) return -1;
            return new Date(a.date) - new Date(b.date);
        }
        return 0;
    });

    todoList.innerHTML = '';
    
    filterTodos.forEach(function(todo) {
        const liTag = document.createElement('li');
        liTag.classList.add('todo-card');
        
        // 우선순위에 따른 디즈니 감성 테두리 부여
        if (todo.priority === '높음') {
            liTag.style.setProperty('border', '2.5px solid #ffccd5', 'important'); 
            liTag.style.setProperty('border-left', '8px solid #ff4d6d', 'important');
        } else if (todo.priority === '중간') {
            liTag.style.setProperty('border', '2.5px solid #fef3c7', 'important'); 
            liTag.style.setProperty('border-left', '8px solid #fbbf24', 'important');
        } else if (todo.priority === '낮음') {
            liTag.style.setProperty('border', '2.5px solid #d1fae5', 'important'); 
            liTag.style.setProperty('border-left', '8px solid #10b981', 'important');
        }
        
        if(todo.completed) {
            liTag.classList.add('complete');
            liTag.style.setProperty('border', '2.5px solid #e2e8f0', 'important'); 
            liTag.style.setProperty('border-left', '8px solid #94a3b8', 'important');
        }

        const displayDate = todo.date ? todo.date : '기한 없음';

        const text = `
            <div class="d-flex justify-content-between align-items-start flex-wrap">
                <div>
                    <h3 class="todo-title">${todo.text}</h3>
                    <div class="todo-badges">
                        <span class="badge-item">📁 ${todo.category}</span>
                        <span class="badge-item priority-text">⭐ ${todo.priority}</span>
                        <span class="badge-item">📅 ${displayDate}</span>
                    </div>
                </div>
                <div class="todo-actions mt-2 mt-sm-0">
                    <button onclick='toggleTodo(${todo.id})' class='btn btn-action-done btn-sm'>${ !todo.completed ? '✅ 완료' : '🔄 취소'}</button>
                    <button onclick='upTodo(${todo.id})' class='btn btn-action-edit btn-sm'>🪄 수정</button>
                    <button onclick='deleteTodo(${todo.id})' class='btn btn-action-delete btn-sm'>🎈 삭제</button>
                </div>
            </div>
        `;
        liTag.innerHTML = text;
        todoList.appendChild(liTag);
    });
};

window.onload = function() {
    document.getElementById('addBtn')?.addEventListener('click', addTodo);
    document.getElementById('updateBtn')?.addEventListener('click', updateTodo);

    const todoSearch = document.getElementById('todoSearch');
    if(todoSearch) {
        // 엔터 칠 필요 없이 타이핑할 때 바로 검색되도록 개선했습니다.
        todoSearch.addEventListener('keyup', function() {
            searchKeyword = todoSearch.value;
            renderTodos();
        });
    }

    // 필터 버튼 이벤트 바인딩
    const filters = {
        'filterAll': 'all',
        'filterActive': 'active',
        'filterCompleted': 'completed'
    };

    Object.keys(filters).forEach(id => {
        document.getElementById(id)?.addEventListener('click', function() {
            Object.keys(filters).forEach(k => document.getElementById(k)?.classList.remove('active'));
            this.classList.add('active');
            currentFilter = filters[id];
            renderTodos();
        });
    });

    document.getElementById('sort')?.addEventListener('change', function() {
        currentSort = this.value;
        renderTodos();
    });
};