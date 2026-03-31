import { ThemeProvider } from "@mui/material"
import { theme } from "./theme"
import Router from "./Router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { backgroundColor } from "../shared/color/color"
import styled from "styled-components"

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <PageBackground>
          <Wrap>
            <Router />
          </Wrap>
        </PageBackground>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App

const PageBackground = styled.div`
  min-height: 100dvh;
  background-color: #f0f0f0; /* 카드 바깥 배경 */

  @media (max-width: 480px) {
    background-color: ${backgroundColor};
  }
`

const Wrap = styled.div`
  position: relative;
  max-width: 480px;
  min-height: 100dvh;
  margin: 0 auto;
  padding-top: 44px;
  padding-bottom: 100px;
  background-color: ${backgroundColor};
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  @media (max-width: 480px) {
    box-shadow: none;
  }
`
