import { Box, Button } from "@mui/material"

interface IText {
  one: string
  two: string
}

interface Props {
  value: boolean
  handleClickOne: () => void
  handleClickTwo: () => void
  text: IText
}

const MenuBar = (props: Props) => {
  return (
    <Box display="flex" justifyContent="center" gap={2} width={345}>
      <Button
        onClick={props.handleClickOne}
        variant="contained"
        fullWidth
        size="small"
        color={props.value ? "primary" : "secondary"}
        sx={{ color: props.value ? "white" : "black" }}
      >
        {props.text.one}
      </Button>
      <Button
        onClick={props.handleClickTwo}
        variant="contained"
        fullWidth
        size="small"
        color={!props.value ? "primary" : "secondary"}
        sx={{ color: !props.value ? "white" : "black" }}
      >
        {props.text.two}
      </Button>
    </Box>
  )
}

export default MenuBar
