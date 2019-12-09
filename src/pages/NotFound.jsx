import React from "react";
import {Link} from "react-router-dom";

class NotFound extends React.PureComponent{
    render(){
        return(
            <div class="box" align="center">
                <p>Seda lehte ei leitud :/<br/><br/>Mine <Link to="/">kodulehele</Link>?</p>
            </div>
        );
    }
}

export default NotFound;