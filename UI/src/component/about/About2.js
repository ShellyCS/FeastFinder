import React from "react";

class About2 extends React.Component {
  constructor(props) {
    super(props);

    // create state
    this.state = {
      count: 0,
      count2: 3,
    };
  }

  componentDidMount() {
    console.log("Api call here ");
  }

  render() {
    const { count } = this.state;

    return (
      <>
        <h1>Class component</h1>
        <h2>Name : {this.props.name}</h2>
        <h3> State count: {count}</h3>
        <button
          onClick={() => {
            this.setState({ count: 1 });
          }}
        >
          setCount
        </button>
      </>
    );
  }
}

export default About2;
