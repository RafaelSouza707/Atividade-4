import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import pessoasDataset from '../dataset/pessoas';
import { Col, Row } from 'react-bootstrap';
import cidades from '../dataset/municipios.json'
import estados from '../dataset/estados.json'
import regiao from '../dataset/regiao.json'

const Tabela = () => {

  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [cidadesFiltradas, setCidadesFiltradas] = useState([]);
  
  const estadoAtual = estados.data.find((estado) => estado.Uf === estadoSelecionado);
  const nomeRegiao = regiao.data.find((r) => r.Id === estadoAtual?.Regiao)?.Nome || '';


  const handleEstadoChange = (e) => {
  const sigla = e.target.value;
  setEstadoSelecionado(sigla);

  const cidadesFiltradas = cidades.data.filter(
    (cidade) => cidade.Uf === sigla
  );
    setCidadesFiltradas(cidadesFiltradas);
  };



  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = () => setMostrarModal(true);
  const fecharModal = () => setMostrarModal(false);

  let[pessoas, setPessoas] = useState(pessoasDataset);

  const handleClick = (event) => {};

  const removerPessoa = (id) => {
    let pessoasAtualizadas = pessoas.filter((pessoa, i) => {
      return pessoa.id == id ? false : true;
    });
    setPessoas(pessoasAtualizadas)
  };

  return (
    <div className='p-5'>
      <div className='mb-3 d-flex'>
        <Button
          variant="primary"
          className='ms-auto p-2.5 m-0'
          onClick={abrirModal}
        >
          +
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Codigo</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Nascimento</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((pessoa, i) => {
            return (
              <tr key={i}>
                <td>{pessoa.id}</td>
                <td>{pessoa.nome}</td>
                <td>{pessoa.sobrenome}</td>
                <td>{pessoa.cpf}</td>
                <td>{pessoa.nascimento}</td>
                <td>
                  <Button
                    className={'m-2'}
                    variant="danger"
                    onClick={(event) => {
                      removerPessoa(pessoa.id);
                    }}
                  >
                    Remover
                  </Button>
                  <Button className={'m-2'} variant="primary">
                    Editar
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>


      <Modal show={mostrarModal} onHide={fecharModal}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar novo registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Row>
          
          <Col md={4}>
          <FloatingLabel
            controlId="floatingInput"
            label="Codigo"
            className="mb-3"
            >
            <Form.Control type="number" placeholder="#"/>
          </FloatingLabel>
          </Col>

          <Col md={8}>
          <FloatingLabel controlId="nome" label="Nome">
            <Form.Control className='mb-3' type="text" placeholder="nome"/>
          </FloatingLabel>
          </Col>

          </Row>
          
          <Row>
            <Col md>
              <FloatingLabel controlId="estado" label="Estado">
                <Form.Select
                  aria-label="Selecione o estado"
                  value={estadoSelecionado}
                  onChange={handleEstadoChange}
                >
                  <option value="">Selecione</option>
                  {estados.data.map((estado) => (
                    <option key={estado.Id} value={estado.Uf}>
                      {estado.Nome} - {estado.Uf}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Col>

            <Col md>
              <FloatingLabel controlId="cidade" label="Cidade">
                <Form.Select
                  aria-label="Selecione a cidade"
                  disabled={!estadoSelecionado}
                >
                  <option value="">Selecione</option>
                  {cidadesFiltradas.map((cidade) => (
                    <option key={cidade.Codigo} value={cidade.Nome}>
                      {cidade.Nome}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>
            </Col>

           <Col md>
              <FloatingLabel controlId="regiao" label="Região">
                <Form.Control
                  plaintext
                  readOnly
                  value={nomeRegiao || 'Região'}
                  className={!nomeRegiao ? 'text-muted' : ''}
                />
              </FloatingLabel>
            </Col>
          </Row>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fecharModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={fecharModal}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Tabela;
