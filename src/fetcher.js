const baseUrl = 'https://todobacks.azurewebsites.net/api/Todo/'

export const getTodos = async (setLoading) => {
  setLoading(true)
  try {
    const response = await fetch(`${baseUrl}GetTodos`)
    const data = await response.json()
    return data
  }
  catch(e) {
    console.log(e)
    return null
  }
  finally {
    setLoading(false)
  }
}

export const createTodo = async (todo, setLoading) => {
  setLoading(true)
  try {
    console.log(todo)
    await fetch(`${baseUrl}CreateTodo`, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo),
      method: 'POST'
    })
  } catch (e) {
    console.log(e)
  }
  finally {
    setLoading(false)
  }
}

export const deleteTodo = async (id, setLoading) => {
  setLoading(true)
  try {
    await fetch(`${baseUrl}DeleteTodo?id=${id}`)
  }
  catch(e) {
    console.log(e)
  }
  finally {
    setLoading(false)
  }
}

export const updateTodo = async (todo, setLoading) => {
  setLoading(true)
  try{
    await fetch(`${baseUrl}UpdateTodo`, {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo),
      method: 'PUT'
    })
  } catch (e) {
    console.log(e)
  }
  finally {
    setLoading(false)
  }
}