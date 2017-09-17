import Controller from './controller';
import DataService from './dataService';
import TemplateService from './templateService';
import ViewService from './viewService';

const dataService = new DataService('interviews-app');
const templateService = new TemplateService();
const viewService = new ViewService(templateService);

const controller = new Controller(dataService, viewService);

// @todo route???
// window.addEventListener('load', setView);
// window.addEventListener('hashchange', setView);
