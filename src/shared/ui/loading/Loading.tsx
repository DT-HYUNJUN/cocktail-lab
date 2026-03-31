import { Box, CircularProgress, styled } from "@mui/material"

const Loading = () => {
  return (
    <Wrapper>
      <CircularProgress />
    </Wrapper>
  )
}

export default Loading

const Wrapper = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
