import React from 'react';

function BuildForm({ formData, currentBuild, handleInputChange, handleStatChange, handleTalentChange, handleSubmit, resetForm }) {
  return (
    <div className="form-container">
      <h2>{currentBuild ? 'Editar Build' : 'Criar Nova Build'}</h2>
      <form onSubmit={handleSubmit} className="build-form">
        <div className="form-group">
          <label>Nome da Build *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Descrição</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Classe *</label>
            <input
              type="text"
              name="job"
              value={formData.job}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Level</label>
            <input
              type="number"
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              min="1"
              max="200"
            />
          </div>

          <div className="form-group">
            <label>Job Level</label>
            <input
              type="number"
              name="jobLevel"
              value={formData.jobLevel}
              onChange={handleInputChange}
              min="1"
              max="70"
            />
          </div>
        </div>

        <h3>Atributos (Stats)</h3>
        <div className="stats-grid">
          {Object.keys(formData.stats).map(stat => (
            <div key={stat} className="stat-item">
              <label>{stat.toUpperCase()}</label>
              <input
                type="number"
                value={formData.stats[stat]}
                onChange={(e) => handleStatChange(stat, e.target.value)}
                min="1"
                max="130"
              />
            </div>
          ))}
        </div>

        <h3>Talentos (Talent)</h3>
        <div className="stats-grid">
          {Object.keys(formData.talent).map(talent => (
            <div key={talent} className="stat-item">
              <label>{talent.toUpperCase()}</label>
              <input
                type="number"
                value={formData.talent[talent]}
                onChange={(e) => handleTalentChange(talent, e.target.value)}
                min="0"
                max="100"
              />
            </div>
          ))}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-success">
            {currentBuild ? 'Atualizar' : 'Criar'} Build
          </button>
          <button type="button" className="btn btn-secondary" onClick={resetForm}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default BuildForm;
