const baseUrl = 'https://todobacks.azurewebsites.net/api/Todo/'

export const getTodos = () => {
  return fetch(`${baseUrl}GetTodos`)
}

export const createTodo = (todo) => {
  return fetch(`${baseUrl}CreateTodo`, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo),
    method: 'POST'
  })
}

export const deleteTodo = (id) => {
  return fetch(`${baseUrl}DeleteTodo?id=${id}`)
}

export const updateTodo = (todo) => {
  return fetch(`${baseUrl}UpdateTodo`, {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo),
    method: 'PUT'
  })
}