import Carousel from 'react-bootstrap/Carousel';
import img_card1 from '../components/img/img1.jpg'; 
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Main.css';


const Main = () => {
  
  const cards = [
    {
      imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDewOjG25CTvzf_YN7c9jNxS0khduWvKI77Q&s",
      titulo: "Imagem coletada para fins educacionais",
      descricao:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem.",
    },
    {
      imagem: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      titulo: "Imagem coletada para fins educacionais",
      descricao:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem.",
    },
    {
      imagem: img_card1,
      titulo: "Imagem coletada para fins educacionais",
      descricao:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem.",
    },
  ]


  return (
    <main className="main-container">
      <div className="carousel-wrapper">
        <Carousel fade>
          <Carousel.Item>
            <img className="d-block w-100 carousel-img" src={"https://atricon.org.br/wp-content/uploads/2022/10/07102020_CENSO_ESCOLAR_Inep.png"} alt="Slide 1" />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100 carousel-img" src={"https://get.pxhere.com/photo/audience-education-children-boys-school-india-class-room-mangalore-social-group-academic-conference-1342285.jpg"} alt="Slide 2" />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100 carousel-img" src={"https://upload.wikimedia.org/wikipedia/commons/8/81/Escola_Classe_01.jpg"} alt="Slide 3" />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div style={{marginTop: '100px'}}>
          <div className='container'>
            <div className='row justify-content-center'>
              {
                cards.map((item, index) =>
                  <div className='col-md-3 mb-5 d-flex justify-content-center' key={index}>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img variant='top' src={item.imagem} />
                      <Card.Body>
                        <Card.Title>{item.titulo}</Card.Title>
                        <Card.Text>{item.descricao}</Card.Text>
                        <Button variant='secondary'>
                          <a href="#" style={{ color: 'white', textDecoration: 'none' }} target='_blank' rel="noopener noreferrer">
                            Clique para acessar
                          </a>
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;