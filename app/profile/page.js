"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

import React from "react";

const UserProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`api/users/${session?.user.id}/posts`);

      const data = await response.json();
      setPosts(data);
    };

    if (session?.user.id) {
      fetchPosts();
    }
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const userHasConfirmed = confirm("Do you realy want to delete this post?");
    if (userHasConfirmed) {
      try {
        await fetch(`api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p) => {
          return p._id !== post._id;
        });

        setPosts(filteredPosts);
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default UserProfile;
