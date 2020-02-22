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

import axios from 'axios'; 
// const axios = require('axios');

const API_URL_BASE = 'http://34.89.93.186:8080/apiv1/';

export const userRegister = async (username, password) => {
    try {
        const response = await axios.post(
            `${API_URL_BASE}register`,
            {
                username: username,
                password: password
            },
            { withCredentials: true }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const userLogin = async (username, password) => {
    try {
        // console.log('Entramos en userLogin');
        // console.log(`URL: ${API_URL_BASE}login`);
        // console.log(`username & password: ${username} & ${password}`);
        const response = await axios.post(
            `${API_URL_BASE}login`,
            {
                username: username,
                password: password
            },
            { withCredentials: true }
        )
        return response;
    } catch (error) {
        throw error;
    }
}

export const getAds = async () => {
    try {
        // console.log('Entramos en getAds');
        // console.log(`URL: ${API_URL_BASE}anuncios`);
        const response = await axios.get(
            `${API_URL_BASE}anuncios`,
            { withCredentials: true }
        )

        console.log(`response: ${response}`);
        
        const { success, error, results } = response;

        console.log(`success & error: ${success} & ${error}`);
        console.log(`results: ${results}`);

        // if (success) {
        //     return results;
        // } else if (error) {
        //     return error;
        // }

        // return response;

    } catch (error) {
        throw error;
    }
}

// getAds: async () => {
//     try {
//       const response = await fetch(`${adsApiEndpoint}`, {
//         method: 'GET',
//         headers: {
//           'Content-type': 'application/json'
//         },
//         credentials: 'include'
//       });

//       const isGetAdsSuccesfull = await response.json();
//       const { success, error, results } = isGetAdsSuccesfull;

//       if (success) {
//         return results;
//       } else if (error) {
//         return error;
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   }




// const api = (apiURL = API_URL_BASE) => {

    // const searchAPIUrlEndpoint = `${apiURL}?search`;
    // const advertAPIUrlEndpoint = `${apiURL}?limit=10`;


  //     const response = await axios.post(
  //       'http://34.89.93.186:8080/apiv1/login',
  //       {
  //         username: 'jeseromero',
  //         password: 'jeseromero'
  //       },
  //       { withCredentials: true }
  //     );

  //     console.log(response);

    // return {
    //     /*create registry*/
    //     createRegistry: async (usu, pwd) => {
    //         try{
                
    //             // usu='sergio';
    //             // pwd='perez';

    //             const response = await axios.post(
    //                 `${apiURL}register`,
    //                 {
    //                     username: usu,
    //                     password: pwd
    //                 },
    //                 { withCredentials: true }
    //             );
                
    //             //debugger;

    //             console.log(`Response: ${response}`);

    //             console.log(`Status code: ${response.status}`);
    //             console.log(`Status text: ${response.statusText}`);
    //             console.log(`Request method: ${response.request.method}`);
    //             console.log(`Path: ${response.request.path}`);
    //             console.log(`Date: ${response.headers.date}`);
    //             console.log(`Data: ${response.data}`);


    //             /*if code distintc 200 or 300:*/
    //             if(response.config.validateStatus == false){
    //                 new Error(`Error creating Registry. Code error: ${response.status}`);
    //             }

    //             // const registries = response.data.beer.likes;

    //             // return registries;

    //             // const registries = await response.json();
    //             // return registries;

    //         }catch(err){
    //             console.log(err.message);
    //             throw err;
    //         }
    //     }
    // }
// };

//export default api;