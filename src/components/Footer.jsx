import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Stack, Image, Nav } from 'react-bootstrap';
import './Main.css';

function Footer() {
  return (
      <footer className=''>
        <Container className='containerCarrossel' fluid>
          <Row className="bg-dark text-white p-4">
            <Col className="mx-5">
              <Stack>
                <Image 
                src="https://img.freepik.com/vetores-gratis/modelo-de-logotipo-profissional-gg_23-2149231008.jpg"
                alt="Logo Minecraft"
                rounded
                width={120}
                height={120}
                />
                <h3>Censo Escolar</h3>
                <p>Em busca de uma educação mais qualificada</p>
              </Stack>
            </Col>
            <Col>
              <Nav className="flex-column fs-6">
                <span className="mb-2">Links Úteis</span>
                <Nav.Link target='_blank' href="#" className="text-white texto-footer">Facebook</Nav.Link>
                <Nav.Link target='_blank' href="#" className="text-white">Instagram</Nav.Link>
                <Nav.Link target='_blank' href="#" className="text-white">X</Nav.Link>
                <Nav.Link target='_blank' href="#" className="text-white">Youtube</Nav.Link>
              </Nav>
            </Col>
            <Col>
              <h4>Contate-nós!</h4>
              <p>censoescolar@gmail.com</p>
              <p>Cell: +55 (84) 99988-7766</p>
            </Col>
          </Row>
        </Container>
      </footer>
  );
}

export default Footer;
