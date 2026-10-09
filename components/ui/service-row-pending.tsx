"use client";

import { useLinkStatus } from "next/link";

export function ServiceRowPending() {
  const { pending } = useLinkStatus();

  return (
    <span className={`service-row-pending${pending ? " is-pending" : ""}`} aria-hidden="true">
      <span className="service-pending-indicator" />
      <span>Opening service</span>
      <span className="service-pending-skeleton" />
    </span>
  );
}
