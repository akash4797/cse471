// @ts-nocheck
import { Loading } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContextProvider";
import Header from "../../components/Layout/header";
import { getApplications } from "../../libs/pocketbase";
import { Table } from "@nextui-org/react";
import Link from "next/link";
import { Popover } from "@nextui-org/react";

import { editApplications } from "../../libs/pocketbase";

export default function Applications() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const user = useUser();

  //NOTE - states
  const [Applications, setApplications] = useState(null);
  const [SelectedApplicant, setSelectedApplicant] = useState(null);

  //NOTE -  functions
  const changeStatusHandler = async (form) => {
    form.preventDefault();
    const result = await editApplications(
      SelectedApplicant.id,
      form.target.status.value
    );
    if (result) {
      getInitData();
    }
  };

  //NOTE - Init & reset function
  const getInitData = async () => {
    const result = await getApplications();
    setApplications(result);
  };

  useEffect(() => {
    getInitData();
  }, []);

  if (user === false) {
    router.push("/login");
  }

  if (user === null || isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Overseas</title>
        <meta name="description" content="Overseas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title={"Applications"}>
          <div className=""></div>
        </Header>
        <div className="p-5">
          <Table
            aria-label="Application List"
            headerLined
            lined
            css={{
              height: "auto",
              minWidth: "100%",
              dropShadow: "none",
            }}
          >
            <Table.Header>
              <Table.Column>Name</Table.Column>
              <Table.Column>Agent</Table.Column>
              <Table.Column>Age</Table.Column>
              <Table.Column>Job Role</Table.Column>
              <Table.Column>Company</Table.Column>
              <Table.Column>CV</Table.Column>
              <Table.Column>Status</Table.Column>
              <Table.Column>Option</Table.Column>
            </Table.Header>
            <Table.Body>
              {Applications &&
                Applications.map((applicant) => (
                  <Table.Row key={applicant.id}>
                    <Table.Cell>{applicant.name}</Table.Cell>
                    <Table.Cell>{applicant.expand.agent.name}</Table.Cell>
                    <Table.Cell>{applicant.age}</Table.Cell>
                    <Table.Cell>{applicant.expand.job.type}</Table.Cell>
                    <Table.Cell>{applicant.expand.company.name}</Table.Cell>
                    <Table.Cell>
                      <div className="p-5">
                        <Link
                          href={`http://127.0.0.1:8090/api/files/${applicant.collectionId}/${applicant.id}/${applicant.cv}`}
                          target={"_blank"}
                        >
                          <span className="btnSecondary">View CV</span>
                        </Link>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      {applicant.status == "pending" ? "Pending" : "Rejected"}
                    </Table.Cell>
                    <Table.Cell>
                      <div className="p-5">
                        <Popover isBordered>
                          <Popover.Trigger>
                            <button
                              className="btnPrimary"
                              onClick={() => setSelectedApplicant(applicant)}
                            >
                              Change Status
                            </button>
                          </Popover.Trigger>
                          <Popover.Content>
                            <form
                              className="p-5 flex flex-col gap-3 w-[200px]"
                              onSubmit={(e) => changeStatusHandler(e)}
                            >
                              <select
                                name="status"
                                id=""
                                className="defaultInput"
                              >
                                <option value="pending">Pending</option>
                                <option value="rejected">Reject</option>
                                <option value="approved">Approve</option>
                              </select>
                              <input
                                type="submit"
                                value={"Change"}
                                className="btnSecondary"
                              />
                            </form>
                          </Popover.Content>
                        </Popover>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
        {/* Modals */}
        <div className=""></div>
      </main>
    </>
  );
}
