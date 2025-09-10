import React, { useState } from 'react';
import axios from 'axios';

const LogoGenerator = () => {
  const [logoUrl, setLogoUrl] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');

  const apiKey = import.meta.env.VITE_DEEP_AI_API_KEY;

  const handleGenerateLogo = async () => {
    try {
      const formData = new FormData();
      formData.append('text', `${companyName} ${industry} logo`);

      const response = await axios.post(
        'https://api.deepai.org/api/text2img', // alebo logo-generator endpoint
        formData,
        {
          headers: {
            'Api-Key': apiKey,
          },
        }
      );

      setLogoUrl(response.data.output_url);
    } catch (error) {
      console.error('Chyba pri generovaní loga:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Názov spoločnosti"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Zameranie"
        value={industry}
        onChange={(e) => setIndustry(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={handleGenerateLogo}
        className="bg-indigo-500 text-white p-2 rounded hover:bg-indigo-600 transition"
      >
        Generovať logo
      </button>
      {logoUrl && <img src={logoUrl} alt="Vygenerované logo" className="mt-4 max-w-xs" />}
    </div>
  );
};

export default LogoGenerator;
