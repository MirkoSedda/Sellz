import { useState } from "react"
import { Modal, Button } from "antd"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { StarOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

export const RatingModal = ({ children }) => {
  const user = useSelector(state => state.user?.user)

  const [modalVisible, setModalVisible] = useState(false)
  const navigate = useNavigate()

  const handleModal = () => {
    if (user) {
      setModalVisible(true)
    } else {
      //implement go back to this page after login 
      navigate("/login")
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
          toast.success("Thanks for your review. It will appear soon")
        }}
        onCancel={() => setModalVisible(false)}>
        {children}
      </Modal>
    </>
  )
}
