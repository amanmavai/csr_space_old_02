import { useState, useEffect } from "react";

export function Component() {
  const [light, setLight] = useState("red");

  useEffect(() => {
    const timer = setInterval(() => {
      setLight((currentLight) => {
        switch (currentLight) {
          case "red":
            return "green";
          case "green":
            return "yellow";
          case "yellow":
            return "red";
          default:
            return "red";
        }
      });
    }, 1000); // Change the light every 3 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-12 flex flex-col items-center gap-4">
      <div className={`h-12 w-12 rounded-full ${light === "red" ? "bg-red-400" : "bg-gray-300"}`} />
      <div className={`h-12 w-12 rounded-full  ${light === "green" ? "bg-green-400" : "bg-gray-300"}`} />
      <div className={`h-12 w-12 rounded-full  ${light === "yellow" ? "bg-yellow-400" : "bg-gray-300"}`} />
    </div>
  );
}
