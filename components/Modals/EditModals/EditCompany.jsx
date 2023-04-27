import React from "react";
import { Modal } from "@nextui-org/react";
import { editCompany } from "../../../libs/pocketbase";

export default function Edit_Company({ visible, setVisible, company, reset }) {
  const editCompanyHandler = async (form) => {
    form.preventDefault();
    const result = await editCompany(
      form.target.name.value,
      form.target.location.value,
      company.id
    );
    if (result) {
      reset();
      setVisible(false);
    }
  };
  return (
    <>
      <Modal
        closeButton
        aria-labelledby={"Edit Company"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Edit Company"}</span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => editCompanyHandler(e)}
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="px-2 py-1 border rounded"
              defaultValue={company ? company.name : ""}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              className="px-2 py-1 border rounded"
              defaultValue={company ? company.location : ""}
            />
            <input
              type="submit"
              className="bg-green-700 text-white px-2 py-1 mt-5"
            />
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
