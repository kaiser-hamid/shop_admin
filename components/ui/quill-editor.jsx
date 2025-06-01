"use client";

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function QuillEditor({ value, onChange, placeholder }) {
    return (
        <ReactQuill
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            theme="snow"
            className="[&_.ql-toolbar]:rounded-t-md [&_.ql-toolbar]:border-0 [&_.ql-container]:rounded-b-md [&_.ql-container]:shadow-sm [&_.ql-container]:border-0 [&_.ql-editor]:min-h-[200px]"
        />
    );
};