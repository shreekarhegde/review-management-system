import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


//receive the email value from the user and allow him to login. After clicking on login button redirect to profile page. 
class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            redirect: false,
            userInfo: ``,
            userId: ``
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
        e.preventDefault();
        let formData = {
            email: e.target[0].value
        }
        axios.post('http://localhost:3000/users/login', formData).then((res) => {
            console.log(res.data, "response data")
            this.setState({
              redirect: true,
              userInfo: res.data,
              userId: res.data._id  
            })        
        })
    }

    render(){
        if(this.state.redirect){
            return <Redirect to={{pathname: `/users/${this.state.userId}`, state: {userInfo: this.state.userInfo}}} />
        }
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>Email</label><br/>
                    <input type="email" name="email"/><br/>
                    <input type="submit" name="submit"/>
                </form>
            </div>
        )
    }
}

export default Login;