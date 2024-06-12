import { Box, Button, Modal, Typography } from "@mui/material"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlignment: "center",
  width: 240,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
}

interface Props {
  open: boolean
  handleOpen: () => void
  handleClose: () => void
  deleteUser: () => Promise<void>
}

const DeleteModal = (props: Props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          정말 탈퇴하시겠습니까?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
          탈퇴시, 계정은 복구되지 않습니다.
        </Typography>
        <Box display="flex" flexDirection="column">
          <Button color="error" variant="contained" onClick={props.deleteUser}>
            탈퇴
          </Button>
          <Button color="info" onClick={props.handleClose}>
            취소
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default DeleteModal
