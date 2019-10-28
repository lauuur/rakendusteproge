import React from "react";
import "./form.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class SignupPage extends React.PureComponent{

    static propTypes = {
        history: PropTypes.object.isRequired,
    };

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }

    handleSubmit = (event) =>{
        event.preventDefault();
        console.log("submit", this.state);
        fetch("/api/v1/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state),
        })
        .then(res => res.json())
        .then(data =>{
            console.log("data:", data);
            this.props.history.push("/login");
        })
        .catch(err =>{
            console.log("error:", err);
        });
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render(){
        return(
            <div className="signup">
            <h1 id="header">Sign up</h1>
            <form id="form" onSubmit={this.handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email address" 
                    name="email"
                    onChange={this.handleChange}
                    autoComplete="off" required/>
                <input 
                    type="password" 
                    placeholder="Choose a password" 
                    name="password"
                    onChange={this.handleChange} required/>
                <input 
                    type="submit" 
                    value="Submit" 
                    onChange={this.handleChange}/>
            </form>
                <br/><p>Already have an account? <br/> <Link to="/login">Login here!</Link></p>
            </div>
        );
    }
}

export default SignupPage;