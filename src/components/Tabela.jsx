import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import instituicoesData from '../dataset/instituicoes'
import { Col, Row } from 'react-bootstrap';
import cidades from '../dataset/municipios.json';
import estados from '../dataset/estados.json';
import regiao from '../dataset/regiao.json';

const Tabela = () => {
  const [estadoSelecionado, setEstadoSelecionado] = useState('');
  const [cidadesFiltradas, setCidadesFiltradas] = useState([]);

  const estadoAtual = estados.data.find((estado) => estado.Uf === estadoSelecionado);
  const nomeRegiao = regiao.data.find((r) => r.Id === estadoAtual?.Regiao)?.Nome || '';

  const [formData, setFormData] = useState({
    codigo: '',
    nome: '',
    estado: '',
    cidade: '',
    regiao: '',
    qt_mat_bas: '',
    qt_mat_prof: '',
    qt_mat_eja: '',
    qt_mat_esp: '',
  });

  const [instituicoes, setInstituicoes] = useState(() =>{
    const dadosSalvos = localStorage.getItem('instituicoes');
    return dadosSalvos ? JSON.parse(dadosSalvos) : instituicoesData.data;
  })
  
  useEffect(() => {
    localStorage.setItem('instituicoes', JSON.stringify(instituicoes));
  }, [instituicoes]);

  function cadastroInstituicao() {
    const novaInstituicao = {
      id: Date.now(),
      codigo: formData.codigo,
      nome: formData.nome,
      estado: formData.estado,
      cidade: formData.cidade,
      regiao: formData.regiao,
      qt_mat_bas: formData.qt_mat_bas,
      qt_mat_prof: formData.qt_mat_prof,
      qt_mat_eja: formData.qt_mat_eja,
      qt_mat_esp: formData.qt_mat_esp
    };

    setInstituicoes((prev) => [...prev, novaInstituicao]);
    setFormData({ codigo: '', nome: '', estado: '', cidade: '', regiao: '', qt_mat_bas: '', qt_mat_prof: '', qt_mat_eja: '', qt_mat_esp: '' });
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
      cidade: '', // resetar cidade quando mudar estado
    }));
  };

  const removerInstituicao = (id) => {
    setInstituicoes((prev) => prev.filter(item => item.id !== id));
  };

  const [mostrarModal, setMostrarModal] = useState(false);
  const abrirModal = () => setMostrarModal(true);
  const fecharModal = () => setMostrarModal(false);

  return (
    <div className='p-4'>
      <div className='mb-2 d-flex'>
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
            <th>Código</th>
            <th>Nome</th>
            <th>Estado</th>
            <th>Cidade</th>
            <th>Região</th>
            <th>Mat. da Educação Básica</th>
            <th>Mat. da Educação Profissional</th>
            <th>Mat. da Educação de Jovens e Adultos</th>
            <th>Mat. da Educação Especial</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {instituicoes.map((instituicao) => (
            <tr key={instituicao.id}>
              <td>{instituicao.codigo}</td>
              <td>{instituicao.nome}</td>
              <td>{instituicao.estado}</td>
              <td>{instituicao.cidade}</td>
              <td>{instituicao.regiao}</td>
              <td>{instituicao.qt_mat_bas}</td>
              <td>{instituicao.qt_mat_prof}</td>
              <td>{instituicao.qt_mat_eja}</td>
              <td>{instituicao.qt_mat_esp}</td>
              <td>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => removerInstituicao(instituicao.id)}
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={mostrarModal} onHide={fecharModal}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar novo registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Row>
            <Col md={4}>
              <FloatingLabel controlId="floatingInput" label="Código" className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="#"
                  value={formData.codigo}
                  onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
                />
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
                    setFormData({ ...formData, nome: e.target.value })}
                />
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
                  onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
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

          <Row>
            <Col md={6}>
              <FloatingLabel controlId="floatingInput" label="Mat. Básico" className="mt-3">
                <Form.Control
                  type="number"
                  placeholder="#"
                  value={formData.qt_mat_bas}
                  onChange={(e) => setFormData({ ...formData, qt_mat_bas: e.target.value })}
                />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="floatingInput" label="Mat. da Edu. Profissional" className="mt-3">
                <Form.Control
                  type="number"
                  placeholder="#"
                  value={formData.qt_mat_prof}
                  onChange={(e) => setFormData({ ...formData, qt_mat_prof: e.target.value })}
                />
              </FloatingLabel>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <FloatingLabel controlId="floatingInput" label="Mat. Eja" className="mt-3">
                <Form.Control
                  type="number"
                  placeholder="#"
                  value={formData.qt_mat_eja}
                  onChange={(e) => setFormData({ ...formData, qt_mat_eja: e.target.value })}
                />
              </FloatingLabel>
            </Col>

            <Col md={6}>
              <FloatingLabel controlId="floatingInput" label="Mat. da Edu. Especial" className="mt-3">
                <Form.Control
                  type="number"
                  placeholder="#"
                  value={formData.qt_mat_esp}
                  onChange={(e) => setFormData({ ...formData, qt_mat_esp: e.target.value })}
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
