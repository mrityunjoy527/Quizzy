import classes from './Dialog.module.css';
import PropTypes from 'prop-types';

const Dialog = ({ text }) => {
    return <dialog className={classes.dialog}>
        <h3>{text}</h3>
        <div className={classes.buttons}>
            <button>OK</button>
            <button>HOME</button>
        </div>
    </dialog>
}

Dialog.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Dialog;