import { useState } from "react";
import { NavDropDownButton, Menu, Header, Title, NavMenuButton, PrimaryNav } from "@trussworks/react-uswds";
import React from "react";

const NavStyle = {
  backgroundColor: 'black',
  
}
const wordStyle = {
  color: 'white',
  
}
//Creates the Navigation Bar at the top of the screen on all pages - code taken from trussworks Navigation Module
export default function Navigation() {
    const [expanded, setExpanded] = useState(false)
    const onClick = (): void => setExpanded((prvExpanded) => !prvExpanded)
  
    const testMenuItems = [
      <a href="#linkOne" key="one">
        Current link
      </a>,
      <a href="#linkTwo" key="two">
        Simple link Two
      </a>,
    ]
  
    const [isOpen, setIsOpen] = useState([false, false])
  
    const testItemsMenu = [
      <>
        <Menu
          key="one"
          items={testMenuItems}
          isOpen={isOpen[0]}
          id="testDropDownOne"
        />
      </>,
      <a href="/inventory" key="one" className="usa-nav__link">
        <span style = {wordStyle}>Inventory</span>
      </a>,
      <a href="/" key="two" className="usa-nav__link">
        <span style = {wordStyle}>Warehouses</span>
      </a>,
      <a href="/toys" key="three" className="usa-nav__link">
        <span style = {wordStyle}>Toy List</span>
      </a>,
      
    ]
  
    return (
      <>
        <div className={`usa-overlay ${expanded ? 'is-visible' : ''}`}></div>
        <Header style = {NavStyle} basic={true}>
          <div className="usa-nav-container">
            <div className="usa-navbar">
              <Title style = {wordStyle}>Toytopia</Title>
              
              <NavMenuButton onClick={onClick} label="Menu" />
            </div>
            <img className = "clown" src="src\assets\clowntoy.png" width="57 px"></img>
            <PrimaryNav style = {NavStyle}
              items={testItemsMenu}
              mobileExpanded={expanded}
              onToggleMobileNav={onClick}>
            </PrimaryNav>
          </div>
        </Header>
      </>
    )
}