const API_URL = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
const api = (path) => `${API_URL}${path.startsWith("/") ? "" : "/"}${path.replace(/^\/+/, "")}`;

// Authentication
export const SIGNUP = api("/auth/signup");
export const VERIFY_OTP = api("/auth/verify-otp");
export const RESEND_OTP = api("/auth/resend-otp");
export const LOGIN = api("/auth/signin");
export const AUTH_ME = api("/auth/me");
export const REFRESH_TOKEN = api("/auth/refresh");
export const FORGET_PASSWORD = api("/auth/forget-password");
export const RESET_PASSWORD = api("/auth/reset-password");
export const LOGOUT = api("/auth/logout");

// Enquiries
export const CREATE_CONTACT = api("/contact/createcontact");
export const GET_ALL_CONTACTS = api("/contact/getallcontact");
export const CREATE_QUOTE_CONTACTS = api("/quick-quotes/createquickquote");
export const GET_ALL_QUOTES = api("/quick-quotes/getallquickquote");

// Bookings
export const BOOKING_PACKAGES = api("/bookings/packages");
export const BOOKING_AVAILABILITY = api("/bookings/availability");
export const CREATE_BOOKING = api("/bookings/create");
export const CREATE_BOOKING_ORDER = api("/bookings/create-order");
export const VERIFY_BOOKING_PAYMENT = api("/bookings/verify-payment");
export const MY_BOOKINGS = api("/bookings/my");
export const MY_BOOKING = (bookingId) => api(`/bookings/my/${encodeURIComponent(bookingId)}`);

// Admin bookings and users
export const ADMIN_AVAILABILITY = api("/admin/availability");
export const ADMIN_BOOKINGS = api("/admin/bookings");
export const ADMIN_BOOKING = (bookingId) => api(`/admin/bookings/${encodeURIComponent(bookingId)}`);
export const ADMIN_BOOKING_CANCEL = (bookingId) => api(`/admin/bookings/${encodeURIComponent(bookingId)}/cancel`);
export const ADMIN_BOOKING_RESCHEDULE = (bookingId) => api(`/admin/bookings/${encodeURIComponent(bookingId)}/reschedule`);
export const ADMIN_BOOKING_STATUS = (bookingId) => api(`/admin/bookings/${encodeURIComponent(bookingId)}/status`);
export const ADMIN_USERS = api("/admin/users");
export const ADMIN_USER = (userId) => api(`/admin/users/${encodeURIComponent(userId)}`);

// Content
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

// Roles and permissions
export const CREATE_ROLE = api("/roles/createrole");
export const GET_ALL_ROLES = api("/roles/getallrole");
export const UPDATE_ROLE = api("/roles/updaterole");
export const DELETE_ROLE = api("/roles/deleterole");
export const CREATE_PERMISSION = api("/permissions/createpermission");
export const GET_ALL_PERMISSIONS = api("/permissions/getallpermission");
export const UPDATE_PERMISSION = api("/permissions/updatepermission");
export const DELETE_PERMISSION = api("/permissions/deletepermission");
export const ASSIGN_PERMISSIONS = api("/permissions/assignpermission");
