async function getToken(userKey) {
    if (!userKey) {
        throw new Error('Sesión no iniciada')
    }

    try {
        const reqBody = {
            "user_key": userKey
        }

        const response = await fetch(`${CONFIG.api}/user/getToken`, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const json = await response.json();
            return json.token;
        } else {
            throw new Error(`${response.statusText} (${response.status})`);
        }

    } catch (err) {
        throw new Error(`Fallo al obtener token: ${err.message}`);
    }

}