// 数据导出
export { default as profile } from './profile';
export { default as publications, publicationsByYear, getLatestPublications, getFirstAuthorPublications, getCorrespondingAuthorPublications, getPublicationById } from './publications';
export { default as students, allStudents, fzuStudents, sysuStudents, sysuUndergraduates, getStudentById, studentsByInstitution, studentsByDegree } from './students';
export { default as projects, projectsByStatus, projectsByRole } from './projects';
export { default as dataProducts, books } from './dataProducts';

export type { Publication } from './publications';
export type { Student } from './students';
export type { Project } from './projects';
export type { DataProduct } from './dataProducts';
