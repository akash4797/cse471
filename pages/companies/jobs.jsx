// @ts-nocheck
import { Loading } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContextProvider";
import Header from "../../components/Layout/header";
import { getJobs, getCompanies } from "../../libs/pocketbase";
import { Table } from "@nextui-org/react";

//NOTE - modals
import CreateJobs from "../../components/Modals/CreateModals/CreateJobs";
import EditJobs from "../../components/Modals/CreateModals/EditJobs";
import Delete_Job from "../../components/Modals/DeleteModals/DeleteJob";

export default function Jobs() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const user = useUser();

  //NOTE - selected values
  const [SelectedJob, setSelectedJob] = useState(null);

  //NOTE - modal values
  const [CreateJobVisible, setCreateJobVisible] = useState(false);
  const [EditJobVisible, setEditJobVisible] = useState(false);
  const [DeleteJobVisible, setDeleteJobVisible] = useState(false);

  //NOTE - main vlaues
  const [Jobs, setJobs] = useState(null);
  const [Companies, SetCompanies] = useState(null);

  //NOTE - functions
  const getJobsHandler = async () => {
    const result0 = await getJobs();
    const result1 = await getCompanies();
    // @ts-ignore
    setJobs(result0);
    SetCompanies(result1);
  };

  const EditJobHandler = (job) => {
    setSelectedJob(job);
    setEditJobVisible(true);
  };

  const DeleteJobHandler = (job) => {
    setSelectedJob(job);
    setDeleteJobVisible(true);
  };

  useEffect(() => {
    getJobsHandler();
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
        <meta name="description" content="Sayem Overseas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header title={"Jobs"}>
          <div className="">
            <button
              className="bg-green-700 text-white px-2 py-2 rounded"
              onClick={() => setCreateJobVisible(true)}
            >
              Add Jobs
            </button>
          </div>
        </Header>
        <div className="p-5">
          <Table
            aria-label="Course"
            headerLined
            lined
            css={{
              height: "auto",
              minWidth: "100%",
              dropShadow: "none",
            }}
          >
            <Table.Header>
              <Table.Column>Company Name</Table.Column>
              <Table.Column>Work type</Table.Column>
              <Table.Column>Salary</Table.Column>
              <Table.Column>Description</Table.Column>
              <Table.Column>Options</Table.Column>
              <Table.Column>Published</Table.Column>
            </Table.Header>
            <Table.Body>
              {Jobs &&
                Jobs.map((job) => (
                  <Table.Row key={job.id}>
                    <Table.Cell>{job.expand.company.name}</Table.Cell>
                    <Table.Cell>{job.type}</Table.Cell>
                    <Table.Cell>{job.salary}</Table.Cell>
                    <Table.Cell>
                      {" "}
                      <div className="w-[100px]">{job.description}</div>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-3">
                        <button
                          className="bg-blue-600 text-white px-2 py-1 rounded"
                          onClick={() => EditJobHandler(job)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 text-white rounded px-2 py-1"
                          onClick={() => DeleteJobHandler(job)}
                        >
                          DELETE
                        </button>
                      </div>
                    </Table.Cell>
                    <Table.Cell>
                      {job.published ? "Published" : "Unpublished"}
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
        {/* Modals */}
        <div className="">
          {/* <CreateCompany
            visible={CreateCompanyVisible}
            setVisible={setCreateCompanyVisible}
            reset={getCompaniesHandler}
          />
          <Edit_Company
            visible={EditCompanyVisible}
            setVisible={setEditCompanyVisible}
            company={SelectedCompany}
            reset={getCompaniesHandler}
          />
          <Delete_Course
            visible={DeleteCompanyVisible}
            setVisible={setDeleteCompanyVisible}
            company={SelectedCompany}
            reset={getCompaniesHandler}
          /> */}
          <CreateJobs
            visible={CreateJobVisible}
            setVisible={setCreateJobVisible}
            reset={getJobsHandler}
            companies={Companies}
          />
          <EditJobs
            visible={EditJobVisible}
            setVisible={setEditJobVisible}
            companies={Companies}
            jobInfo={SelectedJob}
            reset={getJobsHandler}
          />
          <Delete_Job
            visible={DeleteJobVisible}
            setVisible={setDeleteJobVisible}
            job={SelectedJob}
            reset={getJobsHandler}
          />
        </div>
      </main>
    </>
  );
}
