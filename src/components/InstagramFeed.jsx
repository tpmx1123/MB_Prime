import React from 'react';
import { Instagram, ExternalLink } from 'lucide-react';

const InstagramFeed = () => {
  return (
    <div className="w-full max-w-[420px]">
      <p className="text-secondary font-bold uppercase tracking-[0.18em] text-xs mb-3">
        Follow MB Prime on Instagram
      </p>

      <div className="overflow-hidden rounded-2xl bg-white shadow-lg border border-slate-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <img
              src="https://res.cloudinary.com/durbtkhbz/image/upload/v1770532608/Screenshot_2026-02-08_120623_ybe93p.png"
              alt="MB Prime Villas & Plots"
              className="w-12 h-12 rounded-full object-cover"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-black">
                MB Prime Villas & Plots
              </h3>
              <p className="text-sm text-slate-500">
                @mbprimevillasplots

              </p>
            </div>

            <Instagram className="text-pink-600" size={20} />
          </div>

          <a
            href="https://www.instagram.com/mbprimevillasplots/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] px-4 py-2.5 text-white font-semibold"
          >
            Follow on Instagram
            <ExternalLink size={14} />
          </a>
        </div>

       
      </div>
    </div>
  );
};

export default InstagramFeed;