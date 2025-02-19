// "use client"
// import React, { useState } from 'react';
// import dynamic from 'next/dynamic';
// import 'react-quill/dist/quill.snow.css'; // Import Quill styles
// import "./QuillEditorComponent.scss";


// const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });


// export default function Home() {
//   const [content, setContent] = useState('');


//   const quillModules = {
//     toolbar: [
//       [{ header: [1, 2, 3, false] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [{ list: 'ordered' }, { list: 'bullet' }],
//       ['link', 'image'],
//       [{ align: [] }],
//       [{ color: [] }],
//       ['code-block'],
//       ['clean'],
//     ],
//   };


//   const quillFormats = [
//     'header',
//     'bold',
//     'italic',
//     'underline',
//     'strike',
//     'blockquote',
//     'list',
//     'bullet',
//     'link',
//     'image',
//     'align',
//     'color',
//     'code-block',
//   ];


//   const handleEditorChange = (newContent) => {
//     setContent(newContent);
//   };


//   return (
//     <main>
//       <div className="h-screen w-screen flex items-center flex-col">
//         <div className="h-[100%] w-[70vw]">
//           <QuillEditor
//             value={content}
//             onChange={handleEditorChange}
//             modules={quillModules}
//             formats={quillFormats}
//             className="w-full h-[90%] bg-white p-100"
//           />
//         </div>
//       </div>
//     </main>
//   );
// }