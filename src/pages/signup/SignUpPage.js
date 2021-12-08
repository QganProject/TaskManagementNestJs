import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";

import "./SignUpPage.scss";
import logo from "./background/Heading.png";
import { inject } from "mobx-react";
import ErrorMessage from "../../components/ErrorMessage";

const Logo = styled.div`
  max-width: 480px;
  width: 220px;
  border-radius: 5px;
  position: absolute;
  margin-bottom: 575px;
  margin-right: 320px;
`;

const Title = styled.h1`
  margin-top: 0px;
  text-align: center;
`;
const Info = styled.p`
  margin-top: 5px;
  text-align: center;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #fcecdd;
  padding: 30px;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  background-color: #fcecdd;
  position: absolute;
  margin-top: 410px;
`;

const FormField = styled(TextField)`
  width: 100%;
  text-align: center;
`;

@inject("userStore", "routerStore")
class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errorMessage: null,
    };
  }

  submit = async () => {
    const { username, password } = this.state;

    try {
      await this.props.userStore.signup(username, password);
      window.location.hash = "/signin";
    } catch (error) {
      const errorMessage = error.response.data.message;
      this.setState({ errorMessage });
    }
  };

  render() {
    const { errorMessage } = this.state;
    const color = "#fcecdd";
    return (
      <div className="fullscreen-wrapper">
        <Logo>
          <img src={logo} alt="Logo" width="540px" height="200px" />
        </Logo>
        <FormContainer>
          <Title>Register</Title>
          <hr style={{ color: color, backgroundColor: color }} />
          <Info> Provide a Username and a Password</Info>
          {errorMessage && <ErrorMessage message={this.state.errorMessage} />}

          <div>
            <FormField
              id="outlined-name"
              label="Username"
              margin="dense"
              variant="outlined"
              onChange={(e) => this.setState({ username: e.target.value })}
            />
          </div>
          <div>
            <FormField
              id="outlined-name"
              label="Password"
              margin="dense"
              variant="outlined"
              type="password"
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>
          <Info>
            More than 8 Characters
            <br /> Atleast 1 uppercase letter
            <br /> Atleast 1 lowercase letter
            <br />
            Atleast 1 number OR special charracter.
          </Info>
          <hr style={{ color: color, backgroundColor: color }} />
        </FormContainer>
        <ButtonContainer>
          <Button
            style={{
              paddingLeft: "40px",
              paddingRight: "40px",
            }}
            fullWidth
            variant="contained"
            color="black"
            onClick={this.submit}
            background-color="#fcecdd"
          >
            SIGN IN
          </Button>
        </ButtonContainer>
      </div>
    );
  }
}

export default SignUpPage;
