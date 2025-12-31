import { Typography, type TypographyProps } from "@mui/material"

interface SectionTitleProps {
  text: string
}

const SectionTitle = ({ text }: SectionTitleProps & TypographyProps) => {
  return (
    <Typography color="primary" fontFamily="NanumSquareNeoHeavy">
      {text}
    </Typography>
  )
}

export default SectionTitle
