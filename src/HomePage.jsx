import React from "react";
import Header from "./Header.jsx";
import ItemList from "./ItemList.jsx";
import {phones, computers} from "./mydatabase.js";

class HomePage extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {
            items: phones,
        };
    }

    componentDidMount(){
        fetch("http://localhost:9000/api/item")
        .then(res =>{
            console.log("res", res);
            return res.json();
        })
        .then(items => {
            console.log("items", items);
        })
        .catch(err => {
            console.log("err", err);
        });
    }

    handleChange = (event) => {
        switch(event.target.value){
            case "phones":{
                this.setState({
                    items: phones,
                });
                break;
            }
            case "computers":{
                this.setState({
                    items: computers,
                });
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
        );
    }
}

export default HomePage;