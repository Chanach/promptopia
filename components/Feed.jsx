"use client";
import React, { useEffect, useState } from "react";
import PromtCard from "./PromtCard";
import { useRouter } from "next/navigation";

const PromptCardList = ({ data, handleTagClick, handeProfileClick }) => {
  return (
    <div className="mt-12 prompt_layout">
      {data.map((post) => (
        <PromtCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("api/prompt");
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    };

    fetchPosts();
  }, []);

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
    filterPosts(e.target.value);
    // setFilteredPosts(
    //   posts.filter((post) => {
    //     return (
    //       post.creator.username
    //         .toLowerCase()
    //         .includes(e.target.value.toLowerCase()) ||
    //       post.tag.toLowerCase().includes(e.target.value.toLowerCase()) ||
    //       post.prompt.toLowerCase().includes(e.target.value.toLowerCase())
    //     );
    //   })
    // );
  };

  const filterPosts = (filterValue) => {
    setFilteredPosts(
      posts.filter((post) => {
        return (
          post.creator.username
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          post.tag.toLowerCase().includes(filterValue.toLowerCase()) ||
          post.prompt.toLowerCase().includes(filterValue.toLowerCase())
        );
      })
    );
  };

  const handleTagClick = (postTag) => {
    setSearchText(postTag);
    filterPosts(postTag);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchText}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={filteredPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
