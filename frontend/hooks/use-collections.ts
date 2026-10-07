"use client";
import { getCollectionsOptions } from "@/generated/api/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";

export const useCollections = () => useQuery(getCollectionsOptions());
