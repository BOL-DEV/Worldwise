import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/FakeAuthContext";
import { useEffect } from "react";

const ProtectedRoute = ({children}) => {

    const {isAutheticated} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(!isAutheticated) navigate("/")
    }, [isAutheticated, navigate])

  return isAutheticated ? children : null
};

export default ProtectedRoute;