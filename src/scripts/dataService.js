import { configService } from './configService';

export default class DataService {

    constructor(name) {
        this.name = name;
        this.storage = window.localStorage;

        this.writeToStorage(this.getAllQuestions());
    }

    requestDataFromServer(url) {
        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);

            xhr.onload = function() {
                if (this.status === 200) {
                    resolve(this.response);
                } else {
                    const error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };

            xhr.onerror = function() {
                reject(new Error("Network Error"));
            };

            xhr.send();
        });
    }

    getDataFromStorage() {
        let storageData = this.storage.getItem(this.name);

        if (storageData === 'undefined') {
            storageData = '[]';
        }

        return JSON.parse(storageData);
    }

    getAllQuestions() {
        this.requestDataFromServer(configService.dataUrl).then(
            response => {
                let dataFromServer = JSON.parse(response).questions;
                let dataFromStorage = this.getDataFromStorage();

                if (Array.isArray(dataFromServer) && Array.isArray(dataFromStorage)) {
                    return dataFromServer.concat(dataFromStorage);
                } else {
                    //@todo show error
                    console.log('data from server isn\'t valid');
                }
            },
            error => alert(`Rejected: ${error}`)
        );
    }

    writeToStorage(data) {
        this.storage.setItem(this.name, JSON.stringify(data));
    }
}
