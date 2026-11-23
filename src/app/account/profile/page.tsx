'use client';

import React, { useState } from 'react';
import AccountLayout from '@/components/account/AccountLayout';
import { useStore } from '@/context/StoreContext';
import { Save, Lock, User, Mail, Phone, FileText } from 'lucide-react';
import ImageUploadInput from '@/components/ui/ImageUploadInput';

export default function ProfilePage() {
  const { user, updateUserProfile, showToast } = useStore();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    avatar: user?.avatar || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(formData);
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('Passwords do not match!', 'error');
      return;
    }
    showToast('Password updated securely!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <AccountLayout title="Personal Information" subtitle="Manage your name, contact email, and security settings">
      <div className="space-y-8">
        {/* Profile Details Form */}
        <form onSubmit={handleProfileSave} className="space-y-5">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <User className="w-4 h-4 text-gray-400" /> Basic Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
              <input 
                type="tel" 
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black"
              />
            </div>
            <div>
              <ImageUploadInput
                label="Profile Avatar Photo"
                aspectHint="Square recommended"
                value={formData.avatar}
                onChange={url => setFormData({ ...formData, avatar: url })}
                helperText="Upload a profile picture from your device or paste an image URL."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">About Me / Bio</label>
            <textarea 
              rows={3}
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              className="w-full border border-gray-200 rounded-xl p-3 text-xs outline-none focus:border-black resize-none"
            />
          </div>

          <button 
            type="submit" 
            className="bg-black text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <Save className="w-3.5 h-3.5" /> Save Changes
          </button>
        </form>

        {/* Change Password Form */}
        <form onSubmit={handlePasswordSave} className="border-t border-gray-100 pt-8 space-y-4">
          <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-gray-400" /> Security & Password
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Current Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={passwordData.currentPassword}
                onChange={e => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">New Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={passwordData.newPassword}
                onChange={e => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Confirm New Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                value={passwordData.confirmPassword}
                onChange={e => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-black"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="bg-gray-100 text-gray-800 hover:bg-black hover:text-white px-6 py-2.5 rounded-full text-xs font-bold transition-colors"
          >
            Update Password
          </button>
        </form>
      </div>
    </AccountLayout>
  );
}
