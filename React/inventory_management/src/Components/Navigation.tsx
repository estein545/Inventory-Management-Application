import { useState } from "react";
import { NavDropDownButton, Menu, Header, Title, NavMenuButton, PrimaryNav } from "@trussworks/react-uswds";
import React from "react";

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
      <a href="#two" key="two" className="usa-nav__link">
        <span>Inventory</span>
      </a>,
      <a href="#three" key="three" className="usa-nav__link">
        <span>Warehouses</span>
      </a>,
      <a href="#three" key="three" className="usa-nav__link">
        <span>Toy List</span>
      </a>,
      
    ]
  
    return (
      <>
        <div className={`usa-overlay ${expanded ? 'is-visible' : ''}`}></div>
        <Header basic={true}>
          <div className="usa-nav-container">
            <div className="usa-navbar">
              <Title>Toytopia</Title>
              <NavMenuButton onClick={onClick} label="Menu" />
            </div>
            <PrimaryNav
              items={testItemsMenu}
              mobileExpanded={expanded}
              onToggleMobileNav={onClick}>
            </PrimaryNav>
          </div>
        </Header>
      </>
    )
}