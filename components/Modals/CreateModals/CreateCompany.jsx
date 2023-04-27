import React from "react";
import { Modal } from "@nextui-org/react";
import { createCompany } from "../../../libs/pocketbase";

export default function CreateCompany({ visible, setVisible, reset }) {
  const createCompanyHandler = async (form) => {
    form.preventDefault();
    await createCompany(
      form.target.companyName.value,
      form.target.companyLocation.value
    );
    setVisible(false);
    reset();
  };

  return (
    <>
      <Modal
        closeButton
        aria-labelledby={"Create Company"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Add Company"}</span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => createCompanyHandler(e)}
          >
            <input
              type="text"
              placeholder="Company Name"
              name="companyName"
              className="px-3 py-2"
            />
            <input
              type="text"
              placeholder="Company Location"
              name="companyLocation"
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
