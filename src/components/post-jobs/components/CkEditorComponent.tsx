// components/custom-editor.js
"use client"; // only in App Router

import React from "react";
import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react";

// const CustomEditor = ({ data, onChange }) => {
//     const cloud = useCKEditorCloud( {
//         version: '44.1.0',
//         premium: true
//     } );

//     if ( cloud.status === 'error' ) {
//         return <div>Error!</div>;
//     }

//     if ( cloud.status === 'loading' ) {
//         return <div>Loading...</div>;
//     }

//     const {
//         ClassicEditor,
//         Essentials,
//         Paragraph,
//         Bold,
//         Italic
//     } = cloud.CKEditor;

//     const { FormatPainter } = cloud.CKEditorPremiumFeatures;

//     return (
//         <CKEditor
//         editor={ClassicEditor}
//         data={data || ""}
//         onChange={(event, editor) => onChange(editor.getData())}
//         config={{
//             licenseKey: "process.env.NEXT_PUBLIC_CKEDITOR_API_KEY",
//             plugins: [Essentials, Paragraph, Bold, Italic, FormatPainter],
//             toolbar: ["undo", "redo", "|", "bold", "italic", "|", "formatPainter"],
//         }}
//     />
//     );
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomEditor = ({ data, onChange }: any) => {
  const cloud = useCKEditorCloud({
    version: "44.1.0",
    premium: true,
  });

  if (cloud.status === "error") {
    console.error("CKEditor Cloud error");
    return <div>Error loading editor!</div>;
  }

  if (cloud.status === "loading") {
    return <div>Loading editor...</div>;
  }

  const {
    ClassicEditor,
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Heading,
    List,
    Link,
    Table,
    BlockQuote,
  } = cloud.CKEditor;
  const { FormatPainter } = cloud.CKEditorPremiumFeatures;

  return (
    <CKEditor
      editor={ClassicEditor}
      data={data || ""}
      onChange={(event, editor) => {
        console.log("Editor data:", editor.getData());
        if (onChange) onChange(editor.getData());
      }}
      config={{
        licenseKey: process.env.NEXT_PUBLIC_CKEDITOR_API_KEY,
        plugins: [ Essentials, 
            Paragraph, 
            Bold, 
            Italic, 
            Heading, 
            List, 
            Link, 
            Table, 
            BlockQuote, 
            FormatPainter],
        toolbar: [ "undo", 
            "redo", 
            "|", 
            "heading", 
            "|", 
            "bold", 
            "italic", 
            "|", 
            "bulletedList", 
            "numberedList", 
            "|", 
            "link", 
            "blockQuote", 
            "|", 
            "insertTable", 
            "formatPainter"], heading: {
                options: [
                  { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
                  { model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
                  { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
                  { model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
                ],
              },
              table: {
                contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
              },
            //   height: "400px", // Set height
            //   width: "800px",  // Set width (optional, default is auto)
      }}
    />
  );
};

export default CustomEditor;
