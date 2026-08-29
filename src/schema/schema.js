import mongoose from 'mongoose';

const PermissionSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true },
    module: { type: String, trim: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { collection: 'permissions' }
);

PermissionSchema.pre('save', function () {
  this.updated_at = Date.now();
});


// roles user(accoding to admin), admin(all permissions), sales(contact, quick_quote)
const UserRolesSchema = new mongoose.Schema(
  {
    user_type: {
      type: String,
      required: true,
      trim: true,
      enum: ['user', 'admin', 'sales'],
    },
    description: { type: String, trim: true },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permissions' }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { collection: 'user_roles' }
);

UserRolesSchema.pre('save', function () {
  this.updated_at = Date.now();
});
const LoginOtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    otp_hash: {
      type: String,
      required: true,
    },

    attempts: {
      type: Number,
      default: 0,
    },

    expires_at: {
      type: Date,
      required: true,
      index: true,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    created_at: {
      type: Date,
      default: Date.now,
    },

    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "login_otps",
  }
);

// Automatically delete expired OTP documents.
LoginOtpSchema.index(
  { expires_at: 1 },
  { expireAfterSeconds: 0 }
);

LoginOtpSchema.pre("save", function () {
  this.updated_at = Date.now();
});



const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRoles',
      required: true,
    },
    refreshTokens: [{ type: String }],
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    emailVerificationToken: { type: String },
    emailVerificationExpires: { type: Date },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { collection: 'users' }
);

UserSchema.pre('save', function () {
  this.updated_at = Date.now();
});

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true }, //  folder inside the project 
    content: { type: String, required: true, trim: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { collection: 'blog' }
);

BlogSchema.pre('save', function () {
  this.updated_at = Date.now();
});

const GallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true }, //  folder inside the project
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { collection: 'gallery' }
);

GallerySchema.pre('save', function () {
  this.updated_at = Date.now();
});


const ContentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: "", trim: true },
    selectedOption: { type: String, default: "", trim: true },
    message: { type: String, default: "", trim: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { collection: 'content' }
);

ContentSchema.pre('save', function () {
  this.updated_at = Date.now();
});

const QuickContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: "", trim: true },
    selectedOption: { type: String, default: "", trim: true },
    preferredSession: { type: String, default: "", trim: true },
    preferredFormat: { type: String, default: "", trim: true },
    message: { type: String, default: "", trim: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { collection: 'quick_contact' }
);

QuickContactSchema.pre('save', function () {
  this.updated_at = Date.now();
});

const ClientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    message: { type: String, default: "", trim: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { collection: 'client' }
);

ClientSchema.pre('save', function () {
  this.updated_at = Date.now();
})

const BookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', default: null, index: true },
    userEmail: { type: String, default: null, trim: true, lowercase: true },
    packageId: { type: String, required: true, trim: true },
    packageName: { type: String, required: true, trim: true },
    packagePrice: { type: Number, required: true, min: 0 },
    selectedDate: { type: String, required: true, trim: true },
    selectedTime: { type: String, required: true, trim: true },
    sessionType: {
      type: String,
      required: true,
      trim: true,
      enum: ['Online', 'Offline'],
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    whatsappNumber: { type: String, required: true, trim: true },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
      enum: ['cash', 'online'],
    },
    paymentStatus: {
      type: String,
      default: 'pending',
      trim: true,
      enum: ['pending', 'paid', 'failed', 'cancelled'],
    },
    bookingStatus: {
      type: String,
      default: 'pending',
      trim: true,
      enum: ['pending', 'confirmed', 'completed', 'cancelled', 'no_show'],
    },
    razorpayOrderId: { type: String, default: null, trim: true },
    razorpayPaymentId: { type: String, default: null, trim: true },
    razorpaySignature: { type: String, default: null, trim: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { collection: 'bookings' }
);

BookingSchema.index({ selectedDate: 1, selectedTime: 1, sessionType: 1 }, { unique: true });

BookingSchema.pre('save', function () {
  this.updated_at = Date.now();
});

const SiteVisitorSchema = new mongoose.Schema(
  {
    visitorId: { type: String, required: true, unique: true, index: true, maxlength: 255 },
    ipAddress: { type: String, default: null, index: true, maxlength: 255 },
    userAgent: { type: String, default: null },
    browser: { type: String, default: null, maxlength: 100 },
    os: { type: String, default: null, maxlength: 100 },
    device: { type: String, default: null, maxlength: 100 },
    referrer: { type: String, default: null },
    landingPage: { type: String, default: null },
    firstSeenAt: { type: Date, default: Date.now },
    lastSeenAt: { type: Date, default: Date.now }
  },
  { collection: "site_visitors", timestamps: false }
);

SiteVisitorSchema.pre('save', function () {
  this.updated_at = Date.now();
});

const SiteSessionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true, index: true, maxlength: 255 },
    visitorId: { type: mongoose.Schema.Types.ObjectId, ref: "SiteVisitor", required: true, index: true },
    ipAddress: { type: String, default: null, maxlength: 255 },
    userAgent: { type: String, default: null },
    browser: { type: String, default: null, maxlength: 100 },
    os: { type: String, default: null, maxlength: 100 },
    device: { type: String, default: null, maxlength: 100 },
    referrer: { type: String, default: null },
    landingPage: { type: String, default: null },
    exitPage: { type: String, default: null },
    pageViews: { type: Number, default: 0, min: 0 },
    duration: { type: Number, default: 0, min: 0 },
    startedAt: { type: Date, default: Date.now, index: true },
    lastActivityAt: { type: Date, default: Date.now },
    endedAt: { type: Date, default: null },
    isActive: { type: Boolean, default: true, index: true }
  },
  { collection: "site_sessions", timestamps: false }
);

SiteSessionSchema.pre('save', function () {
  this.updated_at = Date.now();
});

const PageVisitSchema = new mongoose.Schema(
  {
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: "SiteSession", required: true, index: true },
    visitorId: { type: mongoose.Schema.Types.ObjectId, ref: "SiteVisitor", required: true, index: true },
    page: { type: String, default: null },
    title: { type: String, default: null, maxlength: 255 },
    timeSpent: { type: Number, default: 0, min: 0 },
    enteredAt: { type: Date, default: Date.now, index: true },
    exitedAt: { type: Date, default: null }
  },
  { collection: "page_visits", timestamps: false }
);

PageVisitSchema.pre('save', function () {
  this.updated_at = Date.now();
});

export const Contents = mongoose.models.Contents || mongoose.model('Contents', ContentSchema);
export const QuickContacts = mongoose.models.QuickContacts || mongoose.model('QuickContacts', QuickContactSchema);
export const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
export const Permissions = mongoose.models.Permissions || mongoose.model('Permissions', PermissionSchema);
export const UserRoles = mongoose.models.UserRoles || mongoose.model('UserRoles', UserRolesSchema);
export const Users = mongoose.models.Users || mongoose.model('Users', UserSchema);
export const LoginOtp = mongoose.models.LoginOtp || mongoose.model('LoginOtp', LoginOtpSchema);
export const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
export const Client = mongoose.models.Client || mongoose.model('Client', ClientSchema);
export const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
export const SiteVisitor = mongoose.models.SiteVisitor || mongoose.model('SiteVisitor', SiteVisitorSchema);
export const SiteSession = mongoose.models.SiteSession || mongoose.model('SiteSession', SiteSessionSchema);
export const PageVisit = mongoose.models.PageVisit || mongoose.model('PageVisit', PageVisitSchema);
