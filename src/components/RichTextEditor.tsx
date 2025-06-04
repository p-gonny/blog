import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface RichTextEditorProps {
  initialValue?: string;
  onEditorChange?: (content: string, editor: any) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialValue = '<p>새로운 글을 작성해주세요.</p>',
  onEditorChange,
}) => {
  const editorRef = useRef<any>(null);

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={initialValue}
      onEditorChange={onEditorChange}
      init={{
        height: 500,
        menubar: false,
        // readonly: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | '
          + 'bold italic forecolor | alignleft aligncenter '
          + 'alignright alignjustify | bullist numlist outdent indent | '
          + 'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
    />
  );
};

export default RichTextEditor; 