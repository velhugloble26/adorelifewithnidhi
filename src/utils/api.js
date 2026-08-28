const API_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
const api = (path) => `${API_URL}/api${path}`;

export const SIGNUP = api("/auth/signup");
export const VERIFY_OTP = api("/auth/verify-otp");
export const RESEND_OTP = api("/auth/resend-otp");
export const LOGIN = api("/auth/signin");
export const VERIFY_LOGIN_OTP = VERIFY_OTP;
export const RESEND_LOGIN_OTP = RESEND_OTP;
export const REFRESH_TOKEN = api("/auth/refresh");
export const FORGET_PASSWORD = api("/auth/forget-password");
export const RESET_PASSWORD = api("/auth/reset-password");
export const LOGOUT = api("/auth/logout");

export const CREATE_CONTACT = api("/contact/createcontact");
export const GET_ALL_CONTACTS = api("/contact/getallcontact");
export const CREATE_QUOTE_CONTACTS = api("/quick-quotes/createquickquote");
export const GET_ALL_QUOTES = api("/quick-quotes/getallquickquote");

export const CREATE_BLOGS = api("/blog/createblog");
export const GET_ALL_BLOGS = api("/blog/getallblog");
export const GET_BLOG_BY_ID = api("/blog/getblogbyid");
export const UPDATE_BLOG_BY_ID = api("/blog/updateblog");
export const DELETE_BLOG_BY_ID = api("/blog/deleteblog");

export const CREATE_GALLERY = api("/gallery/creategallery");
export const GET_ALL_GALLERY = api("/gallery/getallgallery");
export const GET_GALLERY_BY_ID = api("/gallery/getgallerybyid");
export const UPDATE_GALLERY_BY_ID = api("/gallery/updategallery");
export const DELETE_GALLERY_BY_ID = api("/gallery/deletegallery");
export const UPLOAD_IMAGE = api("/uploads/image");

export const CREATE_ROLE = api("/roles/createrole");
export const GET_ALL_ROLES = api("/roles/getallrole");
export const UPDATE_ROLE = api("/roles/updaterole");
export const DELETE_ROLE = api("/roles/deleterole");
export const CREATE_PERMISSION = api("/permissions/createpermission");
export const GET_ALL_PERMISSIONS = api("/permissions/getallpermission");
export const UPDATE_PERMISSION = api("/permissions/updatepermission");
export const DELETE_PERMISSION = api("/permissions/deletepermission");
export const ASSIGN_PERMISSIONS = api("/permissions/assignpermission");
