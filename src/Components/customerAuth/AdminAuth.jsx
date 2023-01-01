import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";


const AdminAuth = ({children}) => {
  const navigate  = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

    if(user && user.isAdmin ==="Delivery Partner"){
        return children
    }else{
      return <Navigate to="/login-merchant"/>
    }
}

export default AdminAuth;