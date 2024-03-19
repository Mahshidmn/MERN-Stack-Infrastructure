import {Link} from 'react-router-dom';
import * as userService from '../../utilities/users-service';
function NavBar({user, setUser}) {

  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

    return (
       <nav>
         <div>Welcome,{user.name}</div>
         <Link to="/orders"> Order History</Link>
         &nbsp; |  &nbsp;
         <Link to="/orders/new"> New Order</Link>
         {/* <span>Welcome, { user.name }</span> */}
         &nbsp; &nbsp;<Link to = "" onClick={handleLogOut}>Log Out</Link>
       </nav>
    );
    

}

export default NavBar;