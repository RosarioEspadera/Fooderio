import { useRef, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function ImageUploader({ onUpload }) {
  const fileRef = useRef();
  const [uploading, setUploading] = useState(false);

  async function handleUpload() {
    const file = fileRef.current.files[0];
    if (!file) return;

    setUploading(true);
    const fileName = `${Date.now()}_${file.name}`;

    const { data, error } = await supabase.storage
      .from('dish-images')
      .upload(fileName, file, { upsert: false });

    if (!error) {
      const { data: urlData } = supabase.storage
        .from('dish-images')
        .getPublicUrl(fileName);
      onUpload(urlData.publicUrl);
    }

    setUploading(false);
  }

  return (
    <div className="image-uploader">
      <input type="file" ref={fileRef} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>
    </div>
  );
}
