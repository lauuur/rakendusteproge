import React from "react";
import ItemList from "../components/ItemList.jsx";
import Checkbox from "../components/Checkbox.jsx";
import SortDropdown from "../components/SortDropdown.jsx";
import PropTypes from "prop-types";
import "./homepage.css";
import { getItems } from "../actions/itemsActions.js";

class HomePage extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {
            sortDirection: -1,
            items: [],
            allCategories: ["phones", "computers"],
            selectedCategories: ["phones"],
        };
    }

    componentDidMount(){
        this.fetchItems();
    }

    fetchItems = () => {
        getItems()
        .then(items => {
            this.setState({
                items
            });
        })
        .catch(err => {
            console.log("err", err);
        });
    }

    handleSortDropdown = (event) => {
        this.setState({
            sortDirection: parseInt(event.target.value),
        });
    }

    handleFilterSelect = (event) => {
        const categoryName = event.target.name;
        if(this.isSelected(categoryName)){
            this.unselectCategory(categoryName);
        }
        else{
            this.selectCategory(categoryName);
        }
    }

    unselectCategory = (categoryName) => {
        const newArr = this.state.selectedCategories.filter(cn => cn !== categoryName);
        this.setState({
            selectedCategories: newArr
        });
    }
    
    selectCategory = (categoryName) => {
        this.setState({
            selectedCategories: this.state.selectedCategories.concat([categoryName])
        });
    }

    getVisibleItems = () => {
        return this.state.items
        .filter(item => this.isSelected(item.category))
        .sort((a, b) => {
            switch (this.state.sortDirection) {
                case -1: return b.price -a.price;
                case 1: return a.price -b.price;
            }
        });
    }

    isSelected = (name) => this.state.selectedCategories.indexOf(name) >= 0;

    render(){
        const items = this.getVisibleItems();
        return (
            <>
            <div className="body-wrapper">
                <div className="filters-wrapper">
                    <ItemFilters
                    allCategories={this.state.allCategories}
                    handleDropdown={this.handleFilterSelect}
                    isSelected={this.isSelected}
                    />
                </div>
                <div className="items-header-wrapper">
                    <div>
                        Found: {items.length} {" "}
                        {this.state.selectedCategories.join(", ")}
                    </div>
                    <SortDropdown
                    direction={this.state.sortDirection}
                    onChange={this.handleSortDropdown}/>
                </div>
                <ItemList items={items}/>
            </div>
            </>
        );
    }
}

const ItemFilters = ({allCategories, handleDropdown, isSelected}) => {
    return (
        <>
        {
            allCategories.map(categoryName => {
                return (
                    <Checkbox
                    key={categoryName}
                    name={categoryName}
                    onChange={handleDropdown}
                    checked={isSelected(categoryName)}
                    />
                );
            })
        }
        </>
    );
};

ItemFilters.propTypes = {
    allCategories: PropTypes.array.isRequired,
    handleDropdown: PropTypes.func.isRequired,
    isSelected: PropTypes.func.isRequired,
};

export default HomePage;