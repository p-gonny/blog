import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface RichTextEditorProps {
  initialValue?: string;
  onEditorChange?: (content: string, editor: import('tinymce').Editor) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialValue = '<p>새로운 글을 작성해주세요.</p>',
  onEditorChange,
}) => {
  const editorRef = useRef<import('tinymce').Editor | null>(null);

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
          + 'removeformat | image | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        image_advtab: true,
        image_dimensions: true,
        resize_img_proportional: false,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        images_upload_handler: (_blobInfo, _progress) => new Promise((resolve, _reject) => {
          // 여기에 실제 이미지 업로드 로직을 구현합니다.
          // 이 예시에서는 가짜 URL을 사용합니다.
          // 실제 환경에서는 blobInfo.blob()을 사용하여 파일을 서버로 보내고,
          // 서버에서 반환된 이미지 URL을 resolve에 전달해야 합니다.

          // 예시: 파일 업로드 API 호출
          // const formData = new FormData();
          // formData.append('file', blobInfo.blob(), blobInfo.filename());

          // fetch('/your-image-upload-endpoint', {
          //   method: 'POST',
          //   body: formData,
          //   // 기타 필요한 헤더 (예: 인증 토큰)
          // })
          // .then(response => {
          //   if (!response.ok) {
          //     throw new Error('HTTP Error: ' + response.status);
          //   }
          //   return response.json();
          // })
          // .then(data => {
          //   // 서버에서 반환된 이미지 URL을 사용합니다.
          //   resolve(data.location);
          // })
          // .catch(error => {
          //   reject('Image upload failed: ' + error.message);
          // });

          // 임시 테스트를 위한 더미 이미지 URL
          const dummyImageUrl = 'https://picsum.photos/200/300';
          resolve(dummyImageUrl);
        }),
      }}
    />
  );
};

export default RichTextEditor; 