/* Основная функция для совершения запросов на сервер. */

const createRequest = (options = {}, callback) => {
    let URL = options.URL;

    if (!options.body && !(URL === '/user/logout' )) return;
    
    if (options.method === 'GET' && (options.body)) {
        const dataArr = Object.entries(options.body);
        dataArr.map(([key, value]) => `${key}=${value}`);
        const encodedData = '?' + dataArr.join('&');
        URL += encodedData;
        delete options.body;
        delete options.URL;
    }

    fetch(URL, options)
        .then(response => response.json)
        .then(data => callback(data))
        .catch(error => console.log(error));

};
