//@todo правильно ли записывать все импорты и создание модулей в главный файл
import Router from './router';
import DataService from './dataService';

import QuestionsTemplate from './questions-page/questionsTemplate.js';
import QuestionsView from './questions-page/questionsView';
import QuestionsController from './questions-page/questionsController';

import ReportTemplate from './report-page/reportTemplate';
import ReportView from './report-page/reportView';
import ReportController from './report-page/reportController.js';

const dataService = new DataService('interviews-app');

const questionsTemplate = new QuestionsTemplate();
const questionsView = new QuestionsView(questionsTemplate);
const questionsController = new QuestionsController(dataService, questionsView);

const reportTemplate = new ReportTemplate();
const reportView = new ReportView(reportTemplate);
const reportController = new ReportController(dataService, reportView);

const router = new Router(dataService, questionsController, reportController);
