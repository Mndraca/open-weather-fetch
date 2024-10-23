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
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `Date: ${month}/${day}/${year}`;
  };

  return (
    <div>
      <h1>My Blog Posts</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <h2>{item.title}</h2>
            <p>{item.excerpt}</p>
            <p>{fixDate(item.date)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
