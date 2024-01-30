import { Alert, Box, CircularProgress } from '@mui/material'

interface RequestStateHandlerProps {
  isLoading?: boolean,
  error?: string | null,
}

export const RequestStateHandler = ({ isLoading, error }: RequestStateHandlerProps) => {
  if(isLoading){
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }} marginBottom={2}>
        <CircularProgress />
      </Box>
    )
  }

  if(error){
    return (
      <Alert severity='error'>{error}</Alert>
    )
  }

  return null
}