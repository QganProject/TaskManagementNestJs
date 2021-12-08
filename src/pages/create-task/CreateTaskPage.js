import React, { Component } from "react";
import { TextField, FormControl, Button } from "@material-ui/core";
import styled from "styled-components";
import { inject } from "mobx-react";
import ErrorMessage from "../../components/ErrorMessage";
import "./CreateTaskPage.scss";
import logo from "./background/Logo.png";

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #fcecdd;
  padding: 30px;
  border-radius: 20px;
`;

const Logo = styled.div`
  max-width: 480px;
  width: 220px;
  border-radius: 5px;
  position: absolute;
  margin-bottom: 690px;
  margin-right: 460px;
`;

const ButtonContainer = styled.div`
  background-color: #fcecdd;
  position: absolute;
  margin-top: 430px;
`;

const Heading = styled.h1`
padding: 0px
border-radius: 15px 15px 0px 0px;
background-color: #ff6701;
width: 542px;
height: 60px;
position: absolute;
margin-bottom: 465px;
margin-left: 2px;
text-align: Center
color: white;
`;

@inject("tasksStore", "routerStore")
class CreateTaskPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      errorMessage: null,
    };
  }

  handleSubmitTask = async () => {
    const { tasksStore } = this.props;
    const { title, description } = this.state;

    try {
      await tasksStore.createTask(title, description);
      window.location.hash = "/tasks";
    } catch (error) {
      const errorMessage = error.response.data.message;
      this.setState({ errorMessage });
    }
  };

  render() {
    return (
      <div className="FormWrapper">
        <Logo>
          <img src={logo} alt="Logo" width="700px" height="700px" />
        </Logo>
        <Heading>New Task</Heading>
        <FormContainer>
          <p>Provide information about the task you wish to complete.</p>

          {this.state.errorMessage && (
            <ErrorMessage message={this.state.errorMessage} />
          )}

          <FormControl fullWidth>
            <TextField
              label="Title"
              placeholder="Title"
              margin="normal"
              variant="outlined"
              onChange={(e) => this.setState({ title: e.target.value })}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Description"
              placeholder="Description"
              multiline
              rows="8"
              margin="normal"
              variant="outlined"
              onChange={(e) => this.setState({ description: e.target.value })}
            />
          </FormControl>
        </FormContainer>
        <ButtonContainer>
          <Button
            style={{ marginTop: "10px" }}
            fullWidth
            variant="contained"
            color="orange"
            onClick={this.handleSubmitTask}
          >
            CREATE TASK
          </Button>
        </ButtonContainer>
      </div>
    );
  }
}

export default CreateTaskPage;
