import { Navigate } from 'react-router-dom'

export default function ProtectedRoute(props: any) {
  if(localStorage.getItem("authorization")){
    return props.children 
    }else{
      return <Navigate to="/login">
          
      </Navigate>
    }
}
