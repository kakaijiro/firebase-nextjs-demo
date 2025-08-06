import React from "react";

export default function Layout({
  children,
  modal, // since we defined @modal, the property's name is modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
