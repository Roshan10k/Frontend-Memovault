import { useNavigate } from "react-router-dom";

function withRouter(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

export default withRouter; // Ensure it's exported as default
