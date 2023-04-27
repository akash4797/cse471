import React from "react";
import { Modal } from "@nextui-org/react";
import { editAgent } from "../../../libs/pocketbase";

export default function EditAgent({ visible, setVisible, reset, agent }) {
  const edit__Handler = async (form) => {
    form.preventDefault();
    //TODO - edit api
    await editAgent(agent.id, form.target.name.value);
    setVisible(false);
    reset();
  };

  return (
    <>
      <Modal
        closeButton
        aria-labelledby={"Edit Agent"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Edit Agent"}</span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => edit__Handler(e)}
          >
            <input
              type="text"
              placeholder="Name"
              name="name"
              defaultValue={agent ? agent.name : ""}
              className="px-3 py-2"
            />
            <input
              type="submit"
              className="bg-green-700 text-white px-2 py-1 mt-5"
              value={"Edit"}
            />
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
