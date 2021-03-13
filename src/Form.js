import React, { Component } from "react";

const normalizeInput = (value, previousValue) => {
  if (!value) return value;
  const currentValue = value.replace(/[^\d]/g, "");
  const cvLength = currentValue.length;

  if (!previousValue || value.length > previousValue.length) {
    if (cvLength < 4) return currentValue;
    if (cvLength < 7)
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
      3,
      6
    )}-${currentValue.slice(6, 10)}`;
  }
};

const validateInput = (value) => {
  let error = "";

  if (!value) error = "Required!";
  else if (value.length !== 14)
    error = "Invalid phone format. ex: (555) 555-5555";

  return error;
};

class Form extends Component {
  state = { phone: "", error: "" };

  handleChange = ({ target: { value } }) => {
    this.setState((prevState) => ({
      phone: normalizeInput(value, prevState.phone)
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const error = validateInput(this.state.phone);

    if (!error) {
      this.props.onSubmitForm(this.state.phone);
    }

    this.setState({ error }, () => {
      if (!error) {
        setTimeout(() => {
          alert(JSON.stringify(this.state, null, 4));
        }, 300);
      }
    });
  };

  handleReset = () => {
    this.setState({ phone: "", error: "" });
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="input-container">
          <p className="label">Phone:</p>
          <input
            className="input"
            type="text"
            name="phone"
            placeholder="(xxx) xxx-xxxx"
            value={this.state.phone}
            onChange={this.handleChange}
          />
          {this.state.error && <p className="error">{this.state.error}</p>}
        </div>
        <div className="btn-container">
          <button
            className="btn danger"
            type="button"
            onClick={this.handleReset}
          >
            Reset
          </button>
          <button className="btn primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    );
  }
}
export default Form;
