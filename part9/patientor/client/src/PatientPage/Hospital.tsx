import { HospitalEntry } from '../types';
import { Icon } from 'semantic-ui-react';

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <>
      <Icon name="hospital" size="big" />
      <p>
        {entry.discharge.date}: {entry.discharge.criteria}
      </p>
    </>
  );
};

export default Hospital;