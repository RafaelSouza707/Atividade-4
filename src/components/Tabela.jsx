import { useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import instituicoesDataSet from '../dataset/instituicoes';
import { Col, Row } from 'react-bootstrap';
import cidades from '../dataset/municipios.json';
import estados from '../dataset/estados.json';
import regiao from '../dataset/regiao.json';

const Tabela = () => {

  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [cidadesFiltradas, setCidadesFiltradas] = useState([]);
  
  const estadoAtual = estados.data.find((estado) => estado.Uf === estadoSelecionado);
  const nomeRegiao = regiao.data.find((r) => r.Id === estadoAtual?.Regiao)?.Nome || '';

  const [formData, setFormData] = useState ({
    codig: '',
    nome: '',
    estado: '',
    cidade: '',
    regiao: '',
  });

  function cadastroInstituicao() {
    const novaInstituicao = {
      id: Date.now(), // ou outro método para gerar ID
      codigo: formData.codigo,
      nome: formData.nome,
      estado: formData.estado,
      cidade: formData.cidade,
      regiao: formData.regiao,
    };

    setInstituicoes((prev) => [...prev, novaInstituicao]);
    setFormData({ codigo: '', nome: '', estado: '', cidade: '', regiao: '' });
    setEstadoSelecionado('');
    setCidadesFiltradas([]);
    fecharModal();
  }

  const handleEstadoChange = (e) => {
    const sigla = e.target.value;
    setEstadoSelecionado(sigla);

    const cidadesFiltradas = cidades.data.filter(
      (cidade) => cidade.Uf === sigla
    );
    setCidadesFiltradas(cidadesFiltradas);

    const estadoAtual = estados.data.find((estado) => estado.Uf === sigla);
    const nomeRegiao = regiao.data.find((r) => r.Id === estadoAtual?.Regiao)?.Nome || '';

    setFormData((prev) => ({
      ...prev,
      estado: sigla,
      regiao: nomeRegiao,
    }));
  };



  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = () => setMostrarModal(true);
  const fecharModal = () => setMostrarModal(false);

  let[instituicoes, setInstituicoes] = useState(instituicoesDataSet);

  const removerPessoa = (id) => {
    let pessoasAtualizadas = instituicoes.filter((instituicao, i) => {
      return instituicao.id == id ? false : true;
    });
    setInstituicoes(pessoasAtualizadas)
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
            <th>Codigo</th>
            <th>Nome</th>
            <th>Estado</th>
            <th>Cidade</th>
            <th>Regiao</th>
            <th>Opções</th>
          </tr>
        </thead>
        <tbody>
          {instituicoes.map((instituicao, i) => {
            return (
              <tr key={i}>
                <td>{instituicao.codigo}</td>
                <td>{instituicao.nome}</td>
                <td>{instituicao.estado}</td>
                <td>{instituicao.cidade}</td>
                <td>{instituicao.regiao}</td>
                <td>
                  <Button
                    className={'m-2'}
                    variant="danger"
                    onClick={(event) => {
                      removerPessoa(instituicao.id);
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
            value={formData.codigo}
            onChange={(e) => setFormData({...formData, codigo: e.target.value})}
            >
            <Form.Control type="number" placeholder="#"/>
          </FloatingLabel>
          </Col>

          <Col md={8}>
          <FloatingLabel controlId="nome" label="Nome">
            <Form.Control 
            className='mb-3' 
            type="text" 
            placeholder="nome" 
            value={formData.nome} 
            onChange={(e) => 
            setFormData({...formData, nome: e.target.value})}/>
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
                  value={formData.cidade}
                  onChange={(e) => setFormData({...formData, cidade: e.target.value})}
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
          <Button variant="primary" onClick={cadastroInstituicao}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Tabela;
