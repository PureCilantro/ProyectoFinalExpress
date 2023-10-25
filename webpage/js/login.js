async function login(username, password) {
    try {
        const reqBody = {
            "user_name": username,
            "user_password": password
        }

        const response = await fetch(`${CONFIG.api}/user/login`, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        switch (json.code) {
            case 200:
                const userKey = json.user_key;
                return { status: 'OK', userKey: userKey };
            case 400:
                return { status: 'FAILURE' };
            default:
                return {status: 'ERROR', msg: json.message};
        }
    } catch (err) {
        return {status: 'ERROR', msg: err.message};
    }
}