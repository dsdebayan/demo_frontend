import axios from 'axios'

class TodoDataService {
    retrieveAllTodos(name) {
        //console.log('executed service')
        return axios.get(`http://localhost:8000/jpa/users/${name}/todos`);
    }

    deleteTodo(name, id) {
        //console.log('executed service')
        return axios.delete(`http://localhost:8000/jpa/users/${name}/todos/${id}`);
    }

    updateTodo(name, id, todo) {
        //console.log('executed service')
        return axios.put(`http://localhost:8000/jpa/users/${name}/todos/${id}`, todo);
    }

    createTodo(name, todo) {
        //console.log('executed service')
        return axios.post(`http://localhost:8000/jpa/users/${name}/todos/`, todo);
    }

    retrieveTodo(name, id) {
        //console.log('executed service')
        return axios.get(`http://localhost:8000/jpa/users/${name}/todos/${id}`);
    }
}


export default new TodoDataService()