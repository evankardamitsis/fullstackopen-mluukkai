interface CoursePartBase {
    name: string;
    description?: string;
    exerciseCount: number;
  }
  
  interface CourseNormalPart extends CoursePartBase {
    type: "normal";
    groupProjectCount?: number;
    exerciseSubmissionLink?: string;
  }
  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
    description?: string;
    exerciseSubmissionLink?: string;
  }
  
  interface CourseSubmissionPart extends CoursePartBase {
    type: "submission";
    exerciseSubmissionLink: string;
    groupProjectCount?: number;
  }

  interface CourseRequirementPart extends CoursePartBase {
    type: "special";
    description: string;
    requirements: string[];
    groupProjectCount?: number;
    exerciseSubmissionLink?: string;
}
  
  type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseRequirementPart;
  
  export type { CoursePart, CoursePartBase, CourseNormalPart, CourseProjectPart, CourseSubmissionPart };