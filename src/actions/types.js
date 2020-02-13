export const LOGIN = "LOGIN";
export const LOADING = "LOADING";
export const REGISTER = "REGISTER";
export const IS_AUTHENTICATED = "IS_AUTHENTICATED";
export const LIST_USER = "LIST_USER";
export const DETAIL_USER = "DETAIL_USER";
export const SET_USER_CURRENT = "SET_USER_CURRENT";
export const HANDLE_LOGIN = "HANDLE_LOGIN";
export const GET_ERRORS = "GET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const GET_POSTS = "GET_POSTS";
export const GET_POST = "GET_POST";
export const GET_PROFILE = "GET_PROFILE";



//---------------- Regular expression -------------
export const regexpEmail = /^[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+$/;
export const regexpName = /^[a-zA-Z0-9]*$/;
export const regexpPass = /^.{6,}$/;

//---------------- Path redirect page -------------

export const DASHBOARD = "/dashboard";
export const LOGIN_URL = "/login";
export const FEEDS = "/feeds";

//---------------- URL API ------------------------
// domain: http://202.182.100.160:9000/api
export const api_user = "/profile/all";
export const api_login = "/users/login";
export const api_register = "/users/register";
export const api_posts = "/posts";
export const api_profile = "/profile";
export const api_experience = "/profile/experience";
export const api_education = "/profile/education";

// ------------ status in profile ----------------------
export const status = [
    "* Select Professional Status",
    "Developer",
    "Junior Developer",
    "Senior Developer",
    "Manager",
    "Student or Learning",
    "Instructor or Teacher",
    "Intern",
    "Other"
];


