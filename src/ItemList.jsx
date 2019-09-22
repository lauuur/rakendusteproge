import React from "react";

const item = [
    {
        name: "item1",
        cost: 200
    },
    {
        name: "item2",
        cost: 300
    }
];

const ItemList = () => {
    return (
    <div>
        {
        items.map( item => {
            return <Item 
            name={item.name}
            cost={item.cost}
            />
        })
        }
    </div>
    )
};

const Item = (props) => {
    return <div>{props.name} {props.cost}</div>
};

export default ItemList;