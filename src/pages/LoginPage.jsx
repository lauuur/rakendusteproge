import React from "react";
import "./form.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class LoginPage extends React.PureComponent{

    static propTypes = {
        history: PropTypes.object.isRequired,
        onLogin: PropTypes.func.isRequired,
    };

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        fetch("/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state),
        })
        .then(res => res.json())
        .then(({token, user}) =>{
            this.props.onLogin({token, user});
            this.props.history.push(`/users/${user._id}`);
        })
        .catch(err =>{
            console.log("error:", err);
        });
    };

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    
    render(){
        return(
            <div className="login">
            <h1 id="header">Login</h1>
            <form id="form" onSubmit={this.handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    autoComplete="off" required/>
                <input 
                    type="password" 
                    placeholder="Password" 
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange} required/>
                <input 
                    type="submit" 
                    value="Login" 
                    onChange={this.handleChange}/>
            </form>
                <br/><p>Don't have an account? <br/> <Link to="/signup">Create one here!</Link></p>
            </div>
        );
    }
}

export default LoginPage;