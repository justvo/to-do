import './style/Alert.css'

const Alert = ({ Visible, Confirm, ErrMessage }) => {


    if (!Visible) return null;


    return (
        <div className="alert">
            <div className="alert-content">
                <h2 className="alert-title">{ErrMessage} </h2>
                <div className="alert-buttons">
                    <button className="alert-button" onClick={Confirm}>Confirm</button>
                </div>

            </div>
        </div>
    );
};

export default Alert;
