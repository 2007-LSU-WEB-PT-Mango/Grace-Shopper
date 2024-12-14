import React, { useState } from "react";

const UserModal = () => {
  function productPage() {
    return "/account";
  }

  state = { show: false };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  return (
    <main>
      <h1>My Profile</h1>
      <Modal show={this.state.show} handleClose={this.hideModal}>
        <h2>Vampire Weekend</h2>
        <h3>Quantity: 1</h3>
        <img src="https://upload.wikimedia.org/wikipedia/en/2/27/VampireWeekendCD2.jpg" />
        <h3>$15.99</h3>
      </Modal>
      <button type="button" onClick={this.showModal}>
        Open
      </button>
    </main>
  );
};

export default UserModal;
