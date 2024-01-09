import {
    Container, DropdownItem, DropdownMenu, DropdownToggle,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupText, Media,
    Nav,
    Navbar,
    UncontrolledDropdown
} from "reactstrap";
import ce from "google-map-react";

export default function HeaderSearch(){
    return(
            <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
                <Container fluid className={"d-flex"}>
                    <Form className="navbar-search navbar-search-dark form-inline mr-3 d-none my-auto d-md-flex ml-lg-auto">
                        <FormGroup className="mb-0">
                            <InputGroup className="input-group-alternative">
                                <InputGroupText>
                                    <i className="fas fa-search" />
                                </InputGroupText>
                                <Input placeholder="Search" type="text" />
                            </InputGroup>
                        </FormGroup>
                    </Form>
                    <Nav className="align-items-center d-none my-auto d-md-flex" navbar>
                        <UncontrolledDropdown nav>
                            <DropdownToggle className="pr-0" nav>
                                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                        alt="..."
                        style={{height:50, borderRadius: 25}}
                        src={require("../../../assets/images/img.png")}

                    />
                  </span>
                                    <Media className="ml-2 d-none d-lg-block">
                    <span className="mb-0 text-sm font-weight-bold" style={{color: "red", fontWeight: "bold"}}>
                      Jessica Jones
                    </span>
                                    </Media>
                                </Media>
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem className="noti-title" header tag="div">
                                    <h6 className="text-overflow m-0">Welcome!</h6>
                                </DropdownItem>
                                <DropdownItem to="/admin/user-profile">
                                    <i className="ni ni-single-02" />
                                    <span>My profile</span>
                                </DropdownItem>
                                <DropdownItem to="/admin/user-profile">
                                    <i className="ni ni-settings-gear-65" />
                                    <span>Settings</span>
                                </DropdownItem>
                                <DropdownItem to="/admin/user-profile">
                                    <i className="ni ni-calendar-grid-58" />
                                    <span>Activity</span>
                                </DropdownItem>
                                <DropdownItem to="/admin/user-profile">
                                    <i className="ni ni-support-16" />
                                    <span>Support</span>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                                    <i className="ni ni-user-run" />
                                    <span>Logout</span>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Container>
            </Navbar>
    )
}