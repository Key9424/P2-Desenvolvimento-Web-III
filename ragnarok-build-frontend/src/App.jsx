import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import BuildForm from './components/BuildForm';
// componente principal da aplicação
function App() {
  const [builds, setBuilds] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentBuild, setCurrentBuild] = useState(null);
  const [expandedBuild, setExpandedBuild] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    job: '',
    level: 99,
    jobLevel: 70,
    stats: { str: 1, agi: 1, vit: 1, int: 1, dex: 1, luk: 1 },
    talent: { pow: 0, sta: 0, wis: 0, spi: 0, con: 0, crt: 0 }
  });

  // URL para a API // executar sempre o API primeiro antes do frontend
  const API_URL = 'http://localhost:3000/api/builds';

  useEffect(() => {
    loadBuilds();
  }, []);
  // função para carregar todas as builds da API
  const loadBuilds = async () => {
    try {
      console.log('Tentando conectar em:', API_URL); 
      const response = await axios.get(API_URL);
      console.log('Builds carregadas:', response.data);
      setBuilds(response.data);
    } catch (error) {
      console.error('Erro detalhado:', error.response || error); // Mais detalhes
      //  mensagens de erro mais específicas
      if (error.code === 'ERR_NETWORK') {
        alert('Erro de rede: Verifique se o servidor backend está rodando na porta 3000');
      } else if (error.response) {
        alert(`Erro do servidor: ${error.response.status} - ${error.response.data.error || 'Erro desconhecido'}`);
      } else {
        alert('Erro ao carregar builds. Verifique se o servidor está rodando.');
      }
    }
  };
  // função para criar ou atualizar uma build
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentBuild) {
        await axios.patch(`${API_URL}/${currentBuild._id}`, formData);
        alert('Build atualizada com sucesso!');
      } else {
        await axios.post(API_URL, formData);
        alert('Build criada com sucesso!');
      }
      resetForm();
      loadBuilds();
    } catch (error) {
      console.error('Erro ao salvar build:', error);
      alert('Erro ao salvar build.');
    }
  };
  // função para editar uma build existente
  const handleEdit = (build) => {
    setCurrentBuild(build);
    setFormData({
      name: build.name,
      description: build.description || '',
      job: build.job,
      level: build.level,
      jobLevel: build.jobLevel,
      stats: build.stats || { str: 1, agi: 1, vit: 1, int: 1, dex: 1, luk: 1 },
      talent: build.talent || { pow: 0, sta: 0, wis: 0, spi: 0, con: 0, crt: 0 }
    });
    setShowForm(true);
  };
  // função para deletar uma build
  const handleDelete = async (id, name) => {
    if (window.confirm(`Tem certeza que deseja deletar a build "${name}"?`)) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert('Build deletada com sucesso!');
        loadBuilds();
      } catch (error) {
        console.error('Erro ao deletar build:', error);
        alert('Erro ao deletar build.');
      }
    }
  };
  // função para resetar o formulário
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      job: '',
      level: 99,
      jobLevel: 70,
      stats: { str: 1, agi: 1, vit: 1, int: 1, dex: 1, luk: 1 },
      talent: { pow: 0, sta: 0, wis: 0, spi: 0, con: 0, crt: 0 }
    });
    setCurrentBuild(null);
    setShowForm(false);
  };
  // funções para manipular mudanças no formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  // funções específicas para stats e talents
  const handleStatChange = (stat, value) => {
    setFormData(prev => ({
      ...prev,
      stats: { ...prev.stats, [stat]: parseInt(value) || 1 }
    }));
  };
  // funções específicas para stats e talents
  const handleTalentChange = (talent, value) => {
    setFormData(prev => ({
      ...prev,
      talent: { ...prev.talent, [talent]: parseInt(value) || 0 }
    }));
  };
  // função para expandir ou recolher detalhes da build
  const toggleExpand = (buildId) => {
    setExpandedBuild(expandedBuild === buildId ? null : buildId);
  };
  // renderização do componente
  return (
    <div className="App">
      <header className="app-header">
        <h1>🎮 Ragnarok Build Creator</h1>
        <nav className="app-nav">
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Ver Builds' : 'Nova Build'}
          </button>
        </nav>
      </header>

      <main className="app-main">
        {showForm ? (
          <BuildForm
            formData={formData}
            onInputChange={handleInputChange}
            onStatChange={handleStatChange}
            onTalentChange={handleTalentChange}
            onSubmit={handleSubmit}
            onCancel={resetForm}
            currentBuild={currentBuild}
          />
        ) : (
          <div className="builds-container">
            <h2>Todas as Builds ({builds.length})</h2>
            {builds.length === 0 ? (
              <div className="empty-state">
                <p>Nenhuma build encontrada. Crie a primeira!</p>
              </div>
            ) : (
              <div className="builds-grid">
                {builds.map(build => (
                  <div key={build._id} className={`build-card ${expandedBuild === build._id ? 'expanded' : ''}`}>
                    <div className="build-header" onClick={() => toggleExpand(build._id)} style={{ cursor: 'pointer' }}>
                      <h3>{build.name}</h3>
                      <div className="header-right">
                        <span className="job-badge">{build.job}</span>
                        <span className="expand-icon">
                          {expandedBuild === build._id ? '▼' : '▶'}
                        </span>
                      </div>
                    </div>

                    <div className="build-body">
                      <div className="level-info">
                        <span>Lv: {build.level}</span>
                        <span>Job Lv: {build.jobLevel}</span>
                      </div>
                      {build.description && <p className="build-description">{build.description}</p>}

                      <div className="build-section">
                        <h4>⚔️ Atributos</h4>
                        <div className="stats-display">
                          <span>STR: {build.stats?.str || 1}</span>
                          <span>AGI: {build.stats?.agi || 1}</span>
                          <span>VIT: {build.stats?.vit || 1}</span>
                          <span>INT: {build.stats?.int || 1}</span>
                          <span>DEX: {build.stats?.dex || 1}</span>
                          <span>LUK: {build.stats?.luk || 1}</span>
                        </div>
                      </div>

                      {expandedBuild === build._id && (
                        <div className="expanded-details">
                          <div className="build-section">
                            <h4>✨ Talentos</h4>
                            <div className="stats-display">
                              <span>POW: {build.talent?.pow || 0}</span>
                              <span>STA: {build.talent?.sta || 0}</span>
                              <span>WIS: {build.talent?.wis || 0}</span>
                              <span>SPI: {build.talent?.spi || 0}</span>
                              <span>CON: {build.talent?.con || 0}</span>
                              <span>CRT: {build.talent?.crt || 0}</span>
                            </div>
                          </div>

                          <div className="build-actions">
                            <button className="btn btn-edit" onClick={() => handleEdit(build)}>
                              Editar
                            </button>
                            <button className="btn btn-delete" onClick={() => handleDelete(build._id, build.name)}>
                              Deletar
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;