import React from "react";
import { Modal } from "@nextui-org/react";
import { editApCustomer } from "../../../libs/pocketbase";

export default function EditApCustomer({
  visible,
  setVisible,
  reset,
  customer,
}) {
  const editApCustomerHandler = async (form) => {
    form.preventDefault();
    // const data = {
    //   id: customer.id,
    //   name: form.target.name.value,
    //   age: form.target.age.value,
    //   satus: form.target.status.value,
    //   visa: form.target.visa.checked,
    //   pol: form.target.police_clearance.checked,
    //   passport: form.target.passport.checked,
    //   mobile: form.target.mobile.value,
    // };
    // console.log(data);
    //TODO - edit api
    await editApCustomer(
      customer.id,
      form.target.name.value,
      form.target.age.value,
      form.target.status.value,
      form.target.visa.checked,
      form.target.police_clearance.checked,
      form.target.passport.checked,
      form.target.mobile.value
    );
    setVisible(false);
    reset();
  };

  return (
    <>
      <Modal
        closeButton
        fullScreen
        aria-labelledby={"Update Customer"}
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <span className="text-xl font-semibold">{"Update Customer"}</span>
        </Modal.Header>
        <Modal.Body>
          <form
            className="flex flex-col gap-2 w-1/3 self-center"
            onSubmit={(e) => editApCustomerHandler(e)}
          >
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="defaultInput"
              defaultValue={customer && customer.name}
            />
            <input
              type="number"
              placeholder="Age"
              name="age"
              defaultValue={customer && customer.age}
              className="defaultInput"
            />
            <select
              name="status"
              defaultValue={customer && customer.status}
              className="defaultInput"
            >
              <option value="Change Status" disabled>
                Change Status
              </option>
              <option value="approved">Approve</option>
              <option value="pending">Pending</option>
              <option value="rejected">Reject</option>
            </select>
            <div className="flex defaultInput item-center gap-5">
              <label>Visa</label>
              <input
                type="checkbox"
                name="visa"
                defaultChecked={customer && customer.visa}
              />
            </div>
            <div className="flex defaultInput item-center gap-5">
              <label>Police Clearance</label>
              <input
                type="checkbox"
                name="police_clearance"
                defaultChecked={customer && customer.police_clearance}
              />
            </div>
            <div className="flex defaultInput item-center gap-5">
              <label>Passport</label>
              <input
                type="checkbox"
                name="passport"
                defaultChecked={customer && customer.passport}
              />
            </div>
            <input
              type="text"
              placeholder="Mobile"
              name="mobile"
              className="defaultInput"
              defaultValue={customer && customer.mobile}
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
