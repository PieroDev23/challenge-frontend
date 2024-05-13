export interface GetProjectsResponse {
    ok: boolean;
    messages: string;
    projects: Project[];
}

export interface Project {
    idProject: string;
    title: string;
    members: CreatedBy[];
    createdBy: CreatedBy;
}

export interface CreatedBy {
    userId: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
}

export interface GetTasksResponse {
    ok: boolean;
    message: string;
    tasks: Task[];
}

export interface Task {
    idTask: string;
    title: string;
    description: string;
    status: 'IN_PROGRESS' | 'PENDING' | 'COMPLETED';
    createdAt: string;
    updatedAt: string;
    asignees: User[];
}


export interface User {
    email: string;
    firstname: string;
    lastname: string;
    role: 'CONSUMER' | 'ADMIN'
    userId: string;
}