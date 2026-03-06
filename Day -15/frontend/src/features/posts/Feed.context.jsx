import { createContext, useState } from "react";
export const PostContext = createContext();
export function AllpostsContext({ children }) {
  const [loading, setloading] = useState(false);
  const [post, setpost] = useState([]);
  const [allposts, setallposts] = useState([]);
  const [follower, setfollower] = useState([]);
  const [following, setfollowing] = useState([]);
  const [others, setothers] = useState([]);

  return (
    <PostContext.Provider
      value={{
        loading,
        setloading,
        post,
        setpost,
        allposts,
        setallposts,
        follower,
        setfollower,
        following,
        setfollowing,
        others,
        setothers,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
