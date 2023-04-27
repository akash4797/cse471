import React from "react";
import { Modal } from "@nextui-org/react";
import { createJobs } from "../../../libs/pocketbase";

// type, desc, company, pub, salary

export default function CreateJobs({ visible, setVisible, reset, companies }) {
  const createJobsHandler = async (form) => {
    form.preventDefault();
    await createJobs(
      form.target.type.value,
      form.target.desc.value,
      form.target.company.value,
      form.target.published.value,
      form.target.salary.value
    );
    setVisible(false);
    reset();
  };

  return (
    <>
      <Modal
        closeButton
        aria-labelledby={"Create Jobs"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Add Jobs"}</span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => createJobsHandler(e)}
          >
            <select name="company" className="px-3 py-2">
              {companies &&
                companies.map((company) => (
                  <option value={company.id} key={company.id}>
                    {company.name}
                  </option>
                ))}
            </select>
            <input
              type="text"
              placeholder="Work type"
              name="type"
              className="px-3 py-2"
            />
            <input
              type="text"
              placeholder="Salary"
              name="salary"
              className="px-3 py-2"
            />
            <textarea
              name="desc"
              cols={30}
              rows={5}
              placeholder="Description"
              className="px-3 py-2"
            ></textarea>
            <select
              name="published"
              defaultValue={"true"}
              className="px-3 py-2"
            >
              <option value="true">Publish</option>
              <option value="false">Unpublished</option>
            </select>
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
