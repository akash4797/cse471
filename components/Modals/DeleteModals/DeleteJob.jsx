import React from "react";
import { Modal } from "@nextui-org/react";
import { deleteJob } from "../../../libs/pocketbase";

export default function Delete_Job({ visible, setVisible, job, reset }) {
  const confirmHandler = async () => {
    const result = await deleteJob(job.id);
    if (result) {
      reset();
      setVisible(false);
    }
  };

  return (
    <>
      <Modal
        closeButton
        aria-labelledby={"Delete Company"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Delete Company"}</span>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <span>Do yout want to delete this job?</span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="px-2 py-1 bg-red-600 text-white rounded"
            onClick={confirmHandler}
          >
            Yes
          </button>
          <button
            className="px-2 py-1 bg-gray-600 text-white rounded"
            onClick={() => setVisible(false)}
          >
            No
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
