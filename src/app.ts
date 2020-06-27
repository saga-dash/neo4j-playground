// https://neo4j.com/developer/javascript/
import * as neo4j from 'neo4j-driver';

const url = process.env["URL"] ?? "bolt://localhost";
const user = process.env["USERNAME"] ?? "user";
const password = process.env["PASSWORD"] ?? "password";

const driver = neo4j.driver(url);
//const driver = neo4j.driver(host, neo4j.auth.basic(user, password));
const session = driver.session();
const personName = 'Alice';

(async()=> {
  try {
    const result = await session.run(
      'CREATE(a:Person {name: $name}) RETURN a',
      { name: personName }
    );
  
    const singleRecord = result.records[0];
    const node = singleRecord.get(0);
  
    console.log(node.properties.name);
  } finally {
    await session.close();
  }
  
  // on application exit:
  await driver.close();
})()
