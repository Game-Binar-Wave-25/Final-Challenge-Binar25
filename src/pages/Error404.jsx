import React from "react";
import { Link } from "react-router-dom";

class  Error404 extends React.Component {
    render() {
        return <div>
            <img src={"https://static.collectui.com/shots/2311590/ui-challenge-404-page-008-psd-large"} />
            <p style={{ textAlign: "center" }}>
                <Link to="/">Go to Home </Link>
            </p>
        </div>;
    }
}
export default Error404;