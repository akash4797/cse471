// @ts-nocheck
import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/header";
import { Table } from "@nextui-org/react";

//pocket base calls
import { getAgents } from "../../libs/pocketbase";

//modals
import CreateAgent from "../../components/Modals/CreateModals/CreateAgent";
import EditAget from "../../components/Modals/EditModals/EditAgent";
import DeleteAgent from "../../components/Modals/DeleteModals/DeleteAgent";

export default function Agentmng() {
  //all agents
  const [AllAgents, setAllAgents] = useState(null);

  //modal states
  const [CreateAgentVisible, setCreateAgentVisible] = useState(false);
  const [EditAgentVisible, setEditAgentVisible] = useState(false);
  const [DeleteAgentVisible, setDeleteAgentVisible] = useState(false);

  const [SelectedAgent, setSetlectedAgent] = useState(null);

  //modal visibility handlers
  const EditAgentHandler = (agent) => {
    setSetlectedAgent(agent);
    setEditAgentVisible(true);
  };

  const DeleteAgentHandler = (agent) => {
    setSetlectedAgent(agent);
    setDeleteAgentVisible(true);
  };

  //reset for modals
  const getAllAgentHandler = async () => {
    const result = await getAgents();
    // @ts-ignore
    setAllAgents(result);
  };

  useEffect(() => {
    getAllAgentHandler();
  }, []);

  return (
    <>
      <Header title={"Agents"}>
        <button
          className="btnPrimary"
          onClick={() => setCreateAgentVisible(true)}
        >
          Add Agents
        </button>
      </Header>
      <div className="p-5">
        <Table
          aria-label="Agent List"
          headerLined
          lined
          css={{
            height: "auto",
            minWidth: "100%",
            dropShadow: "none",
          }}
        >
          <Table.Header>
            <Table.Column>Agent Name</Table.Column>
            <Table.Column>Options</Table.Column>
          </Table.Header>
          <Table.Body>
            {AllAgents &&
              AllAgents.map((agent) => (
                <Table.Row key={agent.id}>
                  <Table.Cell>{agent.name}</Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-3">
                      <button
                        className="btnSecondary"
                        onClick={() => EditAgentHandler(agent)}
                      >
                        Edit
                      </button>
                      <button
                        className="btnDanger"
                        onClick={() => DeleteAgentHandler(agent)}
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
      <div className="">
        <CreateAgent
          visible={CreateAgentVisible}
          setVisible={setCreateAgentVisible}
          reset={getAllAgentHandler}
        />
        <EditAget
          visible={EditAgentVisible}
          setVisible={setEditAgentVisible}
          reset={getAllAgentHandler}
          agent={SelectedAgent}
        />
        <DeleteAgent
          visible={DeleteAgentVisible}
          setVisible={setDeleteAgentVisible}
          reset={getAllAgentHandler}
          agent={SelectedAgent}
        />
      </div>
    </>
  );
}
