import { useContext } from "react";
import DispatchContext from "../contexts/DispatchContext";
import StateContext from "../contexts/StateContext";

const Modal = () => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  return (
    appState.message && (
      <div className={`modal ${appState.message.type}`}>
        <div className="modal-content">
          <p>{appState.message.text}</p>
          <div className="m-t-20 text-center">
            <button className="btn" onClick={() => appDispatch({ type: "clearMessage" })}>
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
