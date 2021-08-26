import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import AdminLayout from "layouts/layout.js";

export default function Auth(props) {
    const cUser = useSelector(state => state.user);
    if(cUser.role === '') {
        return <Redirect to={'/login'}/>;
    }
    else if(cUser.role ==='admin')
        return <AdminLayout {...props} />

    
    else return (
        <Redirect to={'/'}/>
    );
}