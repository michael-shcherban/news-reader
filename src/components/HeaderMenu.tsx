import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, styled } from "@mui/material"
import { ExpandLess, ExpandMore, LogoutOutlined } from "@mui/icons-material"
import { useState } from "react"
import { Person } from '@mui/icons-material'
import { useNavigate } from "react-router-dom"

import { useAuth } from "../AuthContext"

interface HeaderMenuProps {
    onClick: () => void
}

export const HeaderMenu = ({ onClick }: HeaderMenuProps) => {
    const [open, setOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate()

    const handleClick = () => {
      setOpen((active) => !active);
    };

    return (
        <StyledList>
            <StyledButton onClick={handleClick}>
                <Person />
                {open ? <ExpandLess /> : <ExpandMore />}
            </StyledButton>
            <Collapse in={open} timeout="auto" unmountOnExit >
                <StyledNestedList disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={onClick}>
                        <ListItemIcon>
                            <LogoutOutlined />
                        </ListItemIcon>
                        <ListItemText primary="Log out" onClick={() => {logout(); navigate('/login')}} />
                    </ListItemButton>
                </StyledNestedList>
            </Collapse>
        </StyledList>
    )
}

const StyledList = styled(List)(({theme}) => ({
    width: 'auto',
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    paddingTop: theme.spacing(2.5)
}))

const StyledButton = styled(ListItemButton)(({theme}) => ({
    borderRadius: theme.shape.borderRadius,
    justifyContent: "end"
}))

const StyledNestedList = styled(List)(({theme}) => ({
    width: 'auto',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.common.white,
    boxShadow: theme.shadows[4]
}))
