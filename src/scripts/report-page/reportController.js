import { configService } from './../configService';

export default class ReportController {

    constructor(dataService, reportView) {
        this.dataService = dataService;
        this.reportView = reportView;
    }

    initView() {
        const allQuestions = this.dataService.getDataFromStorage();
        this.reportView.showInitialTemplate();
    }
}
