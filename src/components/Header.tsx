import { makeStyles } from "@mui/styles"
import { Box, IconButton, Theme, Tooltip } from "@mui/material"
import { Favorite } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

import { MainLogo } from "./MainLogo"
import { HeaderMenu } from "./HeaderMenu"

interface HeaderProps {
    onClick: () => void
}

export const Header = ({ onClick }: HeaderProps) => {
    const classes = useStyles()
    const navigate = useNavigate()

    return (
        <header className={classes.wrapper}>
            <MainLogo />

            <Box marginRight={16}>
                <Tooltip title='Go to Favorites'>
                    <IconButton onClick={() => navigate('/favorites')}>
                        <Favorite htmlColor='white' />
                    </IconButton>
                </Tooltip>
            </Box>

            <HeaderMenu onClick={onClick} />
        </header>
    )
}

const useStyles = makeStyles((theme: Theme) => ({
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: theme.spacing(10),
        padding: `0 ${theme.spacing(4)}`,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main
    },
    button: {
        marginRight: theme.spacing(2),
        width: theme.spacing(4.5),
        height: theme.spacing(4.5),
        border: '1px solid #fff',
        [theme.breakpoints.up('md')]: {
            display: "none",
        }
    }
}));
