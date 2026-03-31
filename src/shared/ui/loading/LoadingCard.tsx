import { Card, Skeleton } from "@mui/material"

const LoadingCard = () => {
  return (
    <div>
      <Card>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={345}
          height={200}
        />
      </Card>
      <Skeleton
        sx={{ margin: "9px 2px", boxSizing: "border-box" }}
        animation="wave"
        width="40%"
        height={10}
      />
    </div>
  )
}

export default LoadingCard
