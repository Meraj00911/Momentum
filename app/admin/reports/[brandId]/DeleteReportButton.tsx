"use client";

import { useState } from "react";

type Props = {
  reportId: string;
  brandId: string;
  deleteAction: (formData: FormData) => void;
};

export default function DeleteReportButton({
  reportId,
  brandId,
  deleteAction,
}: Props) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="delete-confirm">
        <span>Delete this report?</span>

        <div className="delete-confirm-actions">
          <button
            type="button"
            className="delete-cancel"
            onClick={() => setConfirming(false)}
          >
            Cancel
          </button>

          <form action={deleteAction}>
            <input
              type="hidden"
              name="reportId"
              value={reportId}
            />

            <input
              type="hidden"
              name="brandId"
              value={brandId}
            />

            <button
              type="submit"
              className="delete-confirm-button"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="delete-link"
      onClick={() => setConfirming(true)}
    >
      Delete
    </button>
  );
}