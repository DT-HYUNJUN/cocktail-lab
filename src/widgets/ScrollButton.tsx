import styled from "styled-components"
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined"

const ScrollButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0 })
  }

  return (
    <ButtonBox onClick={scrollToTop}>
      <ArrowUpwardOutlinedIcon fontSize="small" />
    </ButtonBox>
  )
}

export default ScrollButton

const ButtonBox = styled("div")`
  @media (max-width: 480px) {
    display: none;
  }
  box-sizing: border-box;
  display: block;
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #d3dadf;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.04);
  cursor: pointer;
`
