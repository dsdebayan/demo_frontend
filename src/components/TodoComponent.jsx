import React, {useState,useEffect} from 'react'
import moment from 'moment'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TodoDataService from '../api/TodoDataService';
import AuthenticationService from './AuthenticationService.js'

const TodoComponent = (props) => {

    const [id, setId] = useState(props.params.id)
    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState(moment(new Date()).format('YYYY-MM-DD'))

    // useEffect(() => {

    //     if(id!==-1) {
           
        
    //     let username = AuthenticationService.getLoggedInUserName()
        
    //     TodoDataService.retrieveTodo(username, id)
    //          .then(response => {
    //             setDescription(response.data.description)
    //             setTargetDate(moment(response.data.targetDate).format('YYYY-MM-DD'))
    //          })
    // }})
    
    const validate = (values) => {
        let errors = {}
        if(!values.description) {
            errors.description = 'Enter a Description'
        } else if(values.description.length<5) {
            errors.description = 'Enter atleast 5 Characters in Description'
        }

        if(!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }

        return errors

    }

    const onSubmit = (values) => {
        let username = AuthenticationService.getLoggedInUserName()

        let todo = {
            id: id,
            description: values.description,
            targetDate: values.targetDate
        }

        if (id === -1) {
            TodoDataService.createTodo(username, todo)
                .then(() => props.navigate('/todos'))
        } else {
            TodoDataService.updateTodo(username, id, todo)
                .then(() => props.navigate('/todos'))
        }
        
        console.log(values);
    }

    
    //let {description,targetDate} = this.state

    return (
        <div>
            <h1>Todo</h1>
            <div className="container">
                <Formik 
                    initialValues={{description,targetDate}}
                    onSubmit={onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={validate}
                    enableReinitialize={true}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description" component="div" 
                                                            className="alert alert-warning"/>
                                <ErrorMessage name="targetDate" component="div" 
                                                            className="alert alert-warning"/>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field className="form-control" type="date" name="targetDate"/>
                                </fieldset>
                                <button className="btn btn-success" type="submit">Save</button>
                            </Form>
                        )
                    }
                </Formik>
            
            </div>                
        </div>
    )
}

export default TodoComponent