using { my.db.namespace as db } from '../db/schema';

/*
 * Define your services to fit your business logic.
 * More about Service Definition in the CAP Documentation: https://cap.cloud.sap/docs/cds/cdl#services
 */

service DemoService {

    entity Foo as projection on db.Foo;

}