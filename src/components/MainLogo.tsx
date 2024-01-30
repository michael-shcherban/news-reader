import { Theme, Typography } from "@mui/material"
import { createStyles, makeStyles } from "@mui/styles";
import { NavLink } from "react-router-dom"

export const MainLogo = () => {
    const classes = useStyles();

    return (
        <NavLink className={classes.link} to='/dashboard'>
            <img className={classes.image} src="src/assets/logo.png" alt="logo" />

            <Typography className={classes.text} color='white' variant='h5' component='span'><b>News Reader</b></Typography>
        </NavLink>
    )
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        link: {
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none'
        },
        image: {
            height: theme.spacing(4.5),
            width: 'auto'
        },
        text: {
           marginLeft: theme.spacing(2),
        }
    })
);
