// const API_KEY = '0GK7J79-A39488W-JX4G005-14R07MK';
// const API_BEER_URL_BASE = 'https://beerflix-api.herokuapp.com/api/v1/beers/';


// Servidor de backend utilizaremos la API Rest: http://34.89.93.186:8080/
// Registro: http://34.89.93.186:8080/apiv1/register
//     Endpoint: /apiv1/register
// Login: http://34.89.93.186:8080/apiv1/login
//     Endpoint: /apiv1/login
//     Si no estás logado: Error 500: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
//     {
//         "success": false,
//         "error": "ReferenceError: createError is not defined"
//     }
// Listado de anuncios: http://34.89.93.186:8080/apiv1/anuncios
//     Endpoint: /apiv1/anuncios
//     Si no estás logado: Error 500: Failed to load resource: the server responded with a status of 500 (Internal Server Error)
//     {
//         "success": false,
//         "error": "Error: Not logged in"
//     }
// Detalle de un anuncio: http://34.89.93.186:8080/apiv1/anuncios/< ID de MongoDB ></ID>
//     Endpoint: /apiv1/anuncios/< ID de MongoDB ></ID>

// Obtener los posibles tags: http://34.89.93.186:8080/apiv1/tags
//     {
//         "success": true,
//         "count": 4,
//         "results": [
//             "lifestyle",
//             "mobile",
//             "motor",
//             "work"
//         ]
//     }

// import axios from 'axios'; 
// const axios = require('axios');

const API_URL_BASE = 'http://34.89.93.186:8080/apiv1/';

export const userRegister = async (username, password) => {
    try {
        // const response = await axios.post(
        //     `${API_URL_BASE}register`,
        //     {
        //         username: username,
        //         password: password
        //     },
        //     { withCredentials: true }
        // )
        // return response;

        const endpoint = `${API_URL_BASE}register`;
        const response = await fetch (endpoint, {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password': password,
            }),
            headers: {
                'content-type': 'application/json'
            },
        });

        // const data = await response.json();
        // const isRegisterOk = data.success;
        // return isRegisterOk;

        const isRegisterOk = await response.json();
        return isRegisterOk;

    } catch (error) {
        console.error(`The username, ${username}, doesn't exist (${error}).`);
        //throw error;
    }
}

export const userLogin = async (username, password) => {
    try {
        // // console.log('Entramos en userLogin');
        // // console.log(`URL: ${API_URL_BASE}login`);
        // // console.log(`username & password: ${username} & ${password}`);
        // const response = await axios.post(
        //     `${API_URL_BASE}login`,
        //     {
        //         username: username,
        //         password: password
        //     },
        //     { withCredentials: true }
        // )
        // return response;

        const endpoint = `${API_URL_BASE}login`;
        const response = await fetch (endpoint, {
            method: 'POST',
            body: JSON.stringify({
                'username': username,
                'password': password,
            }),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
        });
        
        // const data = await response.json();
        // const loginCorrect = data.success;
        // console.log("loginCorrect:", loginCorrect);
        // return loginCorrect;

        const loginCorrect = await response.json();
        return loginCorrect;

    } catch (error) {
        console.error(`The username, ${username}, doesn't exist (${error}).`);
        //throw error;
    }
}

export const getAds = async (search) => {
    try {
        //console.log('Entramos en getAds');
        // // console.log(`URL: ${API_URL_BASE}anuncios`);
        // const endpoint = `${API_URL_BASE}anuncios`;
        // //const endpoint = `${API_URL_BASE}anuncios?${search}`;
        // const response = await axios (endpoint, {
        //     method: 'GET',
        //     withCredentials: true,
        // });
        
        // const results = await response.data.results;

        // console.log(`response: ${response}`);      
        // console.log(`results: ${results}`);

        // return results;
        
        // console.log('Entramos en getAds');
        const endpoint = `${API_URL_BASE}anuncios?${search}`;
        //const endpoint = `${API_URL_BASE}anuncios`;
        // console.log('endpoint=', endpoint);
        const response = await fetch (endpoint, {
            method: 'GET',
            credentials: 'include',
        });
        
        const data = await response.json();
        // console.log('Salimos de getAds');
        return data;

        // const data = await response.json();
        // const results = data.results;
        // console.log('Salimos de getAds');
        // return results;

    } catch (error) {
        //console.log("Error getAds:", error);
        throw error;
    }
}

export const getAd = async (id) => {
    try {
        //console.log('Entramos en getAd');
        // // console.log(`URL: ${API_URL_BASE}anuncios`);
        // const endpoint = `${API_URL_BASE}anuncios`;
        // //const endpoint = `${API_URL_BASE}anuncios?${id}`;
        // const response = await axios (endpoint, {
        //     method: 'GET',
        //     withCredentials: true,
        // });
        
        // const results = await response.data.results;

        // console.log(`response: ${response}`);      
        // console.log(`results: ${results}`);

        // return results;
        
        //console.log('Entramos en getAd');
        const endpoint = `${API_URL_BASE}anuncios/${id}`;
        //const endpoint = `${API_URL_BASE}anuncios`;
        // console.log('endpoint=', endpoint);
        const response = await fetch (endpoint, {
            method: 'GET',
            credentials: 'include',
        });
        
        // const data = await response.json();
        // const result = data.result;
        // return result;

        const data = await response.json();
        return data;

    } catch (error) {
        throw error;
    }
}

export const getTags = async () => {
    try {
        // console.log('Entramos en getTags');
        const endpoint = `${API_URL_BASE}tags`;
        // console.log('endpoint=', endpoint);
        const response = await fetch (endpoint, {
            method: 'GET',
            credentials: 'include',
        });
        
        const data = await response.json();
        const results = data.results;

        //console.log(`data: ${data}`);
        //console.log(`data.results: ${results}`);
        // console.log('Salimos de getTags');

        return results;

    } catch (error) {
        throw error;
    }
}

// export const getTagss = async () => {
//     try {
//         // console.log('Entramos en getTags');
//         const endpoint = `${API_URL_BASE}tags`;
//         // console.log('endpoint=', endpoint);
//         const response = await fetch (endpoint, {
//             method: 'GET',
//             credentials: 'include',
//         });
        
//         // const data = await response.json();
//         // const results = data.results;
//         // return results;

//         //console.log(`data: ${data}`);
//         //console.log(`data.results: ${results}`);
//         // console.log('Salimos de getTags');

//         const data = await response.json();

//         console.log(`data.results: ${data.results}`);
//         console.log(`data.error: ${data.error}`);


//         return data;

//     } catch (error) {
//         throw error;
//   }
// }

export const createAd = async (name, price, description, tags, type, photo) => {
    try {
        //console.log('Entramos en createAd');
        const endpoint = `${API_URL_BASE}anuncios`;
        // console.log('endpoint=', endpoint);
        // console.log('name=', name, typeof (name));
        // console.log('price=', price, typeof (price));
        // console.log('description=', description, typeof (description));
        // console.log('tags=', tags, typeof (tags));
        // console.log('type=', type, typeof (type));
        // console.log('photo=', photo, typeof (photo));

        // const response = await fetch (endpoint, {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         'name': name,
        //         'price': parseInt(price),
        //         'description': description,
        //         'tags': tags,
        //         'type': type,
        //         'photo': photo
        //     }),
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     credentials: 'include',
        // });

        const response = await fetch (endpoint, {
            method: 'POST',
            body: JSON.stringify({
                'name': name.toString(),
                'price': parseInt(price),
                'description': description.toString(),
                'tags': tags,
                'type': type.toString(),
                'photo': photo.toString()
            }),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
        });

        // const data = await response.json();
        // const results = data.results;
        // return results;

        const data = await response.json();
        return data;

    } catch (error) {
        throw error;
    }
}

export const editAd = async (name, price, description, tags, type, photo, id) => {
    try {

        // console.log('+++name=', name);
        // console.log('+++price=', price);
        // console.log('+++description=', description);
        // console.log('+++tags=', tags);
        // console.log('+++type=', type);
        // console.log('+++photo=', photo);
        // console.log('+++id=', id);

        const endpoint = `${API_URL_BASE}anuncios/${id}`;
        const response = await fetch (endpoint, {
            method: 'PUT',
            body: JSON.stringify({
                'name': name.toString(),
                'price': parseInt(price),
                'description': description.toString(),
                'tags': tags,
                'type': type.toString(),
                'photo': photo.toString()
            }),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
        });

        // const data = await response.json();
        // const results = data.results;
        // return results;

        const data = await response.json();
        return data;

    } catch (error) {
        throw error;
    }
}