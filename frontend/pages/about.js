import React, { useEffect, useState } from "react";
import { fetchEntries } from "../lib/contentful";

export default function AboutPage() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    async function getData() {
      const entries = await fetchEntries("aboutPage");
      setContent(entries);
    }
    getData();
  }, []);

  return (
    <div>
      <h1>About Us</h1>
      {content.map((entry) => (
        <p key={entry.sys.id}>{entry.fields.description}</p>
      ))}
    </div>
  );
}
