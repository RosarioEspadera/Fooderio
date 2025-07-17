// src/components/DishForm.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import ImageUploader from './ImageUploader';

export default function DishForm({ onPublish }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    tags: [],
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage('');

    if (!form.name || !form.imageUrl) {
      setErrorMessage('Name and Image are required.');
      return;
    }

    setSubmitting(true);
    const { data, error } = await supabase
      .from('dishes')
      .insert([
        {
          name: form.name,
          description: form.description,
          price: parseFloat(form.price),
          imageUrl: form.imageUrl,
          tags: form.tags,
        },
      ]);
    setSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
    } else {
      // Clear form fields
      setForm({ name: '', description: '', price: '', imageUrl: '', tags: [] });
      // Trigger parent to re-fetch dishes
      onPublish();
      // Redirect back to catalog
      navigate('/');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4">
      {errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}

      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="w-full border p-2 rounded"
      />

      <textarea
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={e => setForm({ ...form, price: e.target.value })}
        className="w-full border p-2 rounded"
      />

      <ImageUploader onUpload={url => setForm({ ...form, imageUrl: url })} />

      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={form.tags.join(', ')}
        onChange={e =>
          setForm({ ...form, tags: e.target.value.split(',').map(t => t.trim()) })
        }
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
      >
        {isSubmitting ? 'Publishing...' : 'Publish'}
      </button>
    </form>
  );
}
