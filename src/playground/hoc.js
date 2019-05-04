import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
  <div>
    <h1>Info</h1>
    <p>Here is some info: {props.info}</p>
  </div>
);

// const withAdminWarning = (WrappedComponent) => {
//   return (props) => {
//     console.log(props)
//     return (
//       <div>
//         {props.isAdmin && <p>This info is privileged. Please do not share!</p>}
//         <WrappedComponent {...props}/>
//       </div>
//     );
//   }
// };

// This function returns an HOC that renders our Info component
const requireAuth = (WrappedComponent) => {
  return (props) => (
    <div>
      {
        props.isAuthenticated
        ? <WrappedComponent {...props} /> // Spread the props into the WrappedComponent so they get passed through
        : <p>You gotta be logged in to see this spicy content.</p>
      }
    </div>
  );
};

// Call the function, passing in our Info component
// const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuth(Info);

ReactDOM.render(
  <AuthInfo
    isAuthenticated={true}
    info="Some spicy-ass info"
  />, document.getElementById('app')
);

// ReactDOM.render(
//   <AdminInfo
//     isAdmin={true}
//     info="Some good-ass info"
//   />, document.getElementById('app')
// );