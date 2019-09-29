import React from "react";
import Header from "./Header.jsx";
import ItemList from "./ItemList.jsx";
import {phones, computers} from "./mydatabase.js";

class HomePage extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {
            items: phones,
        }
    }
    handleChange = (event) => {
        switch(event.target.value){
            case "phones":{
                this.setState({
                    items: phones,
                })
                break;
            }
            case "computers":{
                this.setState({
                    items: computers,
                })
                break;
            }
        }
    }
    render(){
        return (
            <>
            <Header/>
            <div className="category-wrapper">
            <select onChange={this.handleChange}>
                <option value="phones">Phones</option>
                <option value="computers">Computers</option>
            </select>
            </div>
            <ItemList items={this.state.items}/>
            </>
        )
    }
}

export default HomePage;