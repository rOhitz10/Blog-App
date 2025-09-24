import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/Auth"
import { ROUTES } from "../Config/routesConfig";


export const PrivateRoutes = ({children,role='user'})=>{
const {user,isLoading} = useAuth();

const location = useLocation();

if (isLoading) {
 return <div className="flex justify-center items-center min-h-screen">
  <motion.div animate={{ x: [null, 100, 0] }}  className="animate-spin rounded-full h-12 w-12 border">
  </motion.div>
 </div>
}

if(!user){
 return <Navigate to={ROUTES.LOGIN} state={{from:location}} />
}

if(role === 'admin' && user.role !== 'admin'){
 return <Navigate to={ROUTES.FORBIDDEN} replace />
}

return children;
}