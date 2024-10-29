"use client";

import { getData } from "@/lib/api";
import { useEffect, useState } from "react";
import { BlogPost } from "./interface";

export function ResultData() {
  const [data, setData] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchedData() {
      const result = await getData(
        "https://cdn.contentful.com/spaces/yxrkwnvtrl2a/environments/master/entries?access_token=IEnf9if81Ot9Tc05FdYjAmNRREVVm8Im3Gj3o_2eZTI"
      );

      const BlogData = result.items.map((entry: any) => ({
        title: entry.fields.title,
        excerpt: entry.fields.excerpt,
        date: entry.fields.date,
      }));

      setData(BlogData);
    }

    fetchedData();
  }, []);

  const fixDate = (dateString: string) => {
    if (!dateString) return " ";

    const date = new Date(dateString);

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    return `Date: ${month}/${day}/${year}`;
  };

  return (
    <div className="ml-16 mr-16 my-8 py-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-pink-400 animate-bounce">
        My Blog Posts
      </h1>

      <ul className="space-y-6">
        {data.map((item, index) => (
          <li
            key={index}
            className="bg-black rounded-md p-6 transition transform hover:bg-gray-600 hover:scale-105 hover:shadow-lg opacity-0 animate-fadeIn delay-[300ms] duration-500 ease-in-out"
          >
            <h2 className="text-xl font-semibold mb-2 text-pink-400">
              {item.title}
            </h2>
            <p className="text-gray-200 mb-4">{item.excerpt}</p>
            <p className="text-sm text-green-400">{fixDate(item.date)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
