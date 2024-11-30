import {Navigate} from "react-router-dom";

function ProtectedRoute({element, isAuthenticated}) {
    if (!isAuthenticated) {
        return <Navigate to={"/signin"}/>
    }

    return element;

}

export default ProtectedRoute;