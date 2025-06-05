import React from 'react'
import { Card, Container, InputGroup, Form, Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'

export default function AppSearchBar() {
    return (
      <Navbar style={{position: 'absolute', top: 0, left: 0, zIndex: 10, width: '100%', padding: 'auto 71px'}} className='absolute top-0 left-0' bg="light" variant="dark" expand="lg" collapseOnSelect>
      <Container xlg className='col-sm-12 col-md-12 col-lg-12 flex'>
        
          <Link style={{color: 'black'}} className="navbar-brand" to="/">WAREHOUSE</Link>
          <Form style={{display: 'flex', flexDirection: 'row-reverse'}} onSubmit={(e) => e.preventDefault()}>
          <InputGroup>
          <Form.Control
            as="textarea"
            rows={1}
            placeholder="Search..."
            // value={content}
            // onChange={(e) => {
            //   handleTyping(e.target.value)
            // }}
            // onBlur={() => debounceTyping(false)}
            // onKeyDown={handleKeyPress}
          />

            <Button variant="primary">
              <BsSearch />
            </Button>
          </InputGroup>
        </Form>
        </Container>
        </Navbar>
  )
}
