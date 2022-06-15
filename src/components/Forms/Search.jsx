import React from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { SearchOutlined } from "@ant-design/icons"
import Form from "react-bootstrap/Form";

export const Search = () => {
  const dispatch = useDispatch()
  const { search } = useSelector(state => ({ ...state }))
  const { text } = search

  const navigate = useNavigate()

  const handleChange = e => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    navigate(`/shop?${text}`)
  }

  return (
    <Form className="d-flex justify-content-center align-items-center" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          onChange={handleChange}
          type="search"
          value={text}
          className="mr-sm-2"
          placeholder="Search"
        />
      </Form.Group>
      <SearchOutlined onClick={handleSubmit} className="mx-2" style={{ cursor: "pointer", color: "white" }} />
    </Form>
  )
}
