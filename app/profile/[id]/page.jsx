"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Profile from "@components/Profile";

const DynamicUserProfile = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const userName = searchParams.get("userName");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`../api/users/${params.id}/posts`);

      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, [params.id]);

  return <Profile name={userName} desc="" data={posts} />;
};
export default DynamicUserProfile;
