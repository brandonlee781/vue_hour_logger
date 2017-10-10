import { IProject } from '../../interfaces/project';

export interface Project extends IProject {};

export interface ProjectState {
  projects: Project[];
}

export interface ProjectContext {
  projects: Project[];
}