import { OccupationalHealthcareEntry } from '../types';
import { Icon } from 'semantic-ui-react';

const OccupationalHealthCare: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <>
      <Icon name="doctor" size="big" />
      <p>{entry.employerName}</p>
      {entry.sickLeave && (
        <p>
          {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
        </p>
      )}
    </>
  );
};

export default OccupationalHealthCare;