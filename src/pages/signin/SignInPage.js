import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";

import "./SignInPage.scss";
import logo from "./background/Heading.png";
import { inject } from "mobx-react";
import ErrorMessage from "../../components/ErrorMessage";

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #fcecdd;
  padding-top: 60px;
  padding-bottom: 40px;
  padding-left: 30px;
  padding-right: 3px;
  border-radius: 5px;
  position: absolute;
`;

const Logo = styled.div`
  max-width: 480px;
  width: 220px;
  border-radius: 5px;
  position: absolute;
  margin-bottom: 450px;
  margin-right: 290px;
`;

const ButtonContainer = styled.div`
  background-color: #fcecdd;
  position: absolute;
  margin-top: 290px;
`;

const FormField = styled(TextField)`
  width: 50%;
`;

@inject("userStore", "routerStore")
class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMesssage: null,
    };
  }

  submit = async () => {
    this.setState({ errorMessage: null });
    const { username, password } = this.state;

    try {
      await this.props.userStore.signin(username, password);
      window.location.hash = "/tasks";
    } catch (error) {
      const errorMessage = error.response.data.message;
      this.setState({ errorMessage });
    }
  };

  goToSignUp = () => {
    window.location.hash = "/signup";
  };

  render() {
    const { errorMessage } = this.state;
    return (
      <div className="fullscreen-wrapper">
        <Logo>
          <img src={logo} alt="Logo" width="510px" height="200px" />
        </Logo>

        <FormContainer>
          {errorMessage && <ErrorMessage message={this.state.errorMessage} />}
          <div>
            <FormField
              style={{ marginLeft: "110px", marginRight: "110px" }}
              id="outlined-name"
              label="Username"
              margin="dense"
              variant="outlined"
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </div>
          <div>
            <FormField
              style={{
                marginLeft: "110px",
                marginRight: "110px",
                marginBottom: "20px",
              }}
              id="outlined-name"
              label="Password"
              margin="dense"
              variant="outlined"
              type="password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>

          <div>
            <Button fullWidth onClick={this.goToSignUp}>
              Don't have an account? Sign up now!
            </Button>
          </div>
        </FormContainer>
        <ButtonContainer>
          <Button
            style={{
              paddingLeft: "40px",
              paddingRight: "40px",
            }}
            fullWidth
            variant="contained"
            color="#FCECDD"
            onClick={this.submit}
          >
            SIGN IN
          </Button>
        </ButtonContainer>
      </div>
    );
  }
}

export default SignInPage;
