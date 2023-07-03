"use client";

import { Button } from "ui/button";
import { Heading } from "ui/heading";

export default function Page() {
  return (
    <>
      <Heading level="1">Web</Heading>
      <Button onClick={() => alert("boop")}>Click me</Button>
    </>
  );
}
