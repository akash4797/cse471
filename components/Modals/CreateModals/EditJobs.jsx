import React from "react";
import { Modal } from "@nextui-org/react";
import { editJobs } from "../../../libs/pocketbase";

// type, desc, company, pub, salary

export default function EditJobs({
  visible,
  setVisible,
  reset,
  companies,
  jobInfo,
}) {
  const EditJobsHandler = async (form) => {
    form.preventDefault();
    await editJobs(
      form.target.type.value,
      form.target.desc.value,
      form.target.company.value,
      form.target.published.value,
      form.target.salary.value,
      jobInfo.id
    );
    setVisible(false);
    reset();
  };

  return (
    <>
      <Modal
        closeButton
        aria-labelledby={"Edit Jobs"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Edit Jobs"}</span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => EditJobsHandler(e)}
          >
            <select
              name="company"
              className="px-3 py-2"
              defaultValue={jobInfo && jobInfo.id}
            >
              {companies &&
                companies.map((company) => (
                  <option value={company.id} key={company.id}>
                    {company.name}
                  </option>
                ))}
            </select>
            <input
              type="text"
              defaultValue={jobInfo && jobInfo.type}
              placeholder="Work type"
              name="type"
              className="px-3 py-2"
            />
            <input
              type="text"
              defaultValue={jobInfo && jobInfo.salary}
              placeholder="Salary"
              name="salary"
              className="px-3 py-2"
            />
            <textarea
              name="desc"
              defaultValue={jobInfo && jobInfo.description}
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
              value={"Edit"}
            />
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}
