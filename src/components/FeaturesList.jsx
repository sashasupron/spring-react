import '../index.css'; 

function FeaturesList({ features }) {
  if (features.length === 0) {
    return <p style={{ fontSize: '24px', color: '#999' }}>No results</p>;
  }

  return (
    <div className="main-content">
      {features.map((item) => (
        <div className="main-content-item-wrapper" key={item.name}>
          <div className="item-header">
            <img src={item.icon} alt={item.name} className="main-logo" />
            <p className="names">{item.name}</p>
          </div>
          <p className="description">{item.description}</p>
          <p className="versions">
            <span className="version">{item.version}</span>
            {item.extraVersions}
          </p>
        </div>
      ))}
    </div>
  );
}

export default FeaturesList;
