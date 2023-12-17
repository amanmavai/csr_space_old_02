import React, { useState, useEffect, useRef, useCallback } from "react";

type User = {
  id: number;
  login: string;
  avatar_url: string;
};

type InfiniteScrollHookProps = {
  scrollableRef: React.RefObject<HTMLDivElement>;
  loadMore: () => void;
};

const useInfiniteScroll = ({ scrollableRef, loadMore }: InfiniteScrollHookProps) => {
  const isInitialLoad = useRef<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollableRef.current) return;

      /**
      scrollTop: The number of pixels the content of the element is scrolled vertically.
      clientHeight: The inner height of the element, not including the scroll bar.
      scrollHeight: The total height of the element's content, including the content not visible on the screen due to overflow.

      The function then checks if the user has scrolled to the bottom of the element. This is done by checking if the sum of scrollTop
      and clientHeight is greater than or equal to scrollHeight - 5. The - 5 creates a 5px threshold before the actual bottom, making
      the experience smoother as it preloads the data slightly before reaching the bottom.
      */
      const { scrollTop, scrollHeight, clientHeight } = scrollableRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        loadMore();
      }
    };

    const scrollableElement = scrollableRef.current;

    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScroll);

      // Perform initial data load if necessary
      if (isInitialLoad.current) {
        loadMore();
        isInitialLoad.current = false;
      }
    }

    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loadMore]);
};

export function Component() {
  const [items, setItems] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastUserId, setLastUserId] = useState<number>(0);
  const scrollableRef = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(async () => {
    if (loading) return; // Prevent multiple fetches when already loading
    try {
      setLoading(true);
      // const response = await fetch(`https://api.github.com/users?since=${lastUserId}&per_page=15`); use this for unauthenticated requests
      const accessToken = import.meta.env.VITE_GITHUB_TOKEN; // Access the token
      const response = await fetch(`https://api.github.com/users?since=${lastUserId}&per_page=15`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();

      setItems((prevItems) => [...prevItems, ...data]);
      if (data.length > 0) {
        setLastUserId(data[data.length - 1].id);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Error occurred"));
    } finally {
      setLoading(false);
    }
  }, [lastUserId, loading]);

  useInfiniteScroll({ scrollableRef, loadMore: fetchData });

  return (
    <div
      ref={scrollableRef}
      className="mx-auto mt-20 flex h-96 w-96 flex-col gap-4 overflow-auto border border-solid border-gray-300 p-4 px-20"
    >
      {items.map((user) => (
        <div key={user.id} className="item flex gap-4">
          <img src={user.avatar_url} alt={user.login} className="h-10 w-10 rounded-full" />
          <h4 className="text-lg text-green-500">{user.login}</h4>
        </div>
      ))}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
