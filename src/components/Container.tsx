import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material"
import { ReactNode } from "react"

interface ContainerProps {
    children: ReactNode
}

export const Container = ({ children }: ContainerProps) => {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            {children}
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        [theme.breakpoints.up('xl')]: {
            maxWidth: '1400px',
        },
        [theme.breakpoints.up('lg')]: {
            maxWidth: '1000px',
            padding: 0
        },
        margin: '0 auto',
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10)
    }
}));
