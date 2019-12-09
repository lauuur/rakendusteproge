import React from "react";
import "./form.css";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {tokenUpdate, userUpdate} from "../store/actions";
import {toast} from "react-toastify";
import * as services from "../services";

class LoginPage extends React.PureComponent{

    static propTypes = {
        history: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
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
        services.login(this.state)
        .then(this.handleSuccess)
        .catch(err =>{
            toast.error("Sisselogimisel tekkis viga");
            console.log("error:", err);
        });
    };

    handleSuccess = ({token, user}) =>{
        toast.success("Oled sisse logitud");
        this.props.dispatch(userUpdate(user));
        this.props.dispatch(tokenUpdate(token));
        this.props.history.push(`/users/${user._id}`);
    };

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    
    render(){
        return(
            <div className="login">
            <h1 id="header">Sisselogimine</h1>
            <form id="form" onSubmit={this.handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Meiliaadress" 
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    autoComplete="off" required/>
                <input 
                    type="password" 
                    placeholder="Salasõna" 
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange} required/>
                <input 
                    type="submit" 
                    value="Logi sisse" 
                    onChange={this.handleChange}/>
            </form>
                <br/><p>Pole kasutajat? <br/> <Link to="/signup">Registreeri siin!</Link></p>
            </div>
        );
    }
}

export default connect()(LoginPage);