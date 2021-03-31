import { Component } from '@angular/core';

interface BaseEntity {
  id: string | null;
}

interface Client extends BaseEntity {
  firstName: string;
  lastName: string;
  company: string;
}

const peter: Client = {
  id: '1',
  firstName: 'Peter',
  lastName: 'Porker',
  company: 'Acme, Inc.',
};

const john: Client = {
  id: '2',
  firstName: 'John',
  lastName: 'Doe',
  company: 'NA',
};

const clients: Client[] = [peter, john];

interface ClientState {
  clients: Client[];
  currentClient: Client;
}

const newClient: Client = {
  id: null,
  firstName: '',
  lastName: '',
  company: '',
};

const initialClientState: ClientState = {
  clients,
  currentClient: newClient,
};

class ClientStore {
  state: ClientState;

  constructor(state: ClientState) {
    this.state = state;
  }

  getState() {
    return this.state;
  }

  select(key: string) {
    return this.state[key];
  }
}

const clientsStore = new ClientStore(initialClientState);
const currentClient = clientsStore.select('currentClient');

interface Project extends BaseEntity {
  title: string;
  description: string;
  completed: boolean;
}

const newProject: Project = {
  id: null,
  title: '',
  description: '',
  completed: false,
};

interface ProjectState {
  projects: Project[];
  currentProject: Project;
}

const clientProjects: Project[] = [
  {
    id: '1',
    title: 'Project 1',
    description: 'This is a description',
    completed: false,
  },
  {
    id: '2',
    title: 'Project 2',
    description: 'This is a description',
    completed: false,
  },
];

const initClientProjectState: ProjectState = {
  projects: clientProjects,
  currentProject: newProject,
};

interface AppState {
  clientsState: ClientState;
  projectsState: ProjectState;
}
const appState: AppState = {
  clientsState: initialClientState,
  projectsState: initClientProjectState,
};
const tango = currentClient;

@Component({
  selector: 'fem-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  echo = tango;
}
