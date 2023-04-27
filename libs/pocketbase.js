import PocketBase from "pocketbase";

// export const pb = new PocketBase("https://sayemapi.shariardev.xyz");
export const pb = new PocketBase("http://127.0.0.1:8090/");

//NOTE - Company queries
//fetch all companies
export const getCompanies = async () => {
  try {
    const records = await pb.collection("companies").getFullList({
      sort: "-created",
    });

    return records;
  } catch (e) {
    console.log(e);
  }
};

//Create company
export const createCompany = async (cname, location) => {
  try {
    const data = {
      name: cname,
      location: location,
    };

    const record = await pb.collection("companies").create(data);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//Edit company
export const editCompany = async (cname, location, id) => {
  try {
    const data = {
      name: cname,
      location: location,
    };

    const record = await pb.collection("companies").update(id, data);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//Delete Company
export const deleteCompany = async (id) => {
  try {
    await pb.collection("companies").delete(id);
    return true;
  } catch (error) {
    console.log(error);
  }
};

//NOTE - Jobs queries
//fetch all jobs
export const getJobs = async () => {
  try {
    // you can also fetch all records at once via getFullList
    const records = await pb.collection("jobs").getFullList({
      sort: "-created",
      expand: "company",
    });

    return records;
  } catch (e) {
    console.log(e);
  }
};

//create jobs
export const createJobs = async (type, desc, company, pub, salary) => {
  try {
    // example create data
    const data = {
      type: type,
      description: desc,
      company: company,
      published: pub,
      salary: salary,
    };

    const record = await pb.collection("jobs").create(data);
    return record;
  } catch (error) {
    console.log(error);
  }
};

//edit jobs
export const editJobs = async (type, desc, company, pub, salary, id) => {
  try {
    // example Edit data
    const data = {
      type: type,
      description: desc,
      company: company,
      published: pub,
      salary: salary,
    };

    const record = await pb.collection("jobs").update(id, data);
    return record;
  } catch (error) {
    console.log(error);
  }
};

//delete job
export const deleteJob = async (id) => {
  try {
    await pb.collection("jobs").delete(id);
    return true;
  } catch (error) {
    console.log(error);
  }
};

//NOTE - Agent management

//TODO - get all agents
export const getAgents = async () => {
  try {
    const records = await pb.collection("agents").getFullList({
      sort: "-created",
    });

    return records;
  } catch (e) {
    console.log(e);
  }
};

//TODO - Create agent
export const createAgent = async (name) => {
  try {
    const data = {
      name: name,
    };

    const record = await pb.collection("agents").create(data);

    return record;
  } catch (e) {
    console.log(e);
  }
};

//TODO - Edit agent
export const editAgent = async (id, name) => {
  try {
    const data = {
      name: name,
    };

    const record = await pb.collection("agents").update(id, data);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//TODO - Delete agent
export const deleteAgent = async (id) => {
  try {
    await pb.collection("agents").delete(id);

    return true;
  } catch (e) {
    console.log(e);
  }
};

//NOTE - Applicaiton

//create applicaiton
export const createApplication = async (formData) => {
  try {
    const record = await pb.collection("customers").create(formData);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//fetch all application which are not approved
export const getApplications = async () => {
  try {
    // you can also fetch all records at once via getFullList
    const records = await pb.collection("customers").getFullList({
      sort: "-created",
      filter: `status != "approved"`,
      expand: "agent,company,job",
    });

    return records;
  } catch (e) {
    console.log(e);
  }
};

//Edit application
export const editApplications = async (id, status) => {
  try {
    // example update data
    const data = {
      status: status,
    };

    const record = await pb.collection("customers").update(id, data);
    return record;
  } catch (e) {
    console.log(e);
  }
};

//NOTE - Approved customer
//fetch all application which are approved
export const getAppCustomers = async () => {
  try {
    // you can also fetch all records at once via getFullList
    const records = await pb.collection("customers").getFullList({
      sort: "-created",
      filter: `status ~ "approved"`,
      expand: "agent,company,job",
    });

    return records;
  } catch (e) {
    console.log(e);
  }
};

//Edit application
export const editApCustomer = async (
  id,
  name,
  age,
  status,
  visa,
  police_clearance,
  passport,
  mobile
) => {
  try {
    const data = {
      name: name,
      age: age,
      status: status,
      visa: visa,
      police_clearance: police_clearance,
      passport: passport,
      mobile: mobile,
    };

    const record = await pb.collection("customers").update(id, data);

    return record;
  } catch (e) {
    console.log(e);
  }
};

//get one customer
export const getOneCustomer = async (id) => {
  try {
    const record = await pb.collection("customers").getOne(id, {
      expand: "agent,company,job",
    });

    return record;
  } catch (e) {
    console.log(e);
  }
};
