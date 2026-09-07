'use client';

import { useState } from 'react';
import { Trash2, Edit2, Plus, Bone, Image as ImageIcon, Video, Users, LogOut, Upload } from 'lucide-react';
import { useKennel, Staff } from '../context/KennelContext';
import Link from 'next/link';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { dogs, addDog, deleteDog, memories, addMemory, deleteMemory, staffList, addStaff, updateStaff, deleteStaff } = useKennel();

  // Dog states
  const [dogName, setDogName] = useState('');
  const [breed, setBreed] = useState('');
  const [category, setCategory] = useState<'For Sale' | 'Adoption'>('For Sale');
  const [price, setPrice] = useState('');
  const [dogImageUrl, setDogImageUrl] = useState('');

  // Memory states
  const [mediaFileUrl, setMediaFileUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [caption, setCaption] = useState('');

  // Staff states
  const [staffName, setStaffName] = useState('');
  const [staffPosition, setStaffPosition] = useState('');
  const [staffImageUrl, setStaffImageUrl] = useState('');
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);

  const dogFunFact = "Did you know? A dog's sense of smell is legendary—it is estimated to be 10,000 to 100,000 times more acute than that of a human!";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'pawsomebone123') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect password! Hint: Think of a delicious treat for a puppy...');
    }
  };

  const handleDogFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setDogImageUrl(URL.createObjectURL(file));
  };

  const handleMemoryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFileUrl(URL.createObjectURL(file));
      setMediaType(file.type.startsWith('video') ? 'video' : 'image');
    }
  };

  const handleStaffFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setStaffImageUrl(URL.createObjectURL(file));
  };

  const handleAddDogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDog({
      name: dogName,
      breed,
      category,
      price: category === 'For Sale' ? price : '0',
      imageUrl: dogImageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1',
    });
    setDogName('');
    setBreed('');
    setPrice('');
    setDogImageUrl('');
  };

  const handleAddMemorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMemory({
      mediaUrl: mediaFileUrl || 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e',
      mediaType,
      caption,
    });
    setMediaFileUrl('');
    setCaption('');
  };

  const handleSaveStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalImageUrl = staffImageUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb';
    if (editingStaffId) {
      updateStaff(editingStaffId, { name: staffName, position: staffPosition, imageUrl: finalImageUrl });
      setEditingStaffId(null);
    } else {
      addStaff({
        name: staffName,
        position: staffPosition,
        imageUrl: finalImageUrl,
      });
    }
    setStaffName('');
    setStaffPosition('');
    setStaffImageUrl('');
  };

  const handleEditStaffClick = (staff: Staff) => {
    setEditingStaffId(staff.id);
    setStaffName(staff.name);
    setStaffPosition(staff.position);
    setStaffImageUrl(staff.imageUrl);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-amber-200">
          <div className="flex justify-center mb-4 text-amber-600">
            <Bone className="w-12 h-12 animate-bounce" />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Sterchez Kennels Secure Portal</h1>
          <p className="text-xs text-center text-gray-500 mb-6 bg-amber-50 p-3 rounded-lg border border-amber-100 italic">
            🐾 <strong>Admin Fun Fact:</strong> {dogFunFact}
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Admin Passcode</label>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter dog-themed password..."
                className="w-full p-3 border border-gray-300 rounded-lg text-black focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>
            {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
            <button
              type="submit"
              className="w-full bg-amber-600 text-white p-3 rounded-lg font-medium hover:bg-amber-700 transition shadow-md"
            >
              Unlock Dashboard
            </button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-6">Hint: try `pawsomebone123`</p>
        </div>
        <div className="mt-6">
          <Link href="/" className="text-amber-700 font-semibold hover:underline text-sm">
            ← Back to Public Website Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Sterchez Kennels Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Manage dogs, device gallery uploads, and team members easily.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition text-sm">
              Visit Website
            </Link>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition text-sm"
            >
              <LogOut className="w-4 h-4" /> Lock Portal
            </button>
          </div>
        </div>

        {/* Section 1: Dogs */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-amber-600" /> Add Dog (For Sale / Adoption)
            </h2>
            <form onSubmit={handleAddDogSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Dog Name / ID</label>
                <input
                  type="text"
                  required
                  value={dogName}
                  onChange={(e) => setDogName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                  placeholder="e.g. Bruno"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                >
                  <option value="For Sale">For Sale</option>
                  <option value="Adoption">Adoption</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Breed</label>
                <input
                  type="text"
                  required
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                  placeholder="e.g. Rottweiler"
                />
              </div>
              {category === 'For Sale' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md text-black"
                    placeholder="e.g. 1500"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Dog Picture from Gallery</label>
                <div className="mt-1 flex items-center gap-3">
                  <label className="cursor-pointer flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-lg border border-amber-200 hover:bg-amber-100 transition text-sm font-medium">
                    <Upload className="w-4 h-4" /> Choose File
                    <input type="file" accept="image/*" onChange={handleDogFileChange} className="hidden" />
                  </label>
                  {dogImageUrl && <span className="text-xs text-green-600 font-semibold">✓ Image Selected</span>}
                </div>
              </div>
              <button type="submit" className="w-full bg-amber-600 text-white p-2 rounded-md font-medium hover:bg-amber-700 transition">
                Publish Dog Entry
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm overflow-y-auto max-h-[500px]">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Current Kennel Catalog ({dogs.length})</h2>
            {dogs.length === 0 ? (
              <p className="text-gray-400 text-sm italic">No dogs added yet.</p>
            ) : (
              <div className="space-y-3">
                {dogs.map(dog => (
                  <div key={dog.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-3">
                      <img src={dog.imageUrl} alt={dog.name} className="w-12 h-12 object-cover rounded-lg" />
                      <div>
                        <h4 className="font-bold text-gray-800">{dog.name} ({dog.breed})</h4>
                        <p className="text-xs text-gray-500">{dog.category} {dog.category === 'For Sale' ? `- $${dog.price}` : ''}</p>
                      </div>
                    </div>
                    <button onClick={() => deleteDog(dog.id)} className="text-red-500 hover:text-red-700 p-2">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Memories */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-amber-600" /> Share Photo or Video from Gallery
            </h2>
            <form onSubmit={handleAddMemorySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Media File (Photo or Video)</label>
                <div className="mt-1 flex items-center gap-3">
                  <label className="cursor-pointer flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-lg border border-amber-200 hover:bg-amber-100 transition text-sm font-medium">
                    <Upload className="w-4 h-4" /> Open Gallery / Files
                    <input type="file" accept="image/*,video/*" onChange={handleMemoryFileChange} className="hidden" />
                  </label>
                  {mediaFileUrl && <span className="text-xs text-green-600 font-semibold uppercase">✓ {mediaType} Loaded</span>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Caption / Description</label>
                <input
                  type="text"
                  required
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                  placeholder="e.g. Happy puppy playing in the yard!"
                />
              </div>
              <button type="submit" className="w-full bg-amber-600 text-white p-2 rounded-md font-medium hover:bg-amber-700 transition">
                Upload Memory
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm overflow-y-auto max-h-[500px]">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Memories Wall Gallery ({memories.length})</h2>
            {memories.length === 0 ? (
              <p className="text-gray-400 text-sm italic">No shared photos or videos yet.</p>
            ) : (
              <div className="space-y-3">
                {memories.map(mem => (
                  <div key={mem.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-3">
                      {mem.mediaType === 'image' ? (
                        <img src={mem.mediaUrl} alt="Memory" className="w-12 h-12 object-cover rounded-lg" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-800 text-white flex items-center justify-center rounded-lg">
                          <Video className="w-6 h-6" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-gray-800">{mem.caption}</p>
                        <span className="text-xs uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">{mem.mediaType}</span>
                      </div>
                    </div>
                    <button onClick={() => deleteMemory(mem.id)} className="text-red-500 hover:text-red-700 p-2">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Staff Management with Image Upload */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-600" /> {editingStaffId ? 'Edit Staff Member' : 'Add Staff Member'}
            </h2>
            <form onSubmit={handleSaveStaffSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Staff Full Name</label>
                <input
                  type="text"
                  required
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                  placeholder="e.g. John Kamau"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Position / Title</label>
                <input
                  type="text"
                  required
                  value={staffPosition}
                  onChange={(e) => setStaffPosition(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-black"
                  placeholder="e.g. Senior Kennel Trainer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Staff Profile Picture</label>
                <div className="mt-1 flex items-center gap-3">
                  <label className="cursor-pointer flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-lg border border-amber-200 hover:bg-amber-100 transition text-sm font-medium">
                    <Upload className="w-4 h-4" /> Open Gallery
                    <input type="file" accept="image/*" onChange={handleStaffFileChange} className="hidden" />
                  </label>
                  {staffImageUrl && <span className="text-xs text-green-600 font-semibold">✓ Photo Loaded</span>}
                </div>
              </div>
              <button type="submit" className="w-full bg-amber-600 text-white p-2 rounded-md font-medium hover:bg-amber-700 transition">
                {editingStaffId ? 'Update Staff Info' : 'Save Staff Member'}
              </button>
            </form>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm overflow-y-auto max-h-[500px]">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Kennel Team Directory ({staffList.length})</h2>
            {staffList.length === 0 ? (
              <p className="text-gray-400 text-sm italic">No staff members listed yet.</p>
            ) : (
              <div className="space-y-3">
                {staffList.map(staff => (
                  <div key={staff.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-3">
                      <img src={staff.imageUrl} alt={staff.name} className="w-12 h-12 object-cover rounded-full border-2 border-amber-600" />
                      <div>
                        <h4 className="font-bold text-gray-800">{staff.name}</h4>
                        <p className="text-xs text-amber-700 font-semibold">{staff.position}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEditStaffClick(staff)} className="text-blue-500 hover:text-blue-700 p-2">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => deleteStaff(staff.id)} className="text-red-500 hover:text-red-700 p-2">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
