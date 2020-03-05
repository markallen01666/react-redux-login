import React from "react";
import { connect } from "react-redux";


const UserSpace = props => {
  return <div style={{...pageStyle, ...props.style}}></div>;
};

const pageStyle = {
  
};

// Redux store
const mapStateToProps = state => {
  return {
    signedIn: state.signedIn,
    userName: state.userName
  };
};

export default connect(mapStateToProps)(UserSpace);
