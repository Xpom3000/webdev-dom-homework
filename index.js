//use strict";
import { getComments} from './api.js'
// import { formatDateTime } from './date.js';
import { renderComments } from './render.js';
import { setToken } from './api.js';
import { format } from 'date-fns';
import {
    getUserFromLocalStorage,
    saveUserToLocalStorage,
    removeUserFromLocalStorage
} from './helpers.js'
let comments = [];

// Форматируем дату из библиотеки date-fns
const now = new Date();
const createDate = 
// format(now, "dd/MM/yyyy hh:mm"); // 26/03/2023 10:33
// format(now, "MM-dd-yyyy hh:mm"); // 03-26-2023 10:33
// format(now, "dd.MM.yyyy hh:mm:ss"); // 26.03.2023 10:33:41
    format(now, "yyyy-MM-dd hh.mm.ss"); // 2023-03-26 10.33.41

// Запрос двнных в API на комментарий
export let user = getUserFromLocalStorage();
// export let user = null;
export const setUser = (newUser) => {
    user = newUser;
    saveUserToLocalStorage(user)
};

export const logout = () => {
    user = null;
    removeUserFromLocalStorage();
  };

export const fetchAndRenderComments = (comments) => { 
    getComments({ token: setToken() })
    .then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
            return {
                id: comment.id,
                name: comment.author.name,
                date: createDate,
                text: comment.text,
                likes: comment.likes,
                isLiked: false,
            };
        });
        comments = appComments;
        renderComments(comments);
    });
};
fetchAndRenderComments(comments);
// renderLogin()
//Ркндер функция
//render.js
//Кнопка лайков
//likes.js
//Кнопка удаления
//delete.js
//форма добавления  

