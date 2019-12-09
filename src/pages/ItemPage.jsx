import React from "react";
import PropTypes from "prop-types";
import "./itempage.css";
import FancyButton from "../components/FancyButton.jsx";
import {connect} from "react-redux";
import {addItem} from "../store/actions.js";
import {toast} from "react-toastify";
import * as services from "../services";

class ItemPage extends React.PureComponent{
  
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.fetchItem();
    }

    fetchItem = () => {
      services.getItem({itemId: this.props.match.params.itemId})
        .then(item =>{
            this.setState({
                ...item
            });
        })
        .catch(err =>{
            console.log("item page", err);
        });
    }

    handleBuy = () => {
      this.props.dispatch(addItem(this.state));
    };
  

    render(){
        return (
            <>
            <div className={"box spacer itemPage"}>
             <div style={{
               display: "flex",
             }}>
               <div className={"itemPage-left"}>
                 <img src={this.state.imgSrc}/>
               </div>
               <div className={"itemPage-content"}>
                 <div><h2>{this.state.title}</h2></div>
                 <div>
                   <p style={{textAlign: "justify"}} className={"text--bold"}>
                     {this.state.price} €
                   </p>
                 </div>
                 <div>
                   <p style={{textAlign: "justify"}}>
                     {loremIpsum}
                   </p>
                 </div>
               </div>
             </div>
            <div className={"itemPage-left"}>{`(${getRandomIntInclusive(0,1000)} hinnangut)`}</div>
          <div className={"itemPage-footer"}>
            <FancyButton onClick={this.handleBuy}>Lisa toode ostukorvi</FancyButton>
          </div>
        </div>
            </>
        );
    }
}

function getRandomIntInclusive(min,max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min+1)) + min;
}

const loremIpsum = "See on üks hea toode";

ItemPage.propTypes = {
    match: PropTypes.object.isRequired,
};

export default connect()(ItemPage);