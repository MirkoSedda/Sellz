import { useState } from "react"
import { Modal, Button } from "antd"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { StarOutlined } from "@ant-design/icons"
import LoginModal from "../modal/LoginModal"

const RatingModal = ({ children }) => {
  const user = useSelector(state => state.user?.user)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false)

  const handleModal = () => {
    if (user) {
      setModalVisible(true)
    } else {
      handleShow(true)
    }
  }

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" />
        <br />
        {user ? "Leave rating" : "Login to leave rating"}
      </div>
      <Modal
        title="Leave your rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false)
          toast.info("Thanks for your review. It will appear soon")
        }}
        onCancel={() => setModalVisible(false)}>
        {children}
      </Modal>
      <LoginModal handleShow={handleShow} handleClose={handleClose} show={show} />
    </>
  )
}

export default RatingModal