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

PermissionSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});


// roles user(accoding to admin), admin(all permissions), sales(contact, quick_quote)
const UserRolesSchema = new mongoose.Schema(
    {
        user_type: {
            type: String,
            required: true,
            trim: true,
            enum: ['admin', 'sales'],
        },
        description: { type: String, trim: true },
        permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permissions' }],
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },
    },
    { collection: 'user_roles' }
);

UserRolesSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
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

UserSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
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

BlogSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
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

GallerySchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

const FeedbackSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, lowercase: true },
        subject: { type: String, required: true, trim: true },
        feedbackMessage: { type: String, required: true, trim: true },
        clientRating: { type: Number, required: true, min: 1, max: 5 },
        donation: { type: Number, default: 0, min: 0 },
    },
    { timestamps: true }
)


export const Gallery =
    mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
export const Permissions =
    mongoose.models.Permissions || mongoose.model('Permissions', PermissionSchema);
export const UserRoles =
    mongoose.models.UserRoles || mongoose.model('UserRoles', UserRolesSchema);
export const Users = mongoose.models.Users || mongoose.model('Users', UserSchema);
export const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
export const Feedbacks =
    mongoose.models.Feedbacks || mongoose.model('Feedbacks', FeedbackSchema);