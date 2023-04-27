import React from "react";
import { Modal } from "@nextui-org/react";
import { createApplication } from "../../../libs/pocketbase";
import { useToast } from "../../../context/ToastContextProvider";

export default function CreateApplication({
  visible,
  setVisible,
  job,
  viewnoti,
}) {
  const notify = useToast();
  const createApplicaitonHandler = async (form) => {
    form.preventDefault();
    //TODO - Add api
    const formData = new FormData();
    formData.append("name", form.target.name.value);
    formData.append("agent", form.target.agent.value);
    formData.append("age", form.target.age.value);
    formData.append("mobile", form.target.mobile.value);
    formData.append("job", job.id);
    formData.append("status", "pending");
    formData.append("company", job.expand.company.id);
    for (let file of form.target.cv.files) {
      formData.append("cv", file);
    }

    const result = await createApplication(formData);
    if (result) {
      setVisible(false);
      // @ts-ignore
      notify("Your application has submitted", "default");
      viewnoti(result.id);
    }
  };

  return (
    <>
      <Modal
        closeButton
        aria-labelledby={"Create Applicaiton"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">
            {"Create New Applicaiton"}
          </span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => createApplicaitonHandler(e)}
          >
            <input
              type="text"
              className="defaultInput"
              placeholder="Name"
              name="name"
            />
            <input
              type="text"
              name="agent"
              className="defaultInput"
              placeholder="Agent ID"
            />
            <input
              type="number"
              name="age"
              className="defaultInput"
              placeholder="Age"
            />
            <input
              type="text"
              name="mobile"
              className="defaultInput"
              placeholder="Mobile number"
            />
            <input type="file" name="cv" id="cv" className="defaultInput" />
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
