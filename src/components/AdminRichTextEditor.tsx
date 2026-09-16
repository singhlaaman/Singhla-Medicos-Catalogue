import React, { useState } from 'react';

interface AdminRichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
}

export default function AdminRichTextEditor({
  value,
  onChange,
  label = 'Long Description (Rich Text HTML)',
  placeholder = 'Type detailed specifications...'
}: AdminRichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false);

  const insertTag = (startTag: string, endTag: string = '') => {
    const textarea = document.getElementById('long-desc-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);
    const replacement = startTag + selectedText + endTag;
    const newValue = text.substring(0, start) + replacement + text.substring(end);

    onChange(newValue);

    // Focus back and select
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + startTag.length, start + startTag.length + selectedText.length);
    }, 50);
  };

  const toolbarButtons = [
    { label: 'Bold', icon: 'B', onClick: () => insertTag('<b>', '</b>') },
    { label: 'Italic', icon: 'I', onClick: () => insertTag('<i>', '</i>') },
    { label: 'Heading 3', icon: 'H3', onClick: () => insertTag('<h3 class="text-sm font-bold text-gray-900 mt-3 mb-1">', '</h3>') },
    { label: 'Heading 4', icon: 'H4', onClick: () => insertTag('<h4 class="text-xs font-bold text-gray-800 mt-2 mb-1">', '</h4>') },
    { label: 'Bullet List', icon: '• List', onClick: () => insertTag('<ul class="list-disc list-inside space-y-0.5 my-2">\n  <li>', '</li>\n  <li>Item 2</li>\n</ul>') },
    { label: 'Hyperlink', icon: 'Link', onClick: () => insertTag('<a href="https://" target="_blank" class="text-blue-600 hover:underline">', '</a>') },
    {
      label: 'Table',
      icon: 'Table',
      onClick: () => insertTag(
        '<table class="w-full border-collapse border border-gray-200 my-2 text-xs text-left">\n' +
        '  <thead>\n' +
        '    <tr class="bg-gray-100">\n' +
        '      <th class="border border-gray-200 p-1.5">Feature</th>\n' +
        '      <th class="border border-gray-200 p-1.5">Details</th>\n' +
        '    </tr>\n' +
        '  </thead>\n' +
        '  <tbody>\n' +
        '    <tr>\n' +
        '      <td class="border border-gray-200 p-1.5">Strength</td>\n' +
        '      <td class="border border-gray-200 p-1.5">250 mg</td>\n' +
        '    </tr>\n' +
        '  </tbody>\n' +
        '</table>'
      )
    },
    { label: 'Clear tags', icon: 'Clear', onClick: () => {
      if (confirm('Are you sure you want to strip all HTML tags from the selection?')) {
        const textarea = document.getElementById('long-desc-textarea') as HTMLTextAreaElement;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const selectedText = text.substring(start, end);
        const stripped = selectedText.replace(/<\/?[^>]+(>|$)/g, '');
        onChange(text.substring(0, start) + stripped + text.substring(end));
      }
    }}
  ];

  return (
    <div className="space-y-1.5 flex flex-col h-full min-h-[320px]" id="rich-text-editor-container">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wide">
          {label}
        </label>
        <div className="flex gap-1 bg-gray-100 p-0.5 rounded-lg text-[10px] font-bold">
          <button
            type="button"
            onClick={() => setIsPreview(false)}
            className={`px-2 py-1 rounded-md transition-all ${!isPreview ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Editor
          </button>
          <button
            type="button"
            onClick={() => setIsPreview(true)}
            className={`px-2 py-1 rounded-md transition-all ${isPreview ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Live Preview
          </button>
        </div>
      </div>

      {!isPreview ? (
        <div className="flex-1 flex flex-col border border-gray-200 rounded-xl overflow-hidden bg-white">
          {/* Formatting Toolbar */}
          <div className="flex flex-wrap gap-1 p-1.5 bg-gray-50 border-b border-gray-200">
            {toolbarButtons.map((btn, idx) => (
              <button
                key={idx}
                type="button"
                onClick={btn.onClick}
                className="px-2 py-1 text-[10px] font-bold text-gray-700 bg-white hover:bg-yellow-50 hover:text-black border border-gray-200 rounded-md transition-all cursor-pointer shadow-2xs"
                title={btn.label}
              >
                {btn.icon}
              </button>
            ))}
          </div>

          {/* Text Area */}
          <textarea
            id="long-desc-textarea"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 w-full p-3 text-xs bg-white focus:outline-none font-mono leading-relaxed resize-none"
          />
        </div>
      ) : (
        <div className="flex-1 border border-gray-200 rounded-xl p-3.5 bg-gray-50 overflow-y-auto max-h-[280px]">
          {value ? (
            <div 
              className="prose prose-sm text-xs text-gray-800 leading-relaxed max-w-none font-sans"
              dangerouslySetInnerHTML={{ __html: value }}
            />
          ) : (
            <p className="text-gray-400 text-xs italic">Nothing to preview. Go to Editor and add formatted content.</p>
          )}
        </div>
      )}
    </div>
  );
}
