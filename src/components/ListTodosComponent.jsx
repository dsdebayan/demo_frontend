import React, { useState, useEffect } from 'react';
import AuthenticationService from './AuthenticationService';
import TodoDataService from '../api/TodoDataService';
import moment from 'moment'

const ListTodosComponent = (props) => {
    const [todos, setTodos] = useState(
        [
        //  {id: 1, description : 'Learn to Dance', done:false, targetDate: new Date()},
        //  {id: 2, description : 'Become an Expert at React', done:false, targetDate: new Date()},
        //  {id: 3, description : 'Visit India', done:false, targetDate: new Date()}
        ]);
    const [message, setMessage] = useState(null)

    function refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
          .then(
              response => {
                  //console.log(response);
                  setTodos(response.data)
              }
          ) 
    }

    function deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        //console.log(id + " " + username);
        TodoDataService.deleteTodo(username, id)
         .then (
             response => {
                setMessage(`Delete of todo ${id} Successful`)
                refreshTodos()
             }
         )
        
    }

    function updateTodoClicked(id) {
        console.log('update ' + id)
        props.navigate(`/todos/${id}`)
    }

    function addTodoClicked() {
        props.navigate(`/todos/-1`)
    }

    useEffect(() => {
        console.log('componentDidMount')
        refreshTodos();
        console.log(todos)
            // return function cleanup() {
            //     console.log('componentWillUnmount')
            // };
          });
          
    
        return (
            <div>
                 <h1>List Todos</h1>
                 <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>IsCompleted?</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            todos.map (
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                        <td><button className="btn btn-success" onClick={() => updateTodoClicked(todo.id)}>Update</button></td>
                                        <td><button className="btn btn-warning" onClick={() => deleteTodoClicked(todo.id)}>Delete</button></td>
                                    </tr>
                            )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={addTodoClicked}>Add</button>
                    </div>
                 </div>
            </div>
        )
}

export default ListTodosComponent