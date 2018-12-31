import React from "react";
import {Grid, Form, Segment, Button, Header, Message, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import firebase from "../../firebase";

class Register extends React.Component {
    state = {
        username: "",
        email: "",
        password: "",
        password2: "",
        errors: [],
        loading: false
    };

    isFormValid = () => {
        let errors = [];
        let error;

        if(this.isFormEmpty(this.state)){
            error = {message: "Fill in all fields"};
            this.setState({errors: errors.concat(error)});
            return false;
        }else if(!(this.isPasswordValid(this.state))){
            error = {message: "Password is invalid"};
            this.setState({errors: errors.concat(error)});
            return false;
        }
        else{
            //form valid
            return true;
        }
    }

    isPasswordValid = ({password, password2}) => {
        if(password.length < 6 || password2.length < 6) {
            return false;
        } else if(password !== password2){
            return false;
        } else {
            return true;
        }
    }

    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

    isFormEmpty = ({username, email, password, password2}) => {
        return !username.length || !email.length || !password.length || !password2.length;
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.isFormValid()) {
            this.setState({errors: [], loading: true})
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    console.log(createdUser);
                    this.setState({loading: false});
                })
                .catch(err => {
                    console.error(err);
                    this.setState({errors: this.state.errors.concat(err), loading: false});
                });

        }
    }

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName)) ? "error" : "";
    }

    render() {

        const {username, email, password, password2, errors, loading} = this.state;

        return(
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as="h2" icon color="orange" textAlign="center">
                        <Icon name="puzzle piece" color="orange" />
                        Register for Meme wars
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>
                            <Form.Input 
                            className={this.handleInputError(errors, 'username')}
                            value={username} fluid name="username" icon="user" iconPosition="left"
                            placeholder="Username" onChange={this.handleChange} type='text'/>

                            <Form.Input 
                            className={this.handleInputError(errors, 'email')}
                            value={email} fluid name="email" icon="mail" iconPosition="left"
                            placeholder="Email Address" onChange={this.handleChange} type='email'/>

                            <Form.Input 
                            className={this.handleInputError(errors, 'password')}
                            value={password} fluid name="password" icon="lock" iconPosition="left"
                            placeholder="Password" onChange={this.handleChange} type='password'/>

                            <Form.Input 
                            className={this.handleInputError(errors, 'password')}
                            value={password2} fluid name="password2" icon="repeat" iconPosition="left"
                            placeholder="Password Confirmation" onChange={this.handleChange} type='password'/>

                            <Button disabled={loading} className={loading ? "loading" : ""} color="orange" fluid size="large">Submit</Button>
                            <Message>Already a user? <Link to="/login">Login</Link></Message>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                </Grid.Column>
            </Grid>
        )
    }
}
export default Register;