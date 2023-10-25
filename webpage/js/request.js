async function request(url, userKey, method = 'GET', body = {}) {
    try {
        const token = await getToken(userKey);
        const options = {
            method: method,
            headers: {
                'Authorization': `bearer ${token}`
            },
        };
        
        const bodyStr = JSON.stringify(body);
        
        if (['POST', 'PUT', 'DELETE'].includes(method.toUpperCase())) {
            options.body = bodyStr;
            options.headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(url, options);

        const json = await response.json();
        return json;
    } catch (err) {
        throw new Error(`Error en la petición: ${err.message}`);
    }
}