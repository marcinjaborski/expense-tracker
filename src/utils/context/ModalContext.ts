"use client";

import { createContext, useContext } from "react";

export const ModalContext = createContext({
  showCreateModal: () => {},
  showUpdateModal: (_id: number) => {},
  showDeleteModal: (_id: number) => {},
});

export const useModalContext = () => useContext(ModalContext);
