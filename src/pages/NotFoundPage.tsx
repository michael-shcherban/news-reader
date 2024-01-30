import { Box, Typography } from "@mui/material"
import { NavLink } from "react-router-dom"

export const NotFoundPage = () => {
  return (
    <Box margin={2}>
      <Typography gutterBottom variant='h4'><b>Page is not exist!</b></Typography>
      <NavLink to={'/dashboard'}>Back to the main page</NavLink>
    </Box>
  )
}