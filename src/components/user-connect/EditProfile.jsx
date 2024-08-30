import classes from "./Register.module.css";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useState } from "react";
import useFirebaseUser from "../../useFirebaseUser";
import { db } from "../../firebase/configuration";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Progress from "../progress/Progress";
import { upload } from "../../uploadImage";

export const EditProfile = () => {

    const navigate = useNavigate();
    const [img, setImg] = useState({
        file: null,
        url: ""
    });
    const [showProgress, setShowProgress] = useState(false);
    const { uid, email, name } = useFirebaseUser();

    const imgHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImg({
                file: file,
                url: URL.createObjectURL(file),
            })
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setShowProgress(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        const {designation, age } = data;
        try {
            const ref = doc(db, 'users', uid);
            const imgUrl = await upload(img.file);
            await setDoc(ref, {
                imgUrl,
                uid,
                email,
                name,
                age,
                designation,
                feedback: 0,
                takenQuiz: [],
                askedQuiz: [],
            });
            navigate("/", { replace: true });
        } catch (e) {
            console.log(e);
        } finally {
            setShowProgress(false);
        }
    }

    return (
        <div className={classes.login}>
            <h2>Edit Profile</h2>
            <form method='post' action="/edit-profile" onSubmit={submitHandler}>
                <label htmlFor="image" className={classes.image}>
                    <figure className={classes.pickImage}>
                        <MdOutlineAddAPhoto className={classes.editPhoto} style={{ display: img.file ? "none" : "unset" }} />
                        <input type="file" name="image" id="image" style={{ display: "none" }} onChange={imgHandler} />
                        <img src={img.url} alt="" style={{ display: img.file ? "unset" : "none" }} />
                    </figure>
                </label>
                <label htmlFor="email">Email*</label>
                <input id='email' type="email" name='email' value={email || ""} required disabled />
                <label htmlFor="name">Name*</label>
                <input id='name' type="name" name='name' value={name || ""} disabled required />
                <label htmlFor="designation">Designation*</label>
                <input id='designation' type="designation" name='designation' placeholder="Enter your designation" required />
                <label htmlFor="age">Age*</label>
                <input id='age' type="age" name='age' placeholder="Enter your age" required />
                <button disabled={showProgress}>{showProgress ? <Progress /> : "Sign In"}</button>
            </form>
        </div>
    );
}