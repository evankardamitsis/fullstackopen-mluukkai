/* eslint-disable react/prop-types */
import { CoursePart } from "../types";

// const assertNever = (value: never): never => {
//     throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
// }

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
    switch (part.name) {
      case 'Fundamentals':
        return (
          <div>
            <p>
              {part.name} {part.exerciseCount}
            </p>
            <p>{part.description}</p>
            <hr></hr>
          </div>
        );
  
      case 'Jamstack':
        return (
          <div>
            <p>
              {part.name} {part.exerciseCount}
            </p>
            <p>{part.description}</p>
            <hr></hr>
          </div>
        );
  
      case 'Using props to pass data':
        return (
          <div>
            <p>
              {part.name} {part.exerciseCount}
            </p>
            <p>groupProjectCount {part.groupProjectCount}</p>
            <hr></hr>
          </div>
        );
  
      case 'Deeper type usage':
        return (
          <div>
            <p>
              {part.name} {part.exerciseCount}
            </p>
            <p>{part.description}</p>
            <a href={part.exerciseSubmissionLink}>Link</a>
            <hr></hr>
          </div>
        );
  
      default:
        return null;
    }
  };

  export default Part;