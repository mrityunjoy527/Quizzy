import classes from "./Progress.module.css";
import { motion } from "framer-motion";

export default function Progress() {

    const variants = {
        initial: {
            y: -6
        },
        animate: {
            y: 6,
            transition: {
                repeatType: "mirror",
                repeat: Infinity,
                duration: 0.5,
                staggerChildren: 0.1,
            }
        }
    };

    return <motion.div className={classes.progress} variants={variants} initial="initial" animate="animate">
        <motion.div className={classes.dot} variants={variants}></motion.div>
        <motion.div className={classes.dot} variants={variants}></motion.div>
        <motion.div className={classes.dot} variants={variants}></motion.div>
        <motion.div className={classes.dot} variants={variants}></motion.div>
        <motion.div className={classes.dot} variants={variants}></motion.div>
    </motion.div>;
}