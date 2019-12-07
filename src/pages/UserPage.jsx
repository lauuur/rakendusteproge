import React from "react";
import PropTypes from "prop-types";
// import authConsumer from "../components/authConsumer.jsx";
import protectedRedirect from "../components/protectedRedirect.jsx";
import { connect } from "react-redux";
import { UserPropTypes } from "../store/reducer.js";
import FancyButton from "../components/FancyButton.jsx";
import {userUpdate, tokenUpdate} from "../store/actions.js";
import {toast} from "react-toastify";




class UserPage extends React.PureComponent{
    static propTypes = {
        user: PropTypes.shape(UserPropTypes),
        dispatch: PropTypes.func.isRequired,
    }

    handleLogout = () => {
        toast.success("Oled välja logitud");
        this.props.dispatch(userUpdate(null));
        this.props.dispatch(tokenUpdate(null));
      };
    
    render(){
        return(
            <div className="spacer">
                <div className="box">
                    <div style={{display:"flex", justifyContent: "space-around"}}>
                        <div className="field">
                            {this.props.user.email}
                        </div>
                        <div className="field">
                            {this.props.user.createdAt}
                        </div>
                        <FancyButton onClick={this.handleLogout}>Logi välja</FancyButton>
                </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = (store) =>{
    return{
        user: store.user,
    };
};

export default connect(mapStateToProps)(protectedRedirect(UserPage));