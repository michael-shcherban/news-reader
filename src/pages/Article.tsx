import { makeStyles } from "@mui/styles"
import { Box, Theme, Typography } from "@mui/material"
import { useLocation, NavLink } from "react-router-dom";
import { red } from "@mui/material/colors";

const emptyImg = 'src/assets/no-image.svg'

export const Article = () => {
    const classes = useStyles()
    const { state } = useLocation()

    //TODO: we dont have real images here for now
    //const href = article?.image ?? emptyImg;
    const href = emptyImg;

    const published = state?.published;

    return (
        <div>
            <NavLink to={'/dashboard'}>Back to the list</NavLink>

            <Typography variant='h3' component='h1'><b>{state.title}</b></Typography>

            <Box display='flex' justifyContent='space-between'>
                <Typography gutterBottom color='GrayText' component='span'><b>Author: {state?.author}</b></Typography>

                <Typography gutterBottom color='GrayText' component='span'><b>Time: {published}</b></Typography>
            </Box>

            <div className={classes.imageWrapper}>
                <img className={classes.image} src={href} />
            </div>

            <Box> 
                <Typography>{state?.description}</Typography>
            </Box>
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) => ({
    listItem: {
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'flex-start',
        height: theme.spacing(20),
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        padding: 0,
        '&::before': {
            zIndex: -1,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[6],
            content: "''",
            display: 'block'
        },
        '&::after': {
            zIndex: -1,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[15],
            content: "''",
            display: 'none'
        },
        '&:hover': {
            '&::before': {
                display: 'none'
            },
            '&::after': {
                display: 'block'
            },
        },
        '&:not(:last-child)': {
            marginBottom: theme.spacing(2),
        }
    },
    image: {
        width: '100%',
        height: 'auto',
        maxHeight: '100%',
        display: 'inline-box'
    },
    imageWrapper: {
        height: theme.spacing(60),
        backgroundColor: red[50],
        marginBottom: theme.spacing(4),
    }
}));
