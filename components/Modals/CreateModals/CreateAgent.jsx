import React from "react";
import { Modal } from "@nextui-org/react";
import { createAgent } from "../../../libs/pocketbase";

export default function CreateAgent({ visible, setVisible, reset }) {
  const createAgentHandler = async (form) => {
    form.preventDefault();
    //TODO - Add agent api
    const result = await createAgent(form.target.name.value);
    if (result) {
      setVisible(false);
      reset();
    }
  };

  return (
    <>
      <Modal
        closeButton
        aria-labelledby={"Create Agent"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Create Agent"}</span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => createAgentHandler(e)}
          >
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="px-3 py-2"
            />
            <input
              type="submit"
              className="bg-green-700 text-white px-2 py-1 mt-5"
              value={"Add"}
            />
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
