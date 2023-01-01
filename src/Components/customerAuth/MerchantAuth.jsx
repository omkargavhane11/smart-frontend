import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const MerchantAuth = ({children}) => {

  const user = useSelector((state) => state.user.currentUser);

    if(user.userType ==="Merchant"){
        return children
    }else{
      return <Navigate to="/login-merchant"/>
    }
}

export default MerchantAuth;