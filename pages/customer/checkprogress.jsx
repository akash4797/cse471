import Head from "next/head";
import React, { useState } from "react";
import { getOneCustomer } from "../../libs/pocketbase";

export default function Checkprogress() {
  const [Customer, setCustomer] = useState(null);
  const getOneCustomerHandler = async (form) => {
    form.preventDefault();
    const result = await getOneCustomer(form.target.id.value);
    console.log(result);
    // @ts-ignore
    setCustomer(result);
  };
  return (
    <>
      <Head>
        <title>Overseas</title>
        <meta name="description" content="Overseas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-5">
        <h1 className="text-xl font-semibold text-center">
          Check Your Progress
        </h1>
        <form
          className="flex justify-center items-center mt-5 gap-3"
          onSubmit={(e) => getOneCustomerHandler(e)}
        >
          <input
            type="text"
            name="id"
            placeholder="Application ID"
            className="defaultInput"
          />
          <input type="submit" className="btnSecondary" />
        </form>
        {Customer &&
          // @ts-ignore
          (Customer.status === "pending" || Customer.status === "rejected" ? (
            <div className="bg-gray-100 my-5 p-5">
              <span>
                Status:{" "}
                {
                  // @ts-ignore
                  Customer.status
                }
              </span>
            </div>
          ) : (
            <div className="">
              <div className="bg-green-100 my-5 p-5">
                <span>Status : Approved</span>
              </div>
              <div className="bg-gray-100 my-5 p-5">
                <span className="font-bold">Application For:</span>
                <div className="flex flex-col gap-3 mt-3">
                  <span>
                    Company name:{" "}
                    {
                      // @ts-ignore
                      Customer.expand.company.name
                    }
                  </span>
                  <span>
                    Company location:{" "}
                    {
                      // @ts-ignore
                      Customer.expand.company.location
                    }
                  </span>
                </div>
              </div>
              <div className="bg-gray-100 my-5 p-5">
                <span className="font-bold">Applicant Information:</span>
                <div className="flex flex-col gap-3 mt-3">
                  <span>
                    Name:{" "}
                    {
                      // @ts-ignore
                      Customer.name
                    }
                  </span>
                  <span>
                    Age:{" "}
                    {
                      // @ts-ignore
                      Customer.age
                    }
                  </span>
                  <span>
                    Mobile:{" "}
                    {
                      // @ts-ignore
                      Customer.mobile
                    }
                  </span>
                </div>
              </div>
              <div className="bg-gray-100 my-5 p-5">
                <span className="font-bold">Applicant Progress:</span>
                <div className="flex flex-col gap-3 mt-3">
                  <span>
                    Visa:{" "}
                    {
                      // @ts-ignore
                      Customer.visa ? "Done" : "Undone"
                    }
                  </span>
                  <span>
                    Police Clearance:{" "}
                    {
                      // @ts-ignore
                      Customer.police_clearance ? "Done" : "Undone"
                    }
                  </span>
                  <span>
                    Passport:{" "}
                    {
                      // @ts-ignore
                      Customer.passport ? "Done" : "Undone"
                    }
                  </span>
                </div>
              </div>
            </div>
          ))}
      </main>
    </>
  );
}
