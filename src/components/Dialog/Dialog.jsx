import classes from './Dialog.module.css';

const Dialog = (prop) => {
    return <dialog className={classes.dialog}>
        <p>{prop.text}</p>
        <div className={classes.buttons}>
            {prop.first}
            {prop.second}
        </div>
    </dialog>
}

export default Dialog;