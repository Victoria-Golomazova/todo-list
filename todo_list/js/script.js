const todoMessage = document.querySelector('.create__input')
const todoButton = document.querySelector('.create__btn')
const todoList = document.querySelector('.list')

let todoListArray = []

if (localStorage.getItem('todo')){
	todoListArray = JSON.parse(localStorage.getItem('todo'))
	displayTodos()
}

todoButton.addEventListener('click', function() {

	newTodo = {
		todo: todoMessage.value,
		checked: false,
		important: false,
	}

	todoListArray.push(newTodo)
	displayTodos()
	localStorage.setItem('todo', JSON.stringify(todoListArray))
})

function displayTodos () {
	let displayTodo = ''
	if (todoListArray.length === 0) {
		todoList.innerHTML = ''
	}
	todoListArray.forEach( function(item, i) {
		displayTodo += `
			<li class="${item.important ? 'important' : ''}"> 
			<input type="checkbox" class="list__check" id="item_${i}" ${item.checked ? 'checked' : ''}>
			<label for="item_${i}">${item.todo}</label>
			<button class="list__del" id="btn-del_${i}">Удалить</button>
			<button class="list__important" id="btn-imp_${i}">Важное</button>
			</li>
		`
		todoList.innerHTML = displayTodo
	})
}

todoList.addEventListener('change', function(event) {
	idTodo = event.target.getAttribute('id')
	forLabel = todoList.querySelector('[for='+ idTodo +']')
	valueLabel = forLabel.innerHTML

	todoListArray.forEach( function(item, i) {
		if (item.todo === valueLabel) {
			item.checked = !item.checked
			localStorage.setItem('todo', JSON.stringify(todoListArray))
		}
	})
})

todoList.addEventListener('click', function(event) {
	idButton = event.target.getAttribute('id')
	
	todoListArray.forEach( function(item, i) {
		if (idButton === `btn-imp_${i}`) {
			item.important = !item.important
			displayTodos()
			localStorage.setItem('todo', JSON.stringify(todoListArray))
		}
	})
})

todoList.addEventListener('click',function(event){
  if(event.target && event.target.className == 'list__del'){
    idButton = event.target.getAttribute('id')

    for (i = 0; i < todoListArray.length; i++) {
      if (idButton === `btn-del_${i}`) {
		todoListArray.splice(i, 1)
        displayTodos()
      	localStorage.setItem('todo', JSON.stringify(todoListArray))
      }
    }
}})



