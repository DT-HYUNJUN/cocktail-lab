import { ThemeProvider, styled } from "@mui/material"
import { theme } from "./theme"
import Router from "./Router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

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
        <Wrap>
          <Router />
        </Wrap>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App

const Wrap = styled("div")({
  position: "relative",
  maxWidth: 430,
  minHeight: "100dvh",
  margin: "0 auto",
  boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  paddingTop: "60px",
  backgroundColor: "white",
})
