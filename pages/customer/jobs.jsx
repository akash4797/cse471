import React, { useState } from "react";
import Head from "next/head";
import { getJobs } from "../../libs/pocketbase";
import { Collapse } from "@nextui-org/react";
import Link from "next/link";
import CreateApplication from "../../components/Modals/CreateModals/CreateApplication";

export default function Jobs({ jobsStringObject }) {
  const jobs = JSON.parse(jobsStringObject);
  //   console.log(jobs);

  //NOTE - New code
  const [ViewIDVIsible, setViewIDVisible] = useState(false);
  const [ViewID, setViewID] = useState(null);

  //NOTE - Seleted states
  const [SelectedJob, setSelectedJob] = useState(null);

  //NOTE - Modals state
  const [CreateApplicationVisible, setCreateApplicationVisible] =
    useState(false);

  const CreateApplicaitonHandler = (job) => {
    setSelectedJob(job);
    setCreateApplicationVisible(true);
  };

  const ViewIDHandler = (id) => {
    setViewID(id);
    setViewIDVisible(true);
  };

  return (
    <>
      <Head>
        <title>Overseas</title>
        <meta name="description" content="Overseas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-5">
        <h1 className="text-center text-xl font-semibold">Available Jobs</h1>
        <div className="bg-orange-200 p-5 my-5">
          <span>
            Please keep your mobile number same while applying for multiple
            jobs. So you can track your application status only by entering your
            mobile number.
          </span>
        </div>
        {ViewIDVIsible ? (
          <div className="relative bg-orange-200 p-5 my-5">
            <span>Your Application ID is: {ViewID}</span>
            <button
              className="absolute w-6 h-6 rounded-full bg-red-600 text-white -top-2 -right-2"
              onClick={() => setViewIDVisible(false)}
            >
              X
            </button>
          </div>
        ) : null}
        <div className="my-5 flex gap-5 items-center">
          <Link href={"/customer/checkprogress"}>
            <span className="btnPrimary">Applicaiton Status</span>
          </Link>
          <button className="btnSecondary">Search applicaiton ID</button>
        </div>
        <div className="">
          <Collapse.Group bordered>
            {jobs.map((job) => (
              <Collapse
                key={job.id}
                title={job.expand.company.location}
                subtitle={
                  <>
                    Company Name:{" "}
                    <span className="text-black">
                      {job.expand.company.name}
                    </span>
                  </>
                }
              >
                <div className="flex flex-col">
                  <span>Role: {job.type}</span>
                  <span>Role: {job.salary}</span>
                  <p>{`Description: ${job.description}`}</p>
                  <button
                    className="btnPrimary w-fit mt-5"
                    onClick={() => CreateApplicaitonHandler(job)}
                  >
                    Apply
                  </button>
                </div>
              </Collapse>
            ))}
          </Collapse.Group>
        </div>
      </div>
      <div className="">
        <CreateApplication
          visible={CreateApplicationVisible}
          setVisible={setCreateApplicationVisible}
          job={SelectedJob}
          viewnoti={ViewIDHandler}
        />
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const result = await getJobs();
  const final = JSON.stringify(result);
  console.log(result);
  return {
    props: {
      jobsStringObject: final,
    }, // will be passed to the page component as props
  };
}
