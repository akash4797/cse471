// @ts-nocheck
import { Loading } from "@nextui-org/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/UserContextProvider";
import Header from "../../components/Layout/header";
import { getCompanies } from "../../libs/pocketbase";
import { Table } from "@nextui-org/react";

//NOTE - modals
import CreateCompany from "../../components/Modals/CreateModals/CreateCompany";
import Edit_Company from "../../components/Modals/EditModals/EditCompany";
import Delete_Course from "../../components/Modals/DeleteModals/DeleteCompany";

export default function Agents() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const user = useUser();

  //NOTE - selected values
  const [SelectedCompany, setSelectedCompany] = useState(null);

  //NOTE - modal values
  const [CreateCompanyVisible, setCreateCompanyVisible] = useState(false);
  const [EditCompanyVisible, setEditCompanyVisible] = useState(false);
  const [DeleteCompanyVisible, setDeleteCompanyVisible] = useState(false);

  //NOTE - main vlaues
  const [Companies, setCompanies] = useState(null);

  //NOTE - functions
  const getCompaniesHandler = async () => {
    const result = await getCompanies();
    console.log(result);
    // @ts-ignore
    setCompanies(result);
  };

  const EditCompanyHandler = (company) => {
    setSelectedCompany(company);
    setEditCompanyVisible(true);
  };

  const DeleteCompanyHandler = (company) => {
    setSelectedCompany(company);
    setDeleteCompanyVisible(true);
  };

  useEffect(() => {
    getCompaniesHandler();
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
        <Header title={"Companies"}>
          <div className="">
            <button
              className="btnPrimary"
              onClick={() => setCreateCompanyVisible(true)}
            >
              Add Company
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
              <Table.Column>Location</Table.Column>
              <Table.Column>Option</Table.Column>
            </Table.Header>
            <Table.Body>
              {Companies &&
                Companies.map((Company) => (
                  <Table.Row key={Company.id}>
                    <Table.Cell>{Company.name}</Table.Cell>
                    <Table.Cell>{Company.location}</Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-3">
                        <button
                          className="bg-blue-600 text-white px-2 py-1 rounded"
                          onClick={() => EditCompanyHandler(Company)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 text-white rounded px-2 py-1"
                          onClick={() => DeleteCompanyHandler(Company)}
                        >
                          DELETE
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
        {/* Modals */}
        <div className="">
          <CreateCompany
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
          />
        </div>
      </main>
    </>
  );
}
