import { Box } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

import { Header } from "../components/Header";
import { theme } from "../theme";
import { Container } from "../components/Container";
import { useEffect } from "react";
import { useAuth } from "../AuthContext";

export const Main = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user){
        navigate('/login')
    }
  }, [user])

  return (
    <Box paddingTop={10}>
      <Header onClick={() => {}} />

      <Box height={`calc(100vh - ${theme.spacing(10)})`} paddingY={2}>
        <Container>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};