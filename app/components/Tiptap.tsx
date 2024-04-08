/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
/* eslint-disable react/no-children-prop */
"use client";
import "./styles.scss";
import axios from "axios";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        // border
        className="border-2 border-gray-300 rounded-lg"
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className="border-2 border-gray-300 rounded-lg"
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className="border-2 border-gray-300 rounded-lg"
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className="border-2 border-gray-300 rounded-lg"
      >
        code
      </button>

      <button
        onClick={async () => {
          const { state } = editor;
          const { from, to } = state.selection;
          const text = state.doc.textBetween(from, to);

          const response = await axios.post("/api/ai-translate", {
            text,
          });

          const translated = response.data.response.choices[0].message.content;

          editor
            .chain()
            .focus()
            .insertContent(translated, {
              updateSelection: true,
            })

            .run();
        }}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className="border-2 border-gray-300 rounded-lg"
      >
        Translate With AI
      </button>
    </>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const content = `
Write something here...
`;

export default () => {
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={content}
      children={undefined}
    ></EditorProvider>
  );
};
