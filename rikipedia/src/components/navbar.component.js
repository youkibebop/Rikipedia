import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'


export default class SumoNavbar extends Component {

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/"><img
              src={ require('../logo.png') }
              alt=""
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
                Rikipedia
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/Profile/Random">Random</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
    );
  }
}