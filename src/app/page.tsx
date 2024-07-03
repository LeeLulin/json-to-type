"use client";

import CodeMirror from "@uiw/react-codemirror";
import { useCallback, useState } from "react";
import { json } from "@codemirror/lang-json";
import { basicDark } from "@uiw/codemirror-theme-basic";
import { javascript } from "@codemirror/lang-javascript";
import JsonToTS from "json-to-ts";
import { Button } from "@headlessui/react";

export default function Home() {
  const [jsonData, setJsonData] = useState("");
  const [typeData, setTypeData] = useState("");

  const convertJson = () => {
    if (jsonData) {
      const typeStr = JsonToTS(JSON.parse(jsonData), {
        useTypeAlias: true,
      }).join("\n\n");
      setTypeData(typeStr);
    } else {
      setTypeData("");
    }
  };

  const onJsonChange = useCallback((val: string, viewUpdate: any) => {
    console.log("val:", val);
    setJsonData(val);
    const typeStr = JsonToTS(JSON.parse(val), {
      useTypeAlias: true,
    }).join("\n\n");
    setTypeData(typeStr);
  }, []);

  const onTypeChange = useCallback((val: string, viewUpdate: any) => {
    console.log("val:", val);
    setTypeData(val);
  }, []);

  return (
    <div className="w-full h-full flex flex-row items-center justify-center p-10">
      <CodeMirror
        className="flex-1 max-w-screen-md"
        style={{ height: "100%" }}
        value={jsonData}
        theme={basicDark}
        width="100%"
        height="100%"
        extensions={[json()]}
        onChange={onJsonChange}
      />
      <Button
        className="mx-10 h-10 rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
        onClick={convertJson}
      >
        生成
      </Button>
      <CodeMirror
        className="flex-1 shrink-0 max-w-screen-md"
        style={{ height: "100%" }}
        value={typeData}
        theme={basicDark}
        width="100%"
        height="100%"
        extensions={[javascript({ typescript: true })]}
        onChange={onTypeChange}
      />
    </div>
  );
}
