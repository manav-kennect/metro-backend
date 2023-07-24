 const jwt = require('jsonwebtoken');
 const {connect2DB} = require('../db-config.js')
 const ObjectID = require('mongodb').ObjectID;
 
 
 
 const private = {
     encode: (data) => {
         return jwt.sign(data, "1234",{expiresIn: 60 * 60 * 24});
     },
     decode: token => {
         return new Promise(function (resolve, reject) {
             if (typeof token == 'string') {
                 jwt.verify(token, "1234", function (err, decoded) {
                     console.log('error=', err)
                     if (!!err) {
                         if (err.name) {
                             if (err.name == 'TokenExpiredError') {
                                 reject({ ok: false, message: 'TokenExpiredError' });
                             }
                         }
                         reject({ ok: false, message: 'Failed to authenticate token.' });
                     } else {
                         // if everything is good, save to request for use in other routes
                         resolve({ ok: true, decoded: decoded });
                     }
                 });
             }
             else {
                 reject({ ok: false, message: 'issue' });
             }
         });
     },
     verify: token => {
         return new Promise(function (resolve, reject) {
             jwt.verify(token, "1234", (err, decoded) => {
                 if (err) {
                     reject({ ok: false, message: 'Failed to authenticate token.' });
                 } else {
                     resolve(decoded);
                 }
             });
         });
     },
 
 }
 
 module.exports = {
     issueToken: async data => {
        // console.log(client)
        const db = await client.db('test');
         let query = {
             username: data.username.toLowerCase(),
             password: data.password,
         };
         let projection = {
             _id: 1,
             role: 1,
             username: 1,
             name: 1
         };
         console.log("INSIDE ISSUE")
         let cResult = await db.collection('auth_details').findOne(query, { 'projection': projection });
         if (cResult) {
            return {token: private.encode({'username':cResult.username,'role': cResult.role,'_id': String(cResult._id)}),user:{role:cResult.role,username:cResult.username}};
         } else {
             return { ok: false, message: 'No such user or maybe wrong password' };
         }
         
     },
 
     authenticate: async (token) => {
         return await private.verify(token);
     },
 
 }