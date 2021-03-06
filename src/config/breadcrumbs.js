export const mainRoute = () => ({path: '/', title: 'Главная'});

export const universitiesRoute = () => ({path: '/universities', title: 'Университеты'});
export const singleUniversityRoute = (id, title) => ({path: `/university/${id}`, title});
export const addUniversityRoute = () => ({path: '/add/university', title: 'Добавить университет'});

export const departmentsRoute = () => ({path: '/departments', title: 'Факультеты'});
export const singleDepartmentRoute = (id, title) => ({path: `/department/${id}`, title});
export const addDepartmentRoute = () => ({path: '/add/department', title: 'Добавить университет'});

export const disciplinesRoute = () => ({path: '/disciplines', title: 'Дисциплины'});
export const singleDisciplineRoute = (id, title) => ({path: `/discipline/${id}`, title});
export const addDisciplineRoute = () => ({path: '/add/discipline', title: 'Добавить Дисциплину'});

export const studentsRoute = () => ({path: '/students', title: 'Студенты'});
export const singleStudentRoute = (id, title) => ({path: `/student/${id}`, title});
export const addStudentRoute = () => ({path: '/add/student', title: 'Добавить студента'});

export const teachersRoute = () => ({path: '/teachers', title: 'Преподаватели'});
export const singleTeacherRoute = (id, title) => ({path: `/teacher/${id}`, title});
export const addTeacherRoute = () => ({path: '/add/teacher', title: 'Добавить преподавателя'});






