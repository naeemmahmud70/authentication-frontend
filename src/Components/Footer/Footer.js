import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'
import './Footer.css'
import { footerInfo, otherLinks, ourServices, usefulLink } from './FooterData'
import { Link } from 'react-router-dom';
import FooterInfo from './FooterInfo';
import FooterCol from './FooterCol';


const Footer = () => {
    return (
        <section id="aboutUs" class='row footer'>
            <Row className="col-md-11 mx-auto">
                <Row className="align-items-center footerInfo">
                    {
                        footerInfo.map(data => <FooterInfo data={data} key={data.id} />)
                    }
                </Row>
                <Col md={6} lg={3} className="fAboutUs">
                    <h5>ABOUT US</h5>
                    <span className="animate-border"></span>
                    <p className="aboutUsDes">Our approach is designed to optimise your organisations defence capability. We will mitigate your cyber security risks and help you deliver your business objectives today and into the future..</p>
                    <ul className="socialIcons">
                        <li>
                            <Link to="/" ><FontAwesomeIcon icon={faFacebook} /></Link>
                        </li>
                        <li>
                            <Link to="/"><FontAwesomeIcon icon={faTwitter} /></Link>
                        </li>
                        <li>
                            <Link to="/"><FontAwesomeIcon icon={faInstagram} /></Link>
                        </li>
                        <li>
                            <Link to="/"><FontAwesomeIcon icon={faLinkedinIn} /></Link>
                        </li>
                    </ul>
                </Col>
                <FooterCol key="2" menuItems={usefulLink} title="USEFUL LINK" />
                <FooterCol key="3" menuItems={ourServices} title="OUR SERVICES" />
                <FooterCol key="4" menuItems={otherLinks} title="OTHER LINKS" />
            </Row>
            <p className="copyRight">Copyright &copy; 2021 <span className="fHighlight">AspireHive</span>. All rights reserved.</p>
        </section>
    );
};

export default Footer;