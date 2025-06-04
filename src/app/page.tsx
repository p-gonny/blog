'use client';

import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const RichTextEditor = dynamic(() => import("../components/RichTextEditor"), {
  ssr: false,
});

export default function Home() {
  const [editorContent, setEditorContent] = useState<string>("");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      return newTheme;
    });
  };

  const [categories] = useState<Array<{ name: string; count: number }>>([
    { name: "기술", count: 5 },
    { name: "라이프스타일", count: 3 },
    { name: "여행", count: 2 },
    { name: "요리", count: 1 },
  ])

  const [serviceShortcuts] = useState<Array<{ name: string; icon: string }>>([
    { name: "네이버 게임", icon: "🎮" },
    { name: "e스포츠", icon: "🏆" },
    { name: "오리지널 시리즈", icon: "👑" },
    { name: "PC 게임", icon: "💻" },
    { name: "지지직 라운지", icon: "⚡" },
  ]);

  const handleEditorChange = (content: string) => {
    setEditorContent(content);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">My Blog</h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-6 text-lg">
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200 dark:text-gray-300 dark:hover:text-blue-400">Home</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200 dark:text-gray-300 dark:hover:text-blue-400">About</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors duration-200 dark:text-gray-300 dark:hover:text-blue-400">Contact</a></li>
            </ul>
          </nav>
          <Button onClick={toggleTheme} className="md:hidden">
            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
          </Button>
          <Button onClick={toggleTheme} className="hidden md:block">
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </Button>
        </div>
      </header>

      {/* Main Content and Sidebar */}
      <div className="flex-grow container mx-auto p-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <main className="md:col-span-3">
          <section className="mb-10 p-8 bg-white rounded-xl shadow-sm dark:bg-gray-800 dark:shadow-lg">
            <h2 className="text-4xl font-extrabold mb-4 text-gray-800 dark:text-gray-100">Welcome to My Blog!</h2>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed dark:text-gray-300">This is a placeholder for your blog content. Start writing amazing articles here.</p>
            <Button className="px-6 py-3 text-lg">Read More</Button>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example Blog Post Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">First Blog Post</h3>
              <p className="text-gray-600 mb-4 text-sm leading-normal dark:text-gray-300">A short description of your first amazing blog post.</p>
              <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0 h-auto dark:text-blue-400 dark:hover:text-blue-300">View Post</Button>
            </div>

            {/* Example Blog Post Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Second Blog Post</h3>
              <p className="text-gray-600 mb-4 text-sm leading-normal dark:text-gray-300">Another insightful article for your readers.</p>
              <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0 h-auto dark:text-blue-400 dark:hover:text-blue-300">View Post</Button>
            </div>

            {/* Example Blog Post Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:hover:shadow-lg">
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">Third Blog Post</h3>
              <p className="text-gray-600 mb-4 text-sm leading-normal dark:text-gray-300">And here's a third one to get you started.</p>
              <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0 h-auto dark:text-blue-400 dark:hover:text-blue-300">View Post</Button>
            </div>
          </section>

          <div className="mt-12 mb-32 p-8 bg-white rounded-xl shadow-sm grid lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-1 lg:text-left dark:bg-gray-800 dark:shadow-lg">
            <RichTextEditor onEditorChange={handleEditorChange} />
            <Button className="mt-6 px-6 py-3 text-lg">저장</Button>
          </div>
        </main>

        <aside className="md:col-span-1 bg-white text-gray-900 p-6 rounded-xl h-fit dark:bg-gray-800">
          {/* Main Navigation */}

          {/* Recommended Channels */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4 flex justify-between items-center text-gray-900 dark:text-gray-100">
              <span>추천 채널</span>
              <div className="flex space-x-2 text-gray-600 dark:text-gray-400">
                <button className="hover:text-gray-900 transition-colors duration-200 dark:hover:text-white">↻</button>
                <button className="hover:text-gray-900 transition-colors duration-200 dark:hover:text-white">ᐱ</button>
              </div>
            </h3>
            
            <Button variant="default" className="w-full mt-4 bg-gray-200 text-gray-900 hover:bg-gray-300 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600">더보기</Button>
          </div>

          

          <hr className="border-gray-300 my-6 dark:border-gray-600" />
  
          {/* Original Category List - adapted to dark theme */}
          <hr className="border-gray-300 my-6 dark:border-gray-600" />
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">블로그 카테고리</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200 flex justify-between items-center">
                    <span>{category.name}</span>
                    <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-full dark:bg-gray-600 dark:text-gray-200">{category.count}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </aside>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white p-6 text-center mt-12 dark:bg-gray-950">
        <p className="text-lg">&copy; 2023 My Blog. All rights reserved.</p>
      </footer>
    </div>
  );
}
