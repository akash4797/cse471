// @ts-nocheck
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "../../components/Layout/header";
import { Table } from "@nextui-org/react";
import { useUser } from "../../context/UserContextProvider";
import { Loading } from "@nextui-org/react";
import EditApCustomer from "../../components/Modals/EditModals/EditAppCustomer";
import { useRouter } from "next/router";
import { getAppCustomers } from "../../libs/pocketbase";

export default function Approvedcustomers() {
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const user = useUser();

  const [AllApprovedCustomers, setAllApprovedCustomers] = useState(null);
  const [SelectedCustomer, setSelectedCustomer] = useState(null);

  const [EditCustomerVisible, setEditCustomerVisible] = useState(false);

  const EditCustomerHandler = (customer) => {
    setSelectedCustomer(customer);
    setEditCustomerVisible(true);
  };

  const initFunc = async () => {
    const result = await getAppCustomers();
    console.log(result);
    // @ts-ignore
    setAllApprovedCustomers(result);
  };

  useEffect(() => {
    initFunc();
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
        <Header title={"Approved Customer"}>
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
              <Table.Column>ID</Table.Column>
              <Table.Column>Name</Table.Column>
              <Table.Column>Agent</Table.Column>
              <Table.Column>Job Role</Table.Column>
              <Table.Column>Company</Table.Column>
              <Table.Column>Option</Table.Column>
            </Table.Header>
            <Table.Body>
              {AllApprovedCustomers &&
                AllApprovedCustomers.map((customer) => (
                  <Table.Row key={customer.id}>
                    <Table.Cell>{customer.id}</Table.Cell>
                    <Table.Cell>{customer.name}</Table.Cell>
                    <Table.Cell>{customer.expand.agent.name}</Table.Cell>
                    <Table.Cell>{customer.expand.job.type}</Table.Cell>
                    <Table.Cell>{customer.expand.company.name}</Table.Cell>
                    <Table.Cell>
                      <div className="">
                        <button
                          className="btnPrimary"
                          onClick={() => EditCustomerHandler(customer)}
                        >
                          Update
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </div>
        <div>
          <EditApCustomer
            visible={EditCustomerVisible}
            setVisible={setEditCustomerVisible}
            reset={initFunc}
            customer={SelectedCustomer}
          />
        </div>
      </main>
    </>
  );
}
