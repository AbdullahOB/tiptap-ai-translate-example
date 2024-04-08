import Image from "next/image";
import Tiptap from "./components/Tiptap";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Input with borders */}
      <div className="w-96 h-96 border-2 border-gray-300 rounded-lg">
        <Tiptap />
      </div>
    </main>
  );
}
