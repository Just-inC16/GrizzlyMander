// Importing external modules
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Buffer = () => {
    return (
        <div className="buffer">
            <Loader type="Oval" color="#00BFFF" height={28} width={28} />
        </div>
    );
};

export default Buffer;
