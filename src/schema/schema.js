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
    message: { type: String, default: "", trim: true },
    selectedOption: { type: String, default: "", trim: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { collection: 'quick_contact' }
);

QuickContactSchema.pre('save', function () {
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
