import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotFound from "./NotFound";


const CustomerAuth = ({children}) => {

  const user = useSelector((state) => state.user.currentUser);

    if(user.userType ==="Customer"){
        return children
    }else{
        return <Navigate to="/login"/>
    }
}

export default CustomerAuth;