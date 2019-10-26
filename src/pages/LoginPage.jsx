import React from "react";
import "./form.css";
import { Link } from "react-router-dom";

class LoginPage extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        console.log("submit", this.state);
        fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state),
        })
        .then(res =>{
            console.log("response:", res);
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