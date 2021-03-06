import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import FriendsList from "./components/FriendsList/FriendsList";
import FriendsForm from "./components/FriendsList/FriendsForm";
import UpdateModal from "./components/ModalComponents/UpdateModal";
import styled from "styled-components";
import "bulma/css/bulma.css";

const URL = 'http://localhost:5000/friends';

const HeroSection = styled.section.attrs({
  className: "hero is-info is-bold has-text-centered"
})``;

const HeroBody = styled.div.attrs({
  className: "hero-body"
})``;

const Title = styled.div.attrs({
  className: "title"
})``;

class App extends Component {
  constructor() {
    super();
    this.state = {
      friendsData: [],
      name: "",
      age: "",
      email: "",
      updateModalShown: false,
      updateID: 0,
      updateName: "",
      updateAge: "",
      updateEmail: ""
    };
  }

  componentDidMount() {
    axios
      .get(URL)
      .then(response => {
        this.setState({ friendsData: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  changeFriendInfo = e => {
    console.log(e.target.name);
    this.setState({ [e.target.name]: e.target.value });
  };

  addFriend = e => {
    const friend = {
      name: this.state.name,
      age: Number(this.state.age),
      email: this.state.email
    };
    axios
      .post(URL, friend)
      .then(response => {
        console.log("Post", response.data);
        this.setState({ friendsData: response.data, friend: "" });
      })
      .catch(error => console.log(error));
  };

  updateFriend = (id) => {

    const friend = {
      name: this.state.updateName,
      age: Number(this.state.updateAge),
      email: this.state.updateEmail
    };
    axios.put(`${URL}/${id}`, friend).then(response => {
      this.setState({ friendsData: response.data, friend: ""});
    })
    .catch(error => {
      console.log(error);
    })
  }


  deleteFriend = (id) => {
    axios.delete(`${URL}/${id}`).then(response => {
      this.setState({ friendsData: response.data });
    }).catch(error => {
      console.log(error);
    })
  }
  cancelUpdateModal = () => {
    this.setState({ updateModalShown: false });
  }
  showUpdateModal = (id) => {
    this.setState({ updateModalShown: true, updateID: id  });
  }
  render() {
    return (
      <div className="App">
        <HeroSection>
          <HeroBody>
            <Title>Friend List</Title>
          </HeroBody>
        </HeroSection>

        <FriendsForm
          changeInfoHandler={this.changeFriendInfo}
          addFriendHandler={this.addFriend}
        />

        <FriendsList friendsData={this.state.friendsData} 
        showUpdateModalHandler = {this.showUpdateModal}
        deleteFriendHandler = {this.deleteFriend}/>

        <UpdateModal 
        cancelUpdateHandler = {this.cancelUpdateModal} 
        updateModalShown = {this.state.updateModalShown}
        updateFriendHandler = {this.updateFriend}
        updateID = {this.state.updateID}
        changeInfoHandler = {this.changeFriendInfo} />
      </div>
    );
  }
}

export default App;
