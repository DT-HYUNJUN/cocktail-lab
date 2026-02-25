import styled from "styled-components"
import type { CocktailCardType } from "../../../shared/model/types"
import { useNavigate } from "react-router-dom"
import { aperolOrange } from "../../../shared/color/color"

interface CocktailCardProps {
  cocktail: CocktailCardType
}

const CocktailCard = ({ cocktail }: CocktailCardProps) => {
  const navigate = useNavigate()

  const handleClickCard = (idDrink: string) => {
    navigate(`/cocktail/${idDrink}`)
  }

  return (
    <Card onClick={() => handleClickCard(cocktail.idDrink)}>
      <ImageWrapper>
        <Image src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
        <Overlay />
      </ImageWrapper>
      <Content>
        <Title>{cocktail.strDrink}</Title>
      </Content>
    </Card>
  )
}

export default CocktailCard

export const Card = styled.div`
  padding-top: 24px;
  overflow: hidden;
  border: none;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  cursor: pointer;
  &:active {
    transform: scale(0.95);
  }

  &:hover {
    img {
      transform: scale(1.1);
    }

    div[data-overlay] {
      opacity: 1;
    }

    h3 {
      color: ${aperolOrange[400]};
    }
  }
`

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3/4;
  overflow: hidden;
  background-color: #f4f4f5;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.6),
    transparent,
    transparent
  );
  opacity: 0;
  transition: opacity 0.5s ease;
`

const Content = styled.div`
  padding: 1rem;
`

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.375rem;
  transition: color 0.3s ease;
`
