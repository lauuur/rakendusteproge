import React from "react";
import { Link } from "react-router-dom";

class NotFound extends React.PureComponent{
    render(){
        return(
            <div align="center">
                <p>This page was not found :/<br/><br/>Go to <Link to="/">homepage</Link> instead?</p>
            </div>
        );
    }
}

export default NotFound;