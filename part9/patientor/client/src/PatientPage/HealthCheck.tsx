import { HealthCheckEntry, HealthCheckRating } from '../types';
import { Icon, SemanticCOLORS } from 'semantic-ui-react';

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const heartColor = (rating: HealthCheckRating): SemanticCOLORS => {
    switch (rating) {
      case HealthCheckRating.CriticalRisk:
        return 'red';
      case HealthCheckRating.HighRisk:
        return 'orange';
      case HealthCheckRating.LowRisk:
        return 'blue';

      default:
        return 'green';
    }
  };

  return (
    <>
      <Icon name="medkit" size="big" />
      <Icon
        name="heart"
        size="large"
        color={heartColor(entry.healthCheckRating)}
      />
    </>
  );
};

export default HealthCheck;