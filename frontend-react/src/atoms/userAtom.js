import {atom} from 'jotai';
let name = null;
let email = null;
let userType = null;
if(localStorage.getItem('token')){
     name = localStorage.getItem('name');
     email = localStorage.getItem('email');
     userType = localStorage.getItem('userType');
}
export const userAtom = atom({name,email,userType});