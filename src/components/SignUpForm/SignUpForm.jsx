import { Component} from 'react';
import { signUp } from '../../utilities/users-service';

export default class SignUpForm extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        error: ''
       }
       
       handleChange = (event) => {
        // setState is inherited from Component object from react
        this.setState({
            [event.target.name]: event.target.value,
            error: ''
        })
       };

       handleSubmit = async (event) => {
        // Prevent form from being submitted to the server
        event.preventDefault();
      try {
        // We don't want to send the 'error' or 'confirm' property,
        //  so let's make a copy of the state object, then delete them
        const formData = {...this.state};
        delete formData.error;
        delete formData.confirm;
        // we send the formData to server and server send the user back
        const user = await signUp(formData);
        // we set the user to the user we got back from server
        this.props.setUser(user);
      
      } catch {
          this.setState({error: 'Sign Up Failed- Try Again'});
        }
       };

       render() {
        const disable = this.state.password !== this.state.confirm;
        return (
          <div>
            <div className="form-container">
              <form autoComplete="off" onSubmit={this.handleSubmit}>
                <label>Name</label>
                <input type="text" name="name" value={this.state.name} onChange={this.handleChange} required />
                <label>Email</label>
                <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                <label>Password</label>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                <label>Confirm</label>
                <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                <button type="submit" disabled={disable}>SIGN UP</button>
              </form>
            </div>
            <p className="error-message">&nbsp;{this.state.error}</p>
          </div>
        );
      }
}