import User from '../models/User.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { generateToken } from '../utils/generateToken.js';
import { env } from '../config/env.js';

const cookieOpts = {
  httpOnly: true,
  secure: env.isProd,
  sameSite: env.isProd ? 'strict' : 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log('🔐 Login attempt:', email);

  if (!email || !password) {
    throw new ApiError(400, 'Email and password required');
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select(
    '+password'
  );

  if (!user) {
    console.log('❌ No user found for:', email);
    throw new ApiError(401, 'Invalid credentials');
  }

  console.log('✅ User found:', user.email, '| role:', user.role);
  console.log('🔑 Stored hash starts with:', user.password?.slice(0, 15));

  const ok = await user.comparePassword(password);
  console.log('🔓 Password match result:', ok);

  if (!ok) {
    throw new ApiError(401, 'Invalid credentials');
  }

  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });

  const token = generateToken(user);
  res.cookie('token', token, cookieOpts);

  res.json({
    success: true,
    data: {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    },
  });
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token', { ...cookieOpts, maxAge: 0 });
  res.json({ success: true, message: 'Logged out' });
});

export const me = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: {
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    },
  });
});