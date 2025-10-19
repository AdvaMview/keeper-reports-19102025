export async function login(post) {
    //await sleep(2000);
    if (!post) return null;
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}Auth/Login`, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'Content-Type': 'application/json',
        },
    }
    );
    if (!response.ok) {
        throw { message: 'Failed to Login.', status: 500 };
    }
    
    return response.json();
}

export async function verifyLogOn() {
    //await sleep(2000);
    const options = JSON.parse(localStorage.getItem('options'));
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}Auth/verifyLogOn`, options);
    if (response.status === 401) {
        return false
    }
    if (!response.ok) {
        throw { message: 'Failed to verifyLogOn.', status: 500 };
    }

    return response.json();
}

export async function GetBIReports() {
    //await sleep(2000);
    const options = JSON.parse(localStorage.getItem('options'));
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}TrafficReports/GetBIReports`, options);
    if (response.status === 401) {
        return false
    }
    if (!response.ok) {
        throw { message: 'Failed to GetBIReports.', status: 500 };
    }

    return response.json();
}