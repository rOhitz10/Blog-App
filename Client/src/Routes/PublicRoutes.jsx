import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth"
import { ROUTES } from "../Config/routesConfig";

export const PublicRoutes = ({children, hideIfAuthenticated = false})=>{
 const {user} = useAuth();

 if(hideIfAuthenticated && user){
  return <Navigate to={ROUTES.DASHBOARD} replace />
 }

 return children;
}