/* eslint-disable react/prop-types */
import { CoursePart } from "../types";
import Part from "./Part";

// eslint-disable-next-line react/prop-types
const Content: React.FC<{parts: CoursePart[]}> = ({parts}) => {
    return (
        <>
        {parts.map((part) => (
            <Part key={part.name} part={part} />
        ))}
        </>
    );
};

export default Content