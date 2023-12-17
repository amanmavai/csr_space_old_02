/* eslint-disable no-console */
// Hook flow
// https://github.com/donavon/hook-flow
// http://localhost:3000/isolated/examples/hook-flow.js

import * as React from "react";

const state = {
  App: 0,
  Child1: 0,
  Child2: 0,
};

type ComponentNames = keyof typeof state;

function useLogger({ componentName }: { componentName: ComponentNames }) {
  const phase = state[componentName] > 0 ? "[UPDATE]" : "[MOUNT]";
  console.log(`%c    ${componentName}: render start ${phase}`, "color: MediumSpringGreen");

  const [count, setCount] = React.useState<number>(() => {
    console.log(`%c    ${componentName}: useState(() => 0)`, "color: tomato");
    return 0;
  });

  React.useEffect(() => {
    state[componentName]++;
    console.log(`%c    ${componentName}: useEffect(() => {})`, "color: LightCoral");
    return () => {
      console.log(`%c    ${componentName}: useEffect(() => {}) cleanup 🧹`, "color: LightCoral");
    };
  });

  React.useEffect(() => {
    console.log(`%c    ${componentName}: useEffect(() => {}, [count])`, "color: HotPink");
    return () => {
      console.log(`%c    ${componentName}: useEffect(() => {}, [count]) cleanup 🧹`, "color: HotPink");
    };
  }, [count]);

  React.useEffect(() => {
    console.log(`%c    ${componentName}: useEffect(() => {}, [])`, "color: MediumTurquoise");
    return () => {
      console.log(`%c    ${componentName}: useEffect(() => {}, []) cleanup - [UNMOUNT] 🧹`, "color: MediumTurquoise");
      state[componentName] = 0;
    };
  }, []);

  console.log(`%c    ${componentName}: render end`, "color: MediumSpringGreen");

  return [count, setCount] as const;
}

function Child1() {
  const [count, setCount] = useLogger({ componentName: "Child1" });

  return (
    <button className="btn btn-blue" onClick={() => setCount((previousCount) => previousCount + 1)}>
      {count}
    </button>
  );
}

function Child2() {
  const [count, setCount] = useLogger({ componentName: "Child2" });

  return (
    <button className="btn btn-blue" onClick={() => setCount((previousCount) => previousCount + 1)}>
      {count}
    </button>
  );
}

export function Component() {
  const phase = state.App > 0 ? "[UPDATE]" : "[MOUNT]";
  console.log(`%cApp: render start ${phase}`, "color: MediumSpringGreen");

  const [showChild1, setShowChild1] = React.useState(() => {
    console.log("%cApp: useState(() => false)", "color: tomato", "child1");
    return false;
  });

  const [showChild2, setShowChild2] = React.useState(() => {
    console.log("%cApp: useState(() => false)", "color: tomato", "child2");
    return false;
  });

  React.useEffect(() => {
    state.App++;
    console.log("%cApp: useEffect(() => {})", "color: LightCoral");
    return () => {
      console.log("%cApp: useEffect(() => {}) cleanup 🧹", "color: LightCoral");
    };
  });

  React.useEffect(() => {
    console.log("%cApp: useEffect(() => {}, [showChild1, showChild2])", "color: HotPink");
    return () => {
      console.log("%cApp: useEffect(() => {}, [showChild1, showChild2]) cleanup 🧹", "color: HotPink");
    };
  }, [showChild1, showChild2]);

  React.useEffect(() => {
    console.log("%cApp: useEffect(() => {}, [])", "color: MediumTurquoise");
    return () => {
      console.log("%cApp: useEffect(() => {}, []) cleanup - [UNMOUNT] 🧹", "color: MediumTurquoise");
      state.App = 0;
    };
  }, []);

  const element = (
    <div>
      <label className="text-lg leading-loose">
        <input type="checkbox" checked={showChild1} onChange={(e) => setShowChild1(e.target.checked)} /> show child 1
      </label>
      <div
        style={{
          padding: 10,
          margin: 10,
          height: 100,
          width: 200,
          border: "solid",
        }}
      >
        {showChild1 ? <Child1 /> : null}
      </div>

      <label className="text-lg leading-loose">
        <input type="checkbox" checked={showChild2} onChange={(e) => setShowChild2(e.target.checked)} /> show child 2
      </label>
      <div
        style={{
          padding: 10,
          margin: 10,
          height: 100,
          width: 200,
          border: "solid",
        }}
      >
        {showChild2 ? <Child2 /> : null}
      </div>
    </div>
  );

  console.log("%cApp: render end", "color: MediumSpringGreen");

  return element;
}
