import React from "react";
import {Grid, Form, Segment, Button, Header, Message, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import firebase from "../../firebase";

class Login extends React.Component {
    state = {
        email: "",
        password: "",
        errors: [],
        loading: false,
        usersRef: firebase.database().ref("users")
    };


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

   

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.isFormValid(this.state)) {
            this.setState({errors: [], loading: true})
            firebase.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(signedInUser => {
                console.log(signedInUser);
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    errors: this.state.errors.concat(err),
                    loading: false
                });
            });
        }
    }

    isFormValid = ({email, password}) => {
        return email && password;
    }

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName)) ? "error" : "";
    }

    render() {

        const { email, password, errors, loading} = this.state;

        return(
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as="h1" icon color="violet" textAlign="center">
                        <Icon name="code branch" color="violet" />
                        Log in to Meme wars
                    </Header>
                    <Form onSubmit={this.handleSubmit} size="large">
                        <Segment stacked>


                            <Form.Input 
                            className={this.handleInputError(errors, 'email')}
                            value={email} fluid name="email" icon="mail" iconPosition="left"
                            placeholder="Email Address" onChange={this.handleChange} type='email'/>

                            <Form.Input 
                            className={this.handleInputError(errors, 'password')}
                            value={password} fluid name="password" icon="lock" iconPosition="left"
                            placeholder="Password" onChange={this.handleChange} type='password'/>

                            <Button disabled={loading} className={loading ? "loading" : ""} color="violet" fluid size="large">Submit</Button>
                            <Message>Don't have an account? <Link to="/register">Register</Link></Message>
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
export default Login;