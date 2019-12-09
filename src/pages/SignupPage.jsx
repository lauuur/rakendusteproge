import React from "react";
import "./form.css";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {toast} from "react-toastify";
import * as services from "../services";

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
        services.signup(this.state)
        .then( () =>{
            this.props.history.push("/login");
            toast.success("Kasutaja on loodud");
        })
        .catch(err =>{
            toast.error("Kasutaja loomisel tekkis viga");
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
            <h1 id="header">Kasutaja loomine</h1>
            <form id="form" onSubmit={this.handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Meiliaadress" 
                    name="email"
                    onChange={this.handleChange}
                    autoComplete="off" required/>
                <input 
                    type="password" 
                    placeholder="Salasõna" 
                    name="password"
                    onChange={this.handleChange} required/>
                <input 
                    type="submit" 
                    value="Loo kasutaja" 
                    onChange={this.handleChange}/>
            </form>
                <br/><p>Juba kasutaja olemas? <br/> <Link to="/login">Logi sisse!</Link></p>
            </div>
        );
    }
}

export default SignupPage;