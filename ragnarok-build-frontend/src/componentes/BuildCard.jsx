import React from 'react';

function BuildCard({ build, expandedBuild, toggleExpand, handleEdit, handleDelete }) {
  return (
    <div className={`build-card ${expandedBuild === build._id ? 'expanded' : ''}`}>
      <div 
        className="build-header" 
        onClick={() => toggleExpand(build._id)}
        style={{ cursor: 'pointer' }}
      >
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
  );
}

export default BuildCard;
