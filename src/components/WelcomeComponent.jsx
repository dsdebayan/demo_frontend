import { Link } from 'react-router-dom'

const WelcomeComponent = (props) => {
    
    return(
        <>
        <h1>Welcome!</h1>
        <div className="container">
        Welcome {props.params.name}. You can manage your todos <Link to="/todos">here</Link>.
        </div>
    </>
    )
}

export default WelcomeComponent