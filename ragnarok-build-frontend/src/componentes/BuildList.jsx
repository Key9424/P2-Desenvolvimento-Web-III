import React from 'react';
import BuildCard from './BuildCard';

function BuildList({ builds, expandedBuild, toggleExpand, handleEdit, handleDelete }) {
  return (
    <div className="builds-container">
      <h2>Todas as Builds ({builds.length})</h2>
      {builds.length === 0 ? (
        <div className="empty-state">
          <p>Nenhuma build encontrada. Crie a primeira!</p>
        </div>
      ) : (
        <div className="builds-grid">
          {builds.map(build => (
            <BuildCard
              key={build._id}
              build={build}
              expandedBuild={expandedBuild}
              toggleExpand={toggleExpand}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BuildList;
